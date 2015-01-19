define(["backbone", "checker/model"], function (bbone, checker) {
    var List = bbone.Collection.extend({
        model: checker,
        
        checkPosition: function(i,j){
            var res = this.findWhere({'x':i, 'y': j});            
            return res;
        }
        
    });
    
    var itemList = new List();
    return itemList;
});