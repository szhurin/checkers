define(
    ["./view"],
    function(view){
        
        
        var checkers = null;
        
        return {
            getCheckers: function(opt){
                if(checkers === null){
                    checkers = new view(opt);
                }
                return checkers;
            }
        };
});