define(
    ["backbone", "underscore", "utils/state"],
    function (backb, _, state) {
        var dataModel = backb.View.extend({
            model: state,
            
            color: 'w', // color [w, b]
            type: 1, // user [1,2]

            setColor: function(color){this.color = color;},
            
            initialize: function (init_obj) {
                
                if(init_obj['color'] !== undefined){
                    this.setColor(init_obj['color']);
                }
                
                if(init_obj['type'] !== undefined){
                    this.type = init_obj['type']
                }
                
                this.el = $('<div>');
                
                _.bindAll(this, "render");
                
                this.model.on('destroy', this.remove);
            },
    
            render: function (eventName) {

                var player_class = '_player_data';

                $(this.el).addClass(player_class);
                $(this.el).addClass('_player');
                $(this.el).empty();   
                $(this.el).append('<p > Player '+this.type+'</p>');
                
                var inner = $('<div id="_player_checks_'+this.type+'" class="_player_checks">&nbsp;</div>');
                
                var taken = state.get('taken_by_'+this.type);
                for(var i in taken){
                    inner.append(taken[i].el);
                }
                
                $(this.el).append(inner);
                
                
                return this;

            },

        });

        return dataModel;
    });