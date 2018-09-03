Fury.Menu = function(game){};

Fury.Menu.prototype = {


create:function() {

  this.advergames = this.game.add.bitmapText(100, 135, 'gotham', 'Adver', 47);
  this.advergames.tint = 0xc2185b;
  this.advergames2 = this.game.add.bitmapText(244, 135, 'gotham', 'Games', 47);
  this.advergames2.tint = 0x000000;

  this.facebook = this.game.add.sprite(102, 704, 'facebook');
  this.facebook.inputEnabled = true;
  this.facebook.events.onInputUp.add(function(){
    window.open("http://fb.com/furycake.games", "_blank");
  }, this);

  this.marca = this.game.add.sprite(102, 213, 'marca');

  this.rect = this.add.graphics(0, 0);
  this.rect.beginFill(0xcccccc, 1);
  this.rect.drawRect(0, 0, 512, 88);

  this.info_text = this.game.add.bitmapText(414, 53, 'gotham', '¿Qué es AdverGames?', 20);
  this.info_text.anchor.x = 1;
  this.info_text.anchor.y = 0.5;
  this.info_text.tint = 0xc2185b;

  this.info_help = this.game.add.sprite(183, 38, 'help');
  this.info_help.inputEnabled = true
  this.info_help.events.onInputUp.add(function(){
    this.game.state.start('Advergames');
  }, this);

  this.button_1_back = this.add.graphics(0, 0);
  this.button_1_back.beginFill(0xc49000, 1);
  this.button_1_back.drawRoundedRect(54, 511, 402, 70, 32);

  this.button_1 = this.add.graphics(0, 0);
  this.button_1.beginFill(0xfbc02d, 1);
  this.button_1.drawRoundedRect(54, 511, 402, 64, 32);
  this.button_1.inputEnabled = true
  this.button_1.events.onInputDown.add(function(){
    this.button_1.alpha = 0
  }, this);
  this.button_1.events.onInputUp.add(function(){
    this.game.state.start('Pupiletrasinst');
  }, this);

  this.button_2_back = this.add.graphics(0, 0);
  this.button_2_back.beginFill(0xc49000, 1);
  this.button_2_back.drawRoundedRect(54, 609, 402, 70, 32);

  this.button_2 = this.add.graphics(0, 0);
  this.button_2.beginFill(0xfbc02d, 1);
  this.button_2.drawRoundedRect(54, 609, 402, 64, 32);
  this.button_2.inputEnabled = true
  this.button_2.events.onInputDown.add(function(){
    this.button_2.alpha = 0
  }, this);
  this.button_2.events.onInputUp.add(function(){
    this.game.state.start('Laberintoinst');
  }, this);

  this.text_1 = this.game.add.bitmapText(256, 563, 'catamaran', 'PUPILETRAS', 27);
  this.text_1.anchor.x = 0.5;
  this.text_1.anchor.y = 1;
  this.text_1.tint = 0x2d2d2d

  this.text_2 = this.game.add.bitmapText(256, 660, 'catamaran', 'LABERINTO', 27);
  this.text_2.anchor.x = 0.5;
  this.text_2.anchor.y = 1;
  this.text_2.tint = 0x2d2d2d

},



update:function() {

},



render:function(){
}

};