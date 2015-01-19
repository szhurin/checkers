define(
    ["backbone", "underscore"],
    function (bbone, _) {
        var dataModel = bbone.Model.extend({
            defaults: {
                x: 0,
                y: 0,
                color: 'w', // w-white, b-black
                type: 0, // 0-regular , 1-queen
                player: 1, // player1,player2
                direction: 1, // 1 - down , -1 - up
                number: 0, // the number in collection 
                taken: false, // was taken or not
            },
            
            getTakePlayer:function(){
                var players = [0, 2, 1];
                return players[this.get('player')];
            },
            
            initialize: function (init_obj) {
                init_obj = init_obj || {};
                
                for(var i in this.defaults){
                    if(init_obj[i] !== undefined){
                        this.set(i, init_obj[i]);                        
                    }
                }                
            },
        });

        return dataModel;
    });