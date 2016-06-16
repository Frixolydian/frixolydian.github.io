preloader = function(game){};
preloader.prototype = {
  init:function() {

  },    
  preload:function(){
    this.loadingbar = this.add.sprite(180, 200, 'preloader_bar');
    this.load.setPreloadSprite(this.loadingbar,0);

//gamepad
    this.load.spritesheet('gamepad', 'assets/gamepad/gamepad_spritesheet.png', 100, 100);

    this.load.image('enemy_spike', 'assets/enemy_spike.png');
    this.load.spritesheet('player','assets/player.png', 90, 105);
    this.load.image('back_1', 'assets/back_1.png');
    this.load.image('back_2', 'assets/back_2.png');
    this.load.image('back_3', 'assets/back_3.png');
    this.load.image('back_4', 'assets/back_4.png');
    this.load.spritesheet('wagon_1', 'assets/wagon_1.png', 560, 200);
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('turret', 'assets/turret.png');
    this.load.image('seagull', 'assets/seagull.png');
    this.load.image('jebadiah_left', 'assets/jebadiah_left.png');
    this.load.image('jebadiah_right', 'assets/jebadiah_right.png');
    this.load.spritesheet('legs_left', 'assets/legs_left.png', 40, 68);
    this.load.spritesheet('legs_right', 'assets/legs_right.png', 40, 68);
    this.load.image('mp5', 'assets/mp5.png');

    this.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');//font

    mp5_reload = new Howl({
      urls: ['assets/audio/mp5_reload.ogg'],
      volume: 0.2
    });

  },
  create:function(){
    this.game.state.start('Kusoge');
  }
};