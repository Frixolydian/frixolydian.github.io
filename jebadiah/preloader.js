preloader = function(game){};
preloader.prototype = {
  init:function() {

  },
  preload:function(){
    this.add.image(this.game.width * 0.5, this.game.height * 0.75, 'preloader_back').anchor.set(0.5); 
    this.loadingbar = this.add.sprite(120, 292, 'preloader_bar');
    this.add.image(this.game.width * 0.5, this.game.height * 0.4, 'credits').anchor.set(0.5); 
    this.load.setPreloadSprite(this.loadingbar, 0);

//gamepad
    this.load.spritesheet('gamepad', 'assets/gamepad/gamepad_spritesheet.png', 100, 100);

    this.load.image('indicator', 'assets/indicator.png');
    this.load.image('healthbar', 'assets/healthbar.png');
    this.load.image('healthbar_back', 'assets/healthbar_back.png');
    this.load.image('trajectory', 'assets/trajectory.png');
    this.load.image('enemy_spike', 'assets/enemy_spike.png');
    this.load.spritesheet('player','assets/player.png', 90, 105);
    this.load.image('back_1', 'assets/back_1.png');
    this.load.image('back_2', 'assets/back_2.png');
    this.load.image('back_3', 'assets/back_3.png');
    this.load.image('back_4', 'assets/back_4.png');
    this.load.spritesheet('wagon_1', 'assets/wagon_1.png', 328, 200);
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('turret', 'assets/turret.png');
    this.load.image('turret_stand', 'assets/turret_stand.png');
    this.load.image('seagull', 'assets/seagull.png');
    this.load.spritesheet('enemy_2', 'assets/enemy_2.png', 32, 63);
    this.load.spritesheet('jebadiah', 'assets/jebadiah.png', 40, 68);
    this.load.spritesheet('legs_left', 'assets/legs_left.png', 40, 68);
    this.load.spritesheet('legs_right', 'assets/legs_right.png', 40, 68);
    this.load.image('pistol', 'assets/pistol.png');
    this.load.image('shotgun', 'assets/shotgun.png');
    this.load.image('mp5', 'assets/mp5.png');
    this.load.spritesheet('explosion', 'assets/explosion.png', 64, 64);
    this.load.spritesheet('explosion_smoke', 'assets/explosion_smoke.png', 16, 16);

    this.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');//font

    mp5_reload = new Howl({
      urls: ['assets/audio/mp5_reload.ogg'],
      volume: 0.2
    });

  },
  create:function(){
    this.game.state.start('Purchase_screen');
  }
};