define(
    ["./model", "./view", "./tools"],
    function(Model, View, tools){
        
        return {
            getModel: function(opt){
                var checker = new Model(opt);
                return checker;
            },
            getView: function(opt){
                var checker = new View(opt);
                return checker;
            },
            registerCheckerMotion: tools.regCheckerAction
        };
        
});