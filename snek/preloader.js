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

    this.load.image('snake_head','assets/snake_head.png');
    this.load.image('snake_body_1', 'assets/snake_body_1.png');
    this.load.image('snake_tail_1', 'assets/snake_tail_1.png');
    this.load.image('snake_tail_2', 'assets/snake_tail_2.png');
    this.load.spritesheet('small_fish', 'assets/small_fish.png', 20, 20);
    this.load.image('fishy', 'assets/fishy.png');

    this.load.image('seagull','assets/seagull.png');

    this.load.image('background_1','assets/background_1.png');
  },
  create:function(){
    this.game.state.start('Kusoge');
  }
};