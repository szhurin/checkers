define(function () {

    var x = 8;
    var y = 8;

    function isValid(i, j){
        if(i<1 || i>8 || j<1 || j>8 ){
            return false;
        }
        return true;
    };
    
    function getDiags(i,j){
        var b1 = j-i;
        var b2 = j+i;
        var res = [];
        
        for(var ii = 1 ; ii<= x; ii++){
            if(ii === i) continue;
            var jj1 = ii + b1;
            var jj2 = b2 - ii;
            
            if(isValid(ii,jj1)){
                res.push([ii,jj1]);
            }
            if(isValid(ii,jj2)){
                res.push([ii,jj2]);
            }
        }
        return res;
    }
    
    
    var that = {
        isValid: isValid,
        getCellDistance: function(x1,y1,x2,y2){return (Math.abs(x1-x2) + Math.abs(y1-y2))},
        getPosition0: function (i, j) {
            var pos = j * x + i;
            return pos;
        },
        getPosition: function (i, j) {
            return that.getPosition0(i - 1, j - 1);
        },
        getDiags: function(i, j){
            return getDiags(i,j)
        },
        getShortDiags: function(i, j){
            var diags = getDiags(i,j)
            var res = _.filter(diags , function(arr){ return that.getCellDistance(arr[0],arr[1], i, j) <3 });
            return res;
        },
        getShortDirection: function(i, j, direction){
            if(direction === undefined){
                direction = 2*Math.round(Math.random()) -1;
            }
            var tmp = that.getShortDiags(i,j);
            var res = tmp;
            // if direction is in (-1, 1) then filter 
            if(direction !== 0){
                res = _.filter(tmp , function(arr){ return (arr[1]-j) === direction });
            }            
            return res;
        },
        
        getPosArray: function(){
                    
        }
    };
    
    return that;
});