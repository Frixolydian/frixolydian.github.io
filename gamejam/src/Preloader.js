Doge.Preloader = function(game) {};
Doge.Preloader.prototype = {
    preload: function() {
    this.preloadBar=this.add.sprite(240,320,'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);
//inicio
    this.load.image('porta','assets/portada_juego_final.png');
    this.load.image('titulo','assets/titulo.png');
    this.load.image('option1','assets/option_1.png');
    this.load.image('option2','assets/option_2.png');
//main level
    this.load.image('button','assets/button.png');
    this.load.spritesheet('bobbo','assets/player.png',16,32);
    this.load.spritesheet('enemigo','assets/enemigo.png',43,47);
    this.load.image('tiles','assets/tile.png');
    this.load.image('piso','assets/piso.png');
    this.load.image('redbar','assets/barred.png');
    this.load.image('bluebar','assets/barblue.png');
    this.load.image('orb','assets/orb.png');
//dead screen
    this.load.image('death','assets/death.png');
    this.load.image('option3','assets/option_3.png');
//music
    this.load.audio('gamejam', ['assets/gamejam.ogg']);
    this.load.audio('gamejam2', ['assets/gamejam2.ogg']);
    this.load.audio('gamejam3', ['assets/gamejam3.ogg']);
    this.load.audio('sfx', ['assets/sfx.ogg']);
    this.load.audio('sfx2', ['assets/sfx2.ogg']);
    this.load.audio('sfx3', ['assets/sfx3.ogg']);
    this.load.audio('sfx4', ['assets/sfx4.ogg']);
    this.load.audio('sfx5', ['assets/sfx5.ogg']);
    },
    create: function() {
        this.game.state.start('Intro');
    }
};