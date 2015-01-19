define(
    ['field/object', "checkers/model", "utils/state", "./moves", "underscore"],
    function (field, collection, state, moves, _) {


        function uncheckCheckers() {
            $('._checker').removeClass('_checker_selected');
            state.set('status', 'wait_select');

        };

        function markPosibleMoves(x,y,model) {
            var free_cells = moves.getPosibleCellsFromPos(x, y, model.get('direction'), model.get('color'), model);

            $('.' + field.field_cell_class).removeClass('_red_cell');
            for (var i in free_cells) {
                var cell = free_cells[i];
                $('#' + field.draw.getCellIDPart + field.calc.getPosition(cell[0], cell[1])).addClass('_red_cell');
            }
        };

        function regCheckerAction() {
            $('._checker').click(function () {
                var color = $(this).attr('color');

                console.log(state.get('move_color'), color);
                
                if (state.get('move_color') !== color) {
                    return;
                }

                state.set('move_color', color);
                state.set('status', 'select_checker');

                var cur_num = state.get('cur_checker_number');


                var number = $(this).attr('number') - 0;
                var direction = $(this).attr('direction') - 0;

                var model = collection.at(number);

                //if select other checker of the same color;
                if (cur_num !== -1 && cur_num !== number) {

                    if (state.get('allow_select_other_checker') === false) {
                        endMove();
                        state.set('allow_select_other_checker', true);
                        return;
                    }
                }

                $('._checker').removeClass('_checker_selected');
                $(this).addClass('_checker_selected');
                
                var x = model.get('x');
                var y = model.get('y');

                state.set('cur_checker_pos', [x, y]);
                state.set('cur_checker_direction', direction);
                state.set('cur_checker_number', number);

                markPosibleMoves(x,y,model);
            });

            $('.' + field.field_cell_class).click(function (e) {

                if (e.target !== e.currentTarget) {
                    return;
                }
                var pos = field.getCellPos(this);
                state.set('status', 'in_move');
                var move_res = moves.moveChecker(pos[0], pos[1]);

                var move_type = state.get('move_type');

                if (move_type === 'take_move') {
                    // keep moving
                    state.set('status', 'in_move');
                    state.set('allow_select_other_checker', false);

                } else {

                    if (move_res) {
                        console.log('before end', state.get('status'), state.get('move_color'));
                        // change colors && switch move player
                        endMove();
                    }
                }

                //if()
                checkAfterMove();
            });
        };

        function checkAfterMove() {
            
            var pos = state.get('cur_checker_pos');
            var direction = state.get('cur_checker_direction');

            console.log('after move check', pos);
            if ((pos[1] === 1 && direction === -1) || (pos[1] === 8 && direction === 1)) { // make a queen
                var number = state.get('cur_checker_number');
                var model = collection.at(number);
                model.set('type', 1);
            }

            if (state.get('status') === 'end_move') {
                state.set('cur_checker_pos', [-1, -1]);
                state.set('cur_checker_direction', 0);
                state.set('cur_checker_number', -1);

            } else if(state.get('status') === 'in_move') {
                var number = state.get('cur_checker_number');
                var model = collection.at(number);
                if(model !== undefined){
                    markPosibleMoves(model.get('x'), model.get('y'), model);
                }
            }
        }

        function endMove() {
            var colors = {
                'w': 'b',
                'b': 'w'
            };
            var color = state.get('move_color');
            console.log('end ', state.get('cur_checker_pos'), color, colors);
            state.set('move_color', colors[color]); // exchange current move color
            uncheckCheckers();

            state.set('status', 'end_move');

            $('.' + field.field_cell_class).removeClass('_red_cell');
        }

        return {

            regCheckerAction: regCheckerAction
        };

    });