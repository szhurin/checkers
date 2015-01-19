define(["backbone", "checker/model"], function (bbone, checker) {
    var List = bbone.Collection.extend({
        model: checker
    });
    return new List();
});