preloader = function(game){};
preloader.prototype = {
  init:function() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  },    
  preload:function(){
    this.load.image('snake_head','assets/snake_head.png');
    this.load.image('snake_body_1', 'assets/snake_body_1.png');
    this.load.image('snake_tail_1', 'assets/snake_tail_1.png');
    this.load.image('snake_tail_2', 'assets/snake_tail_2.png');
    this.load.spritesheet('small_fish', 'assets/small_fish.png', 20, 20);

    this.load.image('seagull','assets/seagull.png');

    this.load.image('background_1','assets/background_1.png');
  },
  create:function(){
    this.game.state.start('Kusoge');
  }
};