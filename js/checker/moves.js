define(
    ['field/object', "checkers/model", "utils/state", "underscore", "./move_tools"],
    function (field, collection, state, _, move_tools) {

        function takeChecker(x1, y1, x2, y2) {

            var x = (x1 + x2) / 2;
            var y = (y1 + y2) / 2;

            var model = collection.checkPosition(x, y);
            model.set({
                taken: true
            });

        };

        function victoryAction(color) {
            alert(color + ' WON');
        };

        function checkVictory(moveColor) {
            var restOfColor = collection.where({
                'taken': false,
                'color': moveColor
            });

            var colors = {
                'b': 'w',
                'w': 'b'
            };

            if (restOfColor.length === 0) { // color lost
                victoryAction(colors[moveColor]);
            }

            var check_colors = ['b', 'w'];

        };

        function getMoveAmount(color) {
            var restOfChecks = collection.where({
                'taken': false,
                'color': color
            });

            if (restOfColor.length === 0) {
                return 0;
            }
            for (var i in restOfChecks) {
                var model = restOfChecks[i];
                var x = model.get('x');
                var y = model.get('y');
                var posibles = getOneCellMoves(x, y, 0, model);
            }

        }

        function moveChecker(x, y) {
            if (state.get('status') === 'in_move') {

                var cur_pos = state.get('cur_checker_pos');
                var direction = state.get('cur_checker_direction');
                var number = state.get('cur_checker_number');

                var model = collection.at(number);

                if (model === undefined) {
                    return false;
                }

                var free_cells = getPosibleCellsFromPos(cur_pos[0], cur_pos[1], direction, model.get('color'));

                var isValidMove = false;
                for (var i in free_cells) {
                    var free_cell = free_cells[i];
                    if (free_cell[0] === x && free_cell[1] === y) {
                        isValidMove = true;
                        break;
                    }
                }

                var oldX = model.get('x');
                var oldY = model.get('y');

                // if valid move choosen
                if (isValidMove) {

                    model.set({
                        'x': x,
                        'y': y
                    });

                    state.set('cur_checker_pos', [x, y]);

                    // if there was 
                    if (field.calc.getCellDistance(oldX, oldY, x, y) > 2 && model.get('type') === 0) {

                        takeChecker(oldX, oldY, x, y);

                        return getPosibleCellsFromPos(x, y, 0);

                        return false;
                    } else if (model.get('type') === 1) {

                        move_tools.checkQueenTake(oldX, oldY, x, y);

                    }

                    return true;
                } else {

                }

                return false;

                //state.set('status', 'after_move');
                //console.log('move checker', direction, x, y, free_cells);
            }
        }

        function getOneCellMoves(x, y, direction, model) {

            if (model === undefined || model.get('type') === 0) {
                var cells = field.calc.getShortDirection(x, y, direction);

                var posible_cells = move_tools.filterFreeCells(cells, true);
                return posible_cells['free'];
            } else { // queen checker
                var cells = field.calc.getDiags(x, y);

                var posible_cells = move_tools.filterQueenCells(cells, x, y, true);
                console.log(posible_cells, cells);
                return posible_cells['free'];
            }
        };

        function getTakeMoves(x, y) {
            history = history || {};


            var model = collection.checkPosition(x, y);
            if (model == undefined) {
                return;
            }

            var type = model.get('type');

            var color = model.get('color');

            var cells = [];
            var posible_cells = [];


            if (type === 0) {

                cells = field.calc.getShortDirection(x, y, 0);
                posible_cells = move_tools.filterFreeCells(cells, true);

            } else {
                cells = field.calc.getDiags(x, y);
                posible_cells = move_tools.filterQueenCells(cells, x,y, true);

            }
            var busy = posible_cells['busy'];

            var res = [];
            if (busy.length > 0) {
                for (var b in busy) {
                    var b_cell = busy[b];
                    console.log(b_cell);

                    var cell_checker = collection.checkPosition(b_cell['pos'][0], b_cell['pos'][1]);
                    var b_color = cell_checker.get('color');

                    // if color on the occupied cell is of the different color
                    if (b_color !== color) {

                        // get the position of the next cell after occupied
                        var dx = b_cell['pos'][0] - x;
                        var newX = b_cell['pos'][0] + Math.round(dx / Math.abs(dx));

                        var dy = b_cell['pos'][1] - y;
                        var newY = b_cell['pos'][1] + Math.round(dy / Math.abs(dy));

                        console.log('take move', newX, newY);
                        // if the position is VALID in [1,8] 
                        if (field.calc.isValid(newX, newY)) {

                            var new_cell = collection.checkPosition(newX, newY);

                            if (new_cell === undefined) {
                                console.log('valid take move', newX, newY);
                                res.push([newX, newY]);
                                //free = getPosibleCellsFromPos(newX, newY, 0, color, free);

                            }
                        }
                    }
                }
            }
            return res;
        }

        function getPosibleCellsFromPos(x, y, direction, color) {

            state.set('move_type', 'take_move');
            var model = collection.checkPosition(x, y);

            var cells = getTakeMoves(x, y, model);
            if (cells.length === 0) {

                cells = getOneCellMoves(x, y, direction, model);
                state.set('move_type', 'one_cell_move');
            }

            return cells;
        };


        var that = {
            moveChecker: moveChecker,
            getPosibleCellsFromPos: getPosibleCellsFromPos,
        };

        return that;
    });