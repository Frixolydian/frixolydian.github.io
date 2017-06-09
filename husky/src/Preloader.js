Doge.Preloader = function(game) {};
Doge.Preloader.prototype = {
    preload: function() {
    this.preloadBar=this.add.sprite(512/2,512/2,'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.audio('audio', ['assets/audio.ogg']);
    this.load.bitmapFont('scorefont', 'assets/scorefont.png','assets/font.fnt');
    this.load.image('bar','assets/bar.png');
    this.load.image('restart','assets/restart.png');
    this.load.image('endscreen','assets/gameover.png');    
    this.load.image('background','assets/husky/huskybackground.png');
    this.load.image('back1', 'assets/husky/huskyback1.png');
    this.load.image('back2', 'assets/husky/huskyback2.png');
    this.load.image('back3magenta', 'assets/husky/huskyback3magenta.png');
    this.load.image('back3blue', 'assets/husky/huskyback3blue.png');   
    this.load.image('back3cyan', 'assets/husky/huskyback3cyan.png');
    this.load.image('back4', 'assets/husky/huskyback4.png');
    this.load.image('back5', 'assets/husky/huskyback5.png');
    this.load.spritesheet('doge','assets/husky/husky.png',33,33);
    this.load.image('obstacle','assets/husky/obstacle.png');
    this.load.image('frisbee','assets/husky/frisbee.png');
    this.load.image('frisbeecounter','assets/husky/frisbeecounter.png');
    },
    create: function() {
        this.game.state.start('Game');
    }
};