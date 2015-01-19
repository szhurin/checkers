requirejs.config({
    baseUrl: '/js',
    map: {
        "*": {
            'underscore': 'lodash'
        }
    },
    shim: {
        
        "jsface": {
            "exports": "jsface"
        }

    }

});

define(['field/object', 'checkers/object', 'checker/object', 'game/object', 'utils/init',  'underscore', 'jquery.min'], function(field, checkers, checker, game, init, _, $){
    
    field.draw.draw('#_field_container', '_b_cell', '_w_cell');
    
    //field.showDiags();
    
    //var check = checker.getModel({'x':2, 'y':4});
    
    game.render();
    
    var checks = checkers.getCheckers({field_selector: '#_field_container ._field_wrap' , color0:'b'});
    
    checker.registerCheckerMotion();
    
});