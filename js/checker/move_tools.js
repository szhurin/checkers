define(
    ['field/object', "checkers/model", "utils/state", "underscore"],
    function (field, collection, state, _) {

        function isDiagBusy(xo, yo, xe, ye) {

            if (xe === xo && ye === yo) {
                return false;
            }

            var dx = Math.round((xe - xo) / Math.abs(xo - xe));
            var dy = Math.round((ye - yo) / Math.abs(yo - ye));

            if (xe === xo + dx && ye === yo + dy) {
                var model = collection.checkPosition(xe, ye);
                if (model !== undefined) {
                    return true;
                }
            }
            var j = yo;
            for (var i = xo; i != xe; i = i + dx, j = j + dy) {

                if (i === xo && j === yo) {
                    continue;
                }

                var model = collection.checkPosition(i, j);

                if (model !== undefined) {
                    return true;
                }
            }
            var model = collection.checkPosition(xe, ye);

                if (model !== undefined) {
                    return true;
                }
            
            return false;
        };


        function checkQueenTake(oldX, oldY, x, y) {

            var dx = Math.round((x - oldX) / Math.abs(oldX - x));
            var dy = Math.round((y - oldY) / Math.abs(oldY - y));

            var j = oldY;
            for (var i = oldX; i != x; i = i + dx, j = j + dy) {

                if (i === oldX && j === oldY || i === x && j === y) {
                    continue;
                }

                var model = collection.checkPosition(i, j);

                if (model !== undefined) {
                    model.set({
                        taken: true
                    });
                }
            }



        };

        function filterQueenCells(cells, x, y, returnOcupied) {

            returnOcupied = returnOcupied || false;
            var busy_cells = [];
            var free_cells = [];

            for (var k in cells) {
                var pos = cells[k];
                var isBusy = isDiagBusy(x, y, pos[0], pos[1]);

                if (!isBusy) {
                    free_cells.push(pos);
                }
                if (returnOcupied) {
                    if (isBusy) {

                        var dx = (pos[0] - x) / Math.abs(pos[0] - x);
                        var dy = (pos[1] - y) / Math.abs(pos[1] - y);

                        if (Math.abs(x - pos[0]) === 1) {
                            var model = collection.checkPosition(pos[0], pos[1]);
                            if (model !== undefined) {

                                busy_cells.push({
                                    pos: pos,
                                    color: model.get('color')
                                });
                            }
                        } else {
                            console.log('isBusy', pos, dx,dy);
                            var isSmallBusy = isDiagBusy(x, y, pos[0] - dx, pos[1] - dy);

                            if (!isSmallBusy) {
                                console.log('!isSmallBusy', x, y, pos[0] - dx, pos[1] - dy, isSmallBusy);
                                var model = collection.checkPosition(pos[0], pos[1]);
                                if (model !== undefined) {

                                    busy_cells.push({
                                        pos: pos,
                                        color: model.get('color')
                                    });
                                }
                            }
                        }
                    }
                }

            };
            
            console.log(busy_cells);

            if (!returnOcupied) {
                return free_cells;
            }
            return {
                free: free_cells,
                busy: busy_cells
            };
        };

        // find free and busy cells from variable cells
        function filterFreeCells(cells, returnOcupied) {
            returnOcupied = returnOcupied || false;
            var busy_cells = [];
            var free_cells = [];

            for (var k in cells) {
                var position = cells[k];
                var model = collection.checkPosition(position[0], position[1]);

                if (model === undefined) {
                    free_cells.push(position);
                }
                if (returnOcupied) {
                    if (model !== undefined) {

                        busy_cells.push({
                            pos: position,
                            color: model.get('color')
                        });
                    }
                }
            }

            if (!returnOcupied) {
                return free_cells;
            }
            return {
                free: free_cells,
                busy: busy_cells
            };
        };

        return {
            checkQueenTake: checkQueenTake,
            filterQueenCells: filterQueenCells,
            filterFreeCells: filterFreeCells
        }

    });