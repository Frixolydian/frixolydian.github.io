preloader = function(game){};
preloader.prototype = {
  init:function() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  },    
  preload:function(){
    this.add.image(this.game.width * 0.5, this.game.height * 0.75, 'preloader_back').anchor.set(0.5); 
    this.loadingbar = this.add.sprite(120, 292, 'preloader_bar');
    this.add.image(this.game.width * 0.5, this.game.height * 0.4, 'credits').anchor.set(0.5); 
    this.load.setPreloadSprite(this.loadingbar, 0);
    this.load.image('player', 'assets/player.png');
  },
  create:function(){
    this.game.state.start('Kusoge');
  }
};