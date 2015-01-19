define(
    ["./draw", "./calc"],
    function (draw, calc) {
        var that = {
            draw: draw,
            calc: calc,
            field_cell_class: '_field_cell',
            getCellPos: function (selector) {
                var pos = $(selector).attr('pos');
                var xy = pos.split(',');
                xy[0] = xy[0] - 0 + 1;
                xy[1] = xy[1] - 0 + 1;
                return xy;
            },

            showDiags: function () {
                $('.' + that.field_cell_class).click(function () {
                    $('.' + that.field_cell_class).removeClass('_red_cell');

                    var xy = that.getCellPos(this);

                    var diags = that.calc.getShortDirection(xy[0], xy[1]);
                    //var diags = that.calc.getShortDiags( xy[0], xy[1]);
                    //var diags = that.calc.getDiags( (xy[0]), (xy[1]) );

                    console.log(xy, diags);

                    for (var i in diags) {
                        var cell = diags[i];
                        $('#' + draw.getCellIDPart + calc.getPosition(cell[0], cell[1])).addClass('_red_cell');
                    }
                });
            },
            getCellId: function (i, j) {
                return draw.getCellIDPart + calc.getPosition(i, j);
            },
        };
        return that;
    });