tempo = 110;

Enemy = function (game, state, x, y, sprite, player, health) {
  Phaser.Sprite.call(this, game, x, y, sprite);
  game.add.existing(this);
  this.maxHealth = 100;
  this.health = 100;
  this.anchor.set(0.5);

  this.playa = player;

  this.state= state;
//add healthbar
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(0).beginFill(0xff0000);
  this.getChildAt(0).drawRoundedRect(-100, -150, 200, 16, 10);
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(1).beginFill(0x000000, 0);
  this.getChildAt(1).lineStyle(5, 0x000000, 1);
  this.getChildAt(1).drawRoundedRect(-100, -150, 200, 16, 10);

  this.inputEnabled = true;
  this.events.onInputUp.add(function() {
    if(this.state.states.Kusoge.turn === 0 ){
      this.receiveDamage(this.playa.power);
      this.state.states.Kusoge.turn = 2;
    }
  }, this);

  this.alpha_on = game.add.tween(this).to( { alpha: 0.7 }, 200, Phaser.Easing.Exponential.In);
  this.alpha_off = game.add.tween(this).to( { alpha: 1 }, 200, Phaser.Easing.Exponential.In);
  this.alpha_on.chain(this.alpha_off);
  this.alpha_off.onComplete.add(function() {
    if (this.state.states.Kusoge.turn === 0) {
      this.alpha_on.start();
    }
  }, this);

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

};

Enemy.prototype.receiveDamage = function(damage) {
  this.damage(damage);
  this.getChildAt(0).clear();
  this.getChildAt(0).drawRoundedRect(-100, -150, 200 * this.health / this.maxHealth, 16, 10);
};


Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

kusoge = function(game){};
kusoge.prototype = {
  init:function() {
    this.turn = 0;

  },

  create: function(){
    this.game.stage.backgroundColor = "#00CC66"; //set the background color

    this.scrolling_background = this.add.tileSprite(0, 0, 1280, 720, 'back_test');
    this.scrolling_background.scale.set(1.5);
//    this.scrolling_background.autoScroll(-100, 0);

    this.music = this.add.audio('track_1');
    this.music.addMarker('a', 0, 2.181);
    this.music.addMarker('b', 2.181, 2.181);
    this.music.play('a', null, 0.5, false, true);
    this.music.onStop.add(this.createNotation,this);

    this.sound_1 = this.add.audio('sound_1');

    this.pattern = [];

    this.figure = this.add.sprite(0, 0, null);

    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.key1.onDown.add(this.screenTap, this);
    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.key2.onDown.add(this.screenTap, this);
    this.game.input.onDown.add(this.screenTap, this);

    this.marker = this.game.add.graphics(10, 0);
    this.marker.beginFill(0x00FF99, 1);
    this.marker.drawRect(0, 50, 8, 100);

    this.player_sprite = this. add.sprite(380, 550, 'player');
    this.player_sprite.scale.set(5);
    this.player_sprite.smoothed = false;
    this.player_sprite.power = 10;

    this.enemy_sprite = new Enemy (this.game, this.state, 800, 560, 'enemy', this.player_sprite);

//CREATE FLOW BAR

    this.flow_bar = this.add.graphics(0, 0);
    this.flow_bar.beginFill(0xff0000);
    this.flow_bar.drawRoundedRect(50, 100, 24, 500, 10);
    this.flow_bar_fill = this.add.graphics(0, 0);
    this.flow_bar_fill.beginFill(0x000000, 0);
    this.flow_bar_fill.lineStyle(5, 0x000000, 1);
    this.flow_bar_fill.drawRoundedRect(50, 100, 24, 500, 10);

    this.errors = 0;
  },

  createNotation: function(){
    if (this.turn === 0 || this.turn === 2){
      this.turn = 1;
    }
    else {
      this.turn = 0;
      this.enemy_sprite.alpha_on.start();
    }

    this.notation = [];
    this.pattern = this.next_pattern;
    this.next_pattern = [];
    this.music.play('a', null, 0.5);

    if (this.turn === 0) {
      for (var i = 0; i < 4; i++){
        j = Math.random();
        if (j > 0.5){
          this.notation.push(0); //push negra
        }
        else if (j > 0.2){
          this.notation.push(1);//push corcheas
        }
        else if (j > 0){
          this.notation.push(2);//push corcheas
        }
/*      else if (j > 0.2){
          this.notation.push(3);//push corcheas
        }
        else if (j > 0.0){
          this.notation.push(4);//push corcheas
        }*/
      }
    }
    else {
      for (var i = 0; i < 4; i++){
        this.notation.push(100);
      }
    }
    this.createPattern();
    this.renderPattern();
  },

  createPattern: function(){
    this.next_pattern = [];

    if (this.turn === 0) {
      for (var i = 0; i < 4; i++) {
        if (this.notation[i] === 0){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(0);
          this.next_pattern.push(0);
        }
        else if(this.notation[i] === 1){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(1);
          this.next_pattern.push(0);
        }
        else if(this.notation[i] === 2){
          this.next_pattern.push(1);
          this.next_pattern.push(1);
          this.next_pattern.push(1);
          this.next_pattern.push(1);
        }
        else if(this.notation[i] === 3){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(0);
          this.next_pattern.push(1);
        }
        else if(this.notation[i] === 4){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(1);
          this.next_pattern.push(1);
        }
      }
    }
    else{
      for (var i = 0; i < 16; i++) {
        this.next_pattern.push(0);
      }
    }
  },

  screenTap: function(){
    if(this.turn === 1 && this.pattern[Math.floor(this.music.currentTime / 150 - 50) % 16] === 0){
      console.log("non");
      this.errors ++;
    }
    else{
      this.sound_1.play();
    }
  },

  renderPattern: function(){
    this.marker.x = 500;
    this.add.tween(this.marker).to( { x: 1010 }, 60000 / tempo * 4, Phaser.Easing.Linear.None, true, 0, 0, false);

    if (this.next_pattern !== []) {
      for (var i = 0; i < 4; i++) {
        this.figure[i] = this.add.sprite(500 + i * 100, 250, 'figures', this.notation[i]);
        this.figure.addChildAt(this.figure[i], i);
        this.add.tween(this.figure.getChildAt(i)).to( { y: this.figure.getChildAt(i).y - 100 }, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
      }
    }
    if (this.pattern !== undefined && this.figure.children.length > 8){
      for (var i = 4; i < 8; i++) {
        this.add.tween(this.figure.getChildAt(i + 4)).to( {alpha: 0}, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
        this.add.tween(this.figure.getChildAt(i + 4)).to( {y: this.figure.getChildAt(i + 4).y - 100}, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
        this.add.tween(this.figure.getChildAt(i)).to( {y: this.figure.getChildAt(i).y - 100}, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
      }
    }
    if (this.figure.children.length > 12){
      for (var i = 4; i < 8; i++) {
        this.figure.getChildAt(i + 4).destroy();
      }
    }
  },

  update: function(){

  },
  render: function(){
    this.game.debug.text('Timestamp: ' + this.music.currentTime, 30, 30);
    this.game.debug.text('Beat: ' + (Math.floor(this.music.currentTime / 150) % 16 + 1), 30, 60);
    this.game.debug.text('errors' + this.errors, 30, 90);
    this.game.debug.text('Turn' + this.turn, 30, 120);
    this.game.debug.text('Enemy Health' + this.enemy_sprite.health, 30, 150);

  }
};