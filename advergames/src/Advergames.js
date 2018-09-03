Fury.Advergames = function(game){};

Fury.Advergames.prototype = {


create:function() {
  this.back_button = this.add.sprite(57, 41, 'back');
  this.back_button.inputEnabled = true
  this.back_button.events.onInputUp.add(function(){
    this.game.state.start('Menu');
  }, this);

  this.advergames = this.game.add.bitmapText(100, 135, 'gotham', 'Adver', 47);
  this.advergames.tint = 0xc2185b;
  this.advergames2 = this.game.add.bitmapText(244, 135, 'gotham', 'Games', 47);
  this.advergames2.tint = 0x000000;

  this.text = this.game.add.sprite(53, 236, 'text_1');

  this.button = this.add.graphics(0, 0);
  this.button.beginFill(0xc2185b, 1);
  this.button.drawRoundedRect(57, 704, 402, 56, 32);
  this.button.inputEnabled = true
  this.button.events.onInputUp.add(function(){
    window.open("mailto:furycakegames@gmail.com", "_blank");
  }, this);

  this.button_text = this.add.bitmapText(256, 708, 'catamaran', 'furycakegames@gmail.com', 22);
  this.button_text.anchor.x = 0.5;
},



update:function() {

},



render:function(){
}

};