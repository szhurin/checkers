define(
    ["backbone", "./model", "checker/object"],
    function (bbone, model, checker) {
        
        var color_offset = {'b':0, 'w':1};
        
        function genCheckerField( color_top, color_bottom, color0){
            
            var fields = [[1,3,5,7],[2,4,6,8]];
            var rows = [[1,2,3],[6,7,8]];
            var count = color_offset[color0];
            
            
            
            var res = [];
            
            for(var i in rows[0] ){
                var y = rows[0][i];                
                for(var j in fields[count]){
                    var x = fields[count][j];
                    res.push({'x':x, 'y':y, 'color':color_top, direction: 1, player:1});
                    
                }
                count = (count+1)%2;
            }
            for(var i in rows[1] ){
                var y = rows[1][i];                
                for(var j in fields[count]){
                    var x = fields[count][j];
                    res.push({'x':x, 'y':y, 'color':color_bottom,  direction: -1, player:2});
                    
                }
                count = (count+1)%2;
            }
            return res;
        };
        
        
        var dataModel = bbone.View.extend({


            initialize: function (init_obj) {

                this.el = $(init_obj.field_selector);
                var color0 = init_obj.color0 || 'b';

                this.collection = model;
                
                var checks_arr = genCheckerField('w', 'b', color0);
                
                for(var i in checks_arr){
                    var item_model = checks_arr[i];
                    var item = new checker.getModel( item_model);
                
                    item.set('number', i);
                    
                    this.collection.add(item, {at: i});
                }

                _.bindAll(this, "render", "addItem");
                this.render();
                
            },

            render: function (eventName) {
                var self = this;

                _(this.collection.models).each(function (item) { // in case collection is not empty
                    self.addItem(item);
                }, this);
            },


            addItem: function (item) {
                var checkView = new checker.getView({
                    model: item
                });
                checkView.render();
            }
        });

        return dataModel;
    });