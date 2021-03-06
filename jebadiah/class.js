Coin = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x , y , 'coin');
  game.add.existing(this);
  this.state = state;
  this.autoCull = true;
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.velocity.y = -Math.random() * 100;
  this.body.velocity.x = Math.random() * 100 - 50;
  this.body.gravity.y = 400;
  this.body.bounce.y = 0.9;
  this.animations.add('gubi', [0, 1, 2, 3, 4, 5], Math.random() * 10 + 10, true);
  this.animations.play('gubi');
  this.events.onOutOfBounds.add(function() {
    this.pendingDestroy = true;
  }, this);
  this.events.onKilled.add(function(){
    money += 5;
    new Howl({
      urls: ['assets/audio/coin.wav'],
      volume: 0.5,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.01, 0, 0],
    }).play();
    for (i = 1; i <= 20; i++) {
      new Impact(this.game, this.state, this.x, this.y, 'impact', Math.random() * 360, [0xffb400, 0xf7ff20, 0xffd800], Math.random() * 100 + 100, 0.5);
    }
  }, this);
  this.body.acceleration.x = -150;
};
Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.update = function() {
  this.game.physics.arcade.collide(this, floor, function(a, b) {
    if (b.playerTrain === true) {
      this.kill();
    }
  }, null, this);
  this.game.physics.arcade.overlap(this, terrain_group, function(a, b) {
    if (b.playerTrain === true) {
      this.kill();
    }
  }, null, this);
};

Rocket = function (game, state, x, y, sprite, directionx, directiony, speed, power, enemy, deviation) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.autoCull = true;
  bullet_group.add(this);
  this.power = power;
  this.enemy = enemy;
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(4, 2, 2, 2);
  this.game.physics.arcade.velocityFromAngle(this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, directionx, directiony)) + Math.random() * deviation - deviation / 2, speed, this.body.velocity);
  this.angle = this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, directionx, directiony));
  this.body.gravity.y = 400;
  this.events.onOutOfBounds.add(function() {
    this.pendingDestroy = true;
  }, this);
  this.thrust();
  this.events.onKilled.add(function(){
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
  }, this);
};
Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.update = function() {
  this.angle = this.game.math.radToDeg(Math.atan2(this.body.velocity.y, this.body.velocity.x));
  this.game.physics.arcade.overlap(this, terrain_group, function(a, b) {
    if (b.material === 'none') {
      return;
    }
    if (this.enemy) {
      structure_health -= 3;
      updateHealthBar(this.game, this.state);
    }
    this.kill();
  }, null, this);
  this.game.physics.arcade.overlap(this, enemy_group, function(a, b) {
    if (!this.enemy){
      b.receiveDamage(a.power);
      this.kill();
    }
  }, null, this);
};

Rocket.prototype.thrust = function() {
  new Impact(this.game, this.state, this.x, this.y, 'impact', Math.atan2(this.body.velocity.y, this.body.velocity.x), [0x555555, 0xCCCCCC, 0xFFFFFF], 250, 1);
  this.game.time.events.add(5, function() {
    if (this.alive) {
      this.thrust();
    }
  }, this);
};

Impact = function (game, state, x, y, sprite, direction, impact_tint, time, size) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  bullet_group.add(this);
  this.autoCull = true;
  this.anchor.set(0.5);
  this.scale.set(size + Math.random() * size);
  j = Math.random();
  if (j > 0.6) {
    this.tint = impact_tint[0];
  }
  else if (j > 0.3) {
    this.tint = impact_tint[1];
  }
  else {
    this.tint = impact_tint[2];
  }
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.game.physics.arcade.velocityFromAngle(this.game.math.radToDeg(direction) - 195 + Math.random() * 60, 150 + Math.random() * 150, this.body.velocity);
//  this.body.gravity.y = 400;
  this.game.time.events.add(time, function(){
    this.destroy();
  }, this);
  this.events.onOutOfBounds.add(function() {
    this.destroy();
  }, this);
};

Impact.prototype = Object.create(Phaser.Sprite.prototype);
Impact.prototype.constructor = Impact;



Bullet = function (game, state, x, y, sprite, directionx, directiony, speed, power, enemy, deviation) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.autoCull = true;
  bullet_group.add(this);
  this.power = power;
  this.enemy = enemy;
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(4, 2, 2, 2);
  this.game.physics.arcade.velocityFromAngle(this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, directionx, directiony)) + Math.random() * deviation - deviation / 2, speed, this.body.velocity);
  this.angle = this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, directionx, directiony));
  this.impact_tint = [];
  this.events.onOutOfBounds.add(function() {
    this.destroy();
  }, this);
  this.events.onKilled.add(function(){
    for (i = 1; i <= 20; i++) {
      new Impact(this.game, this.state, this.x, this.y, 'impact', Math.atan2(this.body.velocity.y, this.body.velocity.x), this.impact_tint, 150, 0.5);
    }
  }, this);
};
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
  if (this.enemy === false && this.x < this.game.camera.x - 150 || this.x > this.game.camera.x + this.game.width + 150) {
    this.pendingDestroy = true;
  }
  this.game.physics.arcade.overlap(this, terrain_group, function(a, b) {
    if (b.material === 'none') {
      return;
    } 
    if (b.enemy) {
      b.receiveDamage(this.power);
    }
    if (this.enemy) {
      structure_health -= 3;
      updateHealthBar(this.game, this.state);
    }
    new Howl({
      urls: ['assets/audio/'+ b.material + '_' + Math.ceil(Math.random() * 4) + '.wav'],
      volume: 0.5,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.01, 0, 0],
    }).play();
    this.impact_tint = b.impact_tint;
    this.kill();
  }, null, this);
  this.game.physics.arcade.overlap(this, enemy_group, function(a, b) {
    if (!this.enemy){
      new Howl({
        urls: ['assets/audio/'+ b.material + '_' + Math.ceil(Math.random() * 4) + '.wav'],
        volume: 0.5,
        pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
      }).play();
      b.receiveDamage(a.power);
      this.impact_tint = b.impact_tint;
      this.kill();
    }
  }, null, this);
  this.game.physics.arcade.overlap(this, front_enemy_group, function(a, b) {
    if (!this.enemy){
      new Howl({
        urls: ['assets/audio/'+ b.material + '_' + Math.ceil(Math.random() * 4) + '.wav'],
        volume: 0.5,
        pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
      }).play();
      b.receiveDamage(a.power);
      this.impact_tint = b.impact_tint;
      this.kill();
    }
  }, null, this);
};

Terrain = function (game, state, a, b, c, d, oneway, material, impact_tint) {
  Phaser.Sprite.call(this, game, a, b);
  game.add.existing(this);
  state = this.state;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(c, d, 0, 0);
  this.body.immovable = true;
  this.oneway = oneway;
  this.material = material;
  this.impact_tint = impact_tint;
  if (this.oneway) {
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
  }
  terrain_group.add(this);
};
Terrain.prototype = Object.create(Phaser.Sprite.prototype);
Terrain.prototype.constructor = Terrain;



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
    if (TIMER < 0 && !BUYING){
      WAVE = WAVE + 1;
      if (WAVE % 3 === 0 && WAVE !== 1) {
        BUYING = true;
        shop_wagon = new ShopWagon(this.game, this.state, -1500, 550);
      }
      else {
        TIMER = 60;
        new WaveIndicator(this.game, this.state, WAVE);
      }
    }
    if (BUYING) {
      TIMER = 0;
      this.clock_text.text = ':^)';
    }
    else {
      if (TIMER % 60 < 10 ) {
        this.clock_text.text = 'Time left: ' + Math.floor(Math.floor(TIMER) / 60) +': 0' + Math.floor(TIMER) % 60;
      }
      else if (Math.ceil(TIMER / 60) < 10 ){
        this.clock_text.text = 'Time left: ' + Math.floor(Math.floor(TIMER) / 60) +': '+ Math.floor(TIMER) % 60;
      }
      else{
        this.clock_text.text = 'Time left: ' + Math.floor(Math.floor(TIMER) / 60) +': '+ Math.floor(TIMER) % 60;
      }
      TIMER -= 1;
    }
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
  terrain_group.add(this);
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
RIGHT_ENEMY_TRAIN = false;

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

ShopWagon = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x , y , 'shop_wagon');
  game.add.existing(this);
  this.state = state;
  terrain_group.add(this);
  this.material = 'metal';
  this.impact_tint = [0xFFFF99, 0xFFD699, 0xFFFFFF];
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(240, 170, 43, 65);
  this.body.drag.x = 20;
  this.body.immovable = true;
  this.playerTrain = false;
  this.anchor.set(0.5);
  this.body.velocity.x = 200;
};

ShopWagon.prototype = Object.create(Phaser.Sprite.prototype);
ShopWagon.prototype.constructor = ShopWagon;

ShopWagon.prototype.update = function() {
  this.game.physics.arcade.collide(this, player_group, function(a, b) {
    if (b.y < a.y - 40 && BUYING && !SHOP_OPEN) {
      //this.goAway();
      LeftShopUnfold(this.game, this.state);

    }
  }, null, this);
};

ShopWagon.prototype.goAway = function() {
  this.body.acceleration.x = -50;
  BUYING = false;
  TIMER = 20;
  new WaveIndicator(this.game, this.state, WAVE);
};