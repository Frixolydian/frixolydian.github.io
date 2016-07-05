boot = function(game){};
boot.prototype = {
  init:function() {
//        this.game.time.desiredFps = 45;
//        this.game.forceSingleUpdate = true;
/* ADD AUTO SCALING!!! */
  	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  	this.game.scale.pageAlignHorizontally = true;
  	this.game.scale.pageAlignVertically = true;
  	this.game.time.advancedTiming = true;
 	},
 	preload:function(){
		this.load.image('preloader_bar', 'assets/preloader_bar.png');
		this.load.image('preloader_back', 'assets/preloader_back.png');
		this.load.image('credits', 'assets/credits.png');
 	},
 	create:function(){
    this.game.stage.backgroundColor = "#FFFFFF"; //set the background color
    this.add.image(this.game.width * 0.5, this.game.height * 0.4, 'credits').anchor.set(0.5); 
    this.game.time.events.add (500, function() {
      this.game.state.start('Preloader');      
    }, this);
	}
};