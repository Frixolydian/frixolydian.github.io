boot = function(game){};
boot.prototype = {
    init:function() {
            this.game.time.desiredFps = 45;
//        this.game.forceSingleUpdate = true;
    Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
/* ADD AUTO SCALING!!! */
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },    
    preload:function(){
    },
    create:function(){
        this.game.state.start('Preloader');
    }
};