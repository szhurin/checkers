define(
    ["backbone", "underscore", "utils/state"],
    function (backb, _, state) {
        var view = backb.View.extend({
            el: $('<div>'),
            model: state,

            initialize: function (init_obj) {
                _.bindAll(this, "render");
                //this.model.on('change:status', this.render);
                //this.model.on('destroy', this.remove);
            },

            render: function (eventName) {

                var gclass = '_game_score';

                $(this.el).addClass(gclass);
                $(this.el).empty();               
                $(this.el).append('<p>'+state.get('g_score')+'</p>');
                
                return this;
            },

        });

        return view;
    });