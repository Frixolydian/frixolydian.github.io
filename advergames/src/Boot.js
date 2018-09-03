var root2 = 1.4142
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

function reverse(s){
  return s.split("").reverse().join("");
}

function rand(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function zero(n){
  if (n < 10){
    return '0' + n
  }
  else{
    return n
  }
}

function clock(n){
  return zero(Math.floor(n / 60)) + ':' + zero(n % 60)
}

var Fury = {
    _WIDTH:800,
    _HEIGHT:480
};

WebFontConfig = {
    google: {
      families: ['Catamaran']
    }
};

Fury.Boot = function(game) {};
Fury.Boot.prototype = {
    preload: function() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    this.game.stage.backgroundColor = "#FFFFFF";
    this.load.image('preloadBar', 'assets/preloader_bar.png');
    this.load.image('furycakeLogo', 'assets/furycake.png');
    },
    create: function() {
        this.game.state.start('Preloader')
    }
};