Fury.Laberintoinst = function(game){};

Fury.Laberintoinst.prototype = {


create:function() {
  this.back_button = this.add.sprite(57, 41, 'back');
  this.back_button.inputEnabled = true
  this.back_button.events.onInputUp.add(function(){
    this.game.state.start('Menu');
  }, this);

  this.title = this.game.add.bitmapText(256, 135, 'gotham', 'Laberinto', 47);
  this.title.anchor.x = 0.5
  this.title.tint = 0x000000;

  this.text = this.game.add.sprite(53, 236, 'text_3');

  this.button = this.add.graphics(0, 0);
  this.button.beginFill(0xc2185b, 1);
  this.button.drawRoundedRect(57, 610, 400, 78, 32);
  this.button.inputEnabled = true
  this.button.events.onInputUp.add(function(){
    this.game.state.start('Laberinto');
  }, this);

  this.button_text = this.add.bitmapText(256, 607, 'catamaran', 'EMPEZAR', 40);
  this.button_text.anchor.x = 0.5;
},



update:function() {

},



render:function(){
}

};