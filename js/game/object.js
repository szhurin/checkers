define(
    ["backbone", "underscore", "./game_console","./game_score", "./player", "utils/state"],
    function (backb, _,  gconsole, Score, Player, state) {
        
        var gcon = new gconsole();
        
        var score= new Score();
        var player1 = new Player({'type':1, 'color':'w'});
        var player2 = new Player({'type':2, 'color':'b'});       
        
        
        var dataModel = backb.View.extend({
            el: $('#_game_console'),
            model: state,

            initialize: function (init_obj) {                
                _.bindAll(this, "render");
                this.model.on('change:status', this.render);
                this.model.on('change:move_color', this.render);
                this.model.on('destroy', this.remove);
            },
            
            render: function (eventName) {

                $(this.el).empty();                
                
                $(this.el).append(score.render().el);
                $(this.el).append(player1.render().el);
                $(this.el).append(player2.render().el);
                $(this.el).append(gcon.render().el);                
            },
        });
        return new dataModel();
    });