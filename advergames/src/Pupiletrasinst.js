Fury.Pupiletrasinst = function(game){};

Fury.Pupiletrasinst.prototype = {


create:function() {
  this.back_button = this.add.sprite(57, 41, 'back');
  this.back_button.inputEnabled = true
  this.back_button.events.onInputUp.add(function(){
    this.game.state.start('Menu');
  }, this);

  this.title = this.game.add.bitmapText(256, 135, 'gotham', 'Pupiletras', 47);
  this.title.anchor.x = 0.5
  this.title.tint = 0x000000;

  this.text = this.game.add.sprite(53, 236, 'text_2');

  this.pupi = this.game.add.sprite(90, 421, 'pupi_1')

  this.line = this.add.graphics(145, 475);
  this.line.beginFill(0xc2185b, 1);
  this.line.drawRect(0, 0, 230, 8);
  this.line.scale.x = 0

  this.hand = this.game.add.sprite(100, 470, 'mano')

    this.game.add.tween(this.line.scale).to( {x: 1}, 1000, "Cubic", true, 200);
    this.game.add.tween(this.hand).to( {x: 330}, 1000, "Cubic", true, 200); 

  this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, function(){
    this.line.scale.x = 0;
    this.hand.x = 100
    this.game.add.tween(this.line.scale).to( {x: 1}, 1000, "Cubic", true);
    this.game.add.tween(this.hand).to( {x: 330}, 1000, "Cubic", true);   

  }, this);

  this.button = this.add.graphics(0, 0);
  this.button.beginFill(0xc2185b, 1);
  this.button.drawRoundedRect(57, 610, 400, 78, 32);
  this.button.inputEnabled = true
  this.button.events.onInputUp.add(function(){
    this.game.state.start('Pupiletras');
  }, this);

  this.button_text = this.add.bitmapText(256, 607, 'catamaran', 'EMPEZAR', 40);
  this.button_text.anchor.x = 0.5;
},



update:function() {

},



render:function(){
}

};