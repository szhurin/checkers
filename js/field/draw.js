define( function(){
    
    var x =8;
    var y =8;
    
    var cur_selector = '';
    var field_cls = '_field_wrap';
    var cell_id_part = '_cell_';
    
    function draw(selector, class_even, class_odd){
        cur_selector = selector + ' .' + field_cls;
        var container = $(selector);
        
        var classes = [class_even, class_odd];
        
        var container = $('<div>');
        container.addClass(field_cls);
        
        for(var i = 0 ; i< x; i++){
            
            for(var j = 0; j<y; j++){
                var field_id = (i*x+j) ;
                container.append('<div class="'+classes[(i+j) % 2]+' _field_cell" '+
                                 ' id="'+cell_id_part + field_id+'" pos="'+j+','+i+'" style="width:12.5%;padding-bottom:12.6%;">');
            }
        }
        
        container.append('<div style="clear:both;">');
        $(selector).append(container);
    };
    
    var that = {
        draw: draw,
        getSelector: function(){return cur_selector;},
        getCellIDPart: cell_id_part
    };
    return that;
});