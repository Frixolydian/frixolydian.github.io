WaveIndicator = function (game, state, wave) {
  this.state = state;
  Phaser.Sprite.call(this, game, 0, 0);
//  this.addChild(this.game.make.sprite(0, 0, 'back'));
  this.letter = game.add.bitmapText(-200, 400, 'font', 'WAVE ' + wave, 50);
  this.letter.fixedToCamera = true;
  this.game.add.tween(this.letter.cameraOffset).to( { x: 50 }, 1500, Phaser.Easing.Back.InOut, true);
  this.game.time.events.add(3000, function(){
    this.game.add.tween(this.letter.cameraOffset).to( { x: -200 }, 1500, Phaser.Easing.Back.InOut, true);
  }, this);
  this.game.time.events.add(4500, function(){
    this.letter.destroy();
    this.destroy();
  }, this);
};
  WaveIndicator.prototype = Object.create(Phaser.Sprite.prototype);
  WaveIndicator.prototype.constructor = WaveIndicator;


Clock = function (game, state) {
  this.state = state;
  Phaser.Sprite.call(this, game, 0, 0);
  game.add.existing(this);
  this.clock_text = game.add.bitmapText(500, 22, 'font', '', 18);
  this.clock_text.fixedToCamera = true;

  game.time.events.loop(500, function() {
    if (TIMER < 0){
      TIMER = 30;
      WAVE = WAVE + 1;
      if (WAVE % 5 === 0) {
        this.game.state.start('Purchase_screen');
      }
      new WaveIndicator(this.game, this.state, WAVE);
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

LEFT_ENEMY_TRAIN = false;
console.log(LEFT_ENEMY_TRAIN);
RIGHT_ENEMY_TRAIN = false;
console.log(RIGHT_ENEMY_TRAIN);

EnemyTrain = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x , y , 'wagon_1');
  game.add.existing(this);
  this.state = state;
  terrain_group.add(this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(320, 170, 43, 15);
  this.body.drag.x = 20;
  this.body.immovable = true;
  this.playerTrain = false;
  this.anchor.set(0.5);
  this.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
  this.animations.play('anim');
//healthbar
  this.addChild(this.game.make.image(-25, -50, 'healthbar')).scale.x = 0.5;
  this.addChild(this.game.make.image(-25, -50, 'healthbar_back')).scale.x = 0.5;
  this.maxHealth = 1000;
  this.health = 1000;

};

EnemyTrain.prototype = Object.create(Phaser.Sprite.prototype);
EnemyTrain.prototype.constructor = EnemyTrain;

EnemyTrain.prototype.update = function() {
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    if(!this.dead){
        new Howl({
          urls: ['assets/audio/metal_' + Math.ceil(Math.random() * 15) + '.wav'],
          volume: 0.05,
          pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
        }).play();
      b.destroy();
      a.receiveDamage(b.power);
    }
  }, null, this);
};

EnemyTrain.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);

  if (this.health <= damage && !this.dead) {
    this.dead = true;
    this.health = 1;
    this.getChildAt(0).kill();
    this.getChildAt(1).kill();
    this.game.time.events.repeat(200, 20, function() {
      Shake (this.game, this.state, 15, 10, 1);
      new Explosion(this.game, this.state, this.x + Math.random() * 320 - 160, this.y + Math.random() * 170 - 85, 'bullet', 50, 30, false);
    }, this);
    this.game.time.events.add(4001, function() {
      LEFT_ENEMY_TRAIN = false;
      this.pendingDestroy = true;
    }, this);
  }
  else {
    this.damage(damage);
    this.getChildAt(0).scale.x = this.health / this.maxHealth * 0.5;    
  }

};