define(
    ["backbone", "underscore", "./model", "field/object", "utils/state"],
    function (backb, _, model, field, state) {

        var view = backb.View.extend({

            initialize: function (init_obj) {
                this.model = init_obj.model || new model(init_obj);
                _.bindAll(this, "render", "setTaken");
                this.model.on('change:x', this.render);
                this.model.on('change:y', this.render);
                this.model.on('change:type', this.render);
                this.model.on('change:taken', this.setTaken);
                this.model.on('destroy', this.remove);
            },

            setTaken: function () {
                if (this.model.get('taken') === true) {
                    this.model.set('type', 0);
                    var taken = state.get('taken_by_' + this.model.getTakePlayer());
                    taken.push(this);
                    state.set('taken_by_' + this.model.getTakePlayer(), taken);
                    this.model.set({
                        x: -1,
                        y: -1
                    });
                    this.render();
                }
            },

            render: function (eventName) {

                var check_class = '_' + this.model.get('color') + '_checker';

                $(this.el).addClass(check_class);
                $(this.el).addClass('_checker');

                 if (this.model.get('type') === 1) {
                        $(this.el).addClass('_checker_queen');
                    }

                //console.log(this.model.get('number'));
                //
                if (this.model.get('taken') === true) {
                    var field_id = '_player_checks_' + this.model.getTakePlayer();
                    $(this.el).removeClass('_checker_queen');
                    $(this.el).addClass('_checker_taken');

                    $('#' + field_id).append(this.el);
                } else {
                   

                    $(this.el).attr('direction', this.model.get('direction'));
                    $(this.el).attr('number', this.model.get('number'));
                    $(this.el).attr('color', this.model.get('color'));

                    var field_id = field.getCellId(this.model.get('x'), this.model.get('y'));

                    $('#' + field_id).append(this.el);
                }
            },

        });

        return view;
    });