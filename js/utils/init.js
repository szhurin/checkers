require(["utils/state"], function (state) {

    state.set('status', 'start');
    
    state.set('g_score', [0, 0]);
    
    state.set('move_color', 'w');
    state.set('alow_select_other_checker', true);
    state.set('victory', false);
    
    state.set('taken_by_1', []);
    state.set('taken_by_2', []);
    
    state.set('move_type', '');
    state.set('cur_num', -1);

});