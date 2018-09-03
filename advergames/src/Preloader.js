Fury.Preloader = function(game) {};
Fury.Preloader.prototype = {
    preload: function() {
    this.preloadBar=this.add.sprite(512/2,512/2,'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.furycake = this.game.add.sprite(256, 400, 'furycakeLogo');
    this.furycake.anchor.x = 0.5;
    this.furycake.anchor.y = 0.5;
    this.furycake.scale.x = 0.4;
    this.furycake.scale.y = 0.4;
    this.load.image('logo', 'assets/logo.png');
    this.load.image('clock', 'assets/clock.png');
    this.load.image('star', 'assets/star1.png');
    this.load.image('star0', 'assets/star0.png');
    this.load.image('square', 'assets/square.png');
    this.load.image('joystick', 'assets/joystick.png');
    this.load.image('back', 'assets/back.png');
    this.load.image('home', 'assets/home.png');
    this.load.image('arrow_l', 'assets/arrow_l.png');
    this.load.image('arrow_r', 'assets/arrow_r.png');
    this.load.image('arrow_u', 'assets/arrow_u.png');
    this.load.image('arrow_d', 'assets/arrow_d.png');
    this.load.image('facebook', 'assets/facebook.png');
    this.load.image('help', 'assets/help.png');
    this.load.image('marca', 'assets/marca.png');
    this.load.image('mano', 'assets/mano.png');
    this.load.image('pupi_1', 'assets/pupi_1.png');

    this.load.image('text_1', 'assets/text_1.png');
    this.load.image('text_2', 'assets/text_2.png');
    this.load.image('text_3', 'assets/text_3.png');

    this.load.bitmapFont('catamaran', 'assets/catamaran.png','assets/catamaran.fnt');
    this.load.bitmapFont('gotham', 'assets/gotham.png','assets/gotham.fnt');

    },
    create: function() {
        this.game.time.events.add(Phaser.Timer.SECOND, function()
            {this.game.state.start('Menu')
        }, this);         
    }
};