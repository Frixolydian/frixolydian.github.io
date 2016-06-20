boot = function(game){};
boot.prototype = {
    init:function() {
//        this.game.time.desiredFps = 45;
//        this.game.forceSingleUpdate = true;
/* ADD AUTO SCALING!!! */
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
   },    
   preload:function(){
		this.load.image('preloader_bar', 'assets/preloader_bar.png');
		this.load.image('preloader_back', 'assets/preloader_back.png');
		this.load.image('credits', 'assets/credits.png');
   },
   create:function(){
    this.game.state.start('Preloader');
   }
};