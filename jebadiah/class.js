Clock = function (game, state) {
  this.state= state;
  Phaser.Sprite.call(this, game, 0, 0);
  game.add.existing(this);
  this.clock_text = game.add.bitmapText(500, 22, 'font', '', 36);
  this.clock_text.fixedToCamera = true;

  game.time.events.loop(1000, function() {
    if (TIMER < 0){
      TIMER = 60;
      game.state.start('Purchase_screen');
    }
    if (TIMER % 60 < 10 ){
      this.clock_text.text = 'Time left: ' + Math.floor(Math.floor(TIMER) / 60) +': 0' + Math.floor(TIMER) % 60;
    }
    else if (Math.ceil(TIMER / 60) < 10 ){
      this.clock_text.text = 'Time left: ' + Math.floor(Math.floor(TIMER) / 60) +': '+ Math.floor(TIMER) % 60;
    }
    else{
      this.clock_text.text = 'Time left: ' + Math.floor(Math.floor(TIMER) / 60) +': '+ Math.floor(TIMER) % 60;
    }
    TIMER -= 1;
  }, this);

};
  Clock.prototype = Object.create(Phaser.Sprite.prototype);
  Clock.prototype.constructor = Clock;



Explosion = function (game, state, x, y, sprite, duration, power, enemy) {
  Phaser.Sprite.call(this, game, x , y , 'explosion');
  game.add.existing(this);
  this.state = state;
  this.angle = Math.random() * 30 - 15;
  this.animations.add('explode', [0,1,2,3], 15, false);
  this.animations.play('explode');
  this.animations.currentAnim.onComplete.add(function() {this.destroy();}, this);
  this.power = power;
  this.duration = duration;
  this.enemy = enemy;
  this.smoothed = false;
  this.anchor.set(0.5);
  this.scale.set(Math.random() * 0.5 + 1);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  new Howl({
    urls: ['assets/audio/explosion.ogg'],
    volume: 0.1,
    pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
  }).play();
/*
  this.grow = game.add.tween(this.scale).to( { x: 7 , y: 7 }, 150, Phaser.Easing.Quadratic.In);
  this.shrink = game.add.tween(this.scale).to( { x: 1 , y: 1 }, 600, Phaser.Easing.Quadratic.In);
  this.grow.chain(this.shrink);
  this.shrink.onComplete.add(function() {
    this.destroy();
  }, this);
  this.grow.start();*/
};
Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function() {

};



HomingMissile = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);
  this.scale.set(2);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.drag.x = 200;
  this.body.drag.y = 200;
  this.body.maxVelocity.x = 250;
  this.body.maxVelocity.y = 250;
  this.body.velocity.y = -1000;
  this.game.time.events.add(4000, function() {
    this.destroy();
  }, this);
};

HomingMissile.prototype = Object.create(Phaser.Sprite.prototype);
HomingMissile.prototype.constructor = HomingMissile;

HomingMissile.prototype.update = function() {
  this.body.velocity.y += 30 * (Math.sin(Math.atan2(playa.y - this.y, playa.x - this.x )));
  this.body.velocity.x += 100 * (Math.cos(Math.atan2(playa.y - this.y, playa.x - this.x )));
  this.angle = Math.atan2(this.body.velocity.y, this.body.velocity.x) * 180 / 3.1416;
};



Turret = function (game, state, x, y, sprite, upgrade) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.2, 0.5);
  this.target = null;
  this.upgrade = upgrade;
  this.shoot();
};

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.update = function() {
  if (this.target === null) {
    enemy_group.forEach(function(item) {
      if (this.game.math.distance(this.x, this.y, item.x, item.y) < 500) {
        this.target = item;
      }
    }, this);
  }
  else {
    this.angle = this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y));
    if (this.game.math.distance(this.x, this.y, this.target.x, this.target.y) > 500 || !this.target.alive) {
      this.target = null;
    }
  }
};

Turret.prototype.shoot = function() {
  this.game.time.events.loop(250 + (250 / (this.upgrade + 1)), function() {
    if (this.target !== null && this.target.alive) {
      new Howl({
        urls: ['assets/audio/mp5_shot.ogg'],
        volume: 0.05,
        pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
      }).play();
      new Bullet (this.game, this.state, this.x, this.y, 'bullet', this.target.x, this.target.y, 1500, 10, false, 1);
    }
  },this);
};