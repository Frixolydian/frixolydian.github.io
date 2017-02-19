var Doge = {
    _WIDTH:480,
    _HEIGHT:640};
Doge.Boot = function(game) {};
Doge.Boot.prototype = {
    preload: function() {
    this.load.image('preloadBar', 'assets/preloader_bar.png');    
    },
    create: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preloader');
    }
};