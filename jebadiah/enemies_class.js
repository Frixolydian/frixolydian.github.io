Enemy = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y, sprite);
  game.add.existing(this);
  this.state = state;
  this.material = 'tarmac';
  this.impact_tint = [0x92705E, 0xC99689, 0x444B25];
  this.autoCull = true;
  this.anchor.set(0.5);
//physics
  this.y = 500 + Math.random() * 70;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.gravity.y = 400;
  this.body.bounce.y = 1;
  if (Math.random() > 0.5) {
    this.x = this.game.world.bounds.x - 40;
    this.body.velocity.x = 90;
    this.direction = 1;
    this.body.angularVelocity = 300;
 }
  else {
    this.x = this.game.world.bounds.x + this.game.world.bounds.width + 40;;
    this.body.velocity.x = -90;
    this.direction =- 1;
    this.body.angularVelocity = -300;
  }
  enemy_group.add(this);
  this.maxHealth = 40 + WAVE * 10;
  this.health = 40 + WAVE * 10;
//add indicator
  this.indicator = this.game.add.image(0, 0, 'indicator');
//when dead
  this.events.onKilled.add(function(){
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    money += 50;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    this.pendingDestroy = true;
  }, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
//indicator
  if (this.x > this.game.camera.x + this.game.width && this.x < 1000){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x && this.x > -1000){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//kamikaze
  this.game.physics.arcade.collide(this, floor);
  this.game.physics.arcade.overlap(this, terrain_group, function(a, b) {
    if(b.playerTrain){
      structure_health -= 10;
      updateHealthBar(this.game, this.state);
      this.kill();
    }
  }, null, this);
};

Enemy.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);
  this.damage(damage);
};

Enemy_2 = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.material = 'tarmac';
  this.impact_tint = [0xFF0000, 0x990000, 0x4D0000];
  this.anchor.set(0.5);
  this.autoCull = true;
  enemy_group.add(this);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(22, 63, 9, 5)
  this.body.drag.x = 500;
  this.body.drag.y = 30;
  this.body.maxVelocity.x = 200;
  this.body.maxVelocity.y = 50;
  this.body.gravity.y = 50;
//healthbar
  this.maxHealth = 85 + WAVE * 15;
  this.health = 85 + WAVE * 15;
  this.dead = false;
//add indicator
  this.indicator = this.game.add.image(0, 0, 'indicator');
//spawn
  if (Math.random() > 0.5) {
    this.x = this.game.world.bounds.x - 40;
  }
  else {
    this.x = this.game.world.bounds.x + this.game.world.bounds.width + 40;
  }
  this.target_position_x = -500 + Math.random() * 1000;
  this.target_position_y = 270 + Math.random() * 100;
   this.y = 100 + Math.random() * 500;
  this.shooting = false;
  this.throwing = false;
//when dead
  this.events.onKilled.add(function(){
    for (i = 1; i <= 10; i++) {
      new Coin(this.game, this.state, this.x, this.y);          
    }
    money += 75;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    this.pendingDestroy = true;
  }, this);
  this.thrust();
//attack
//  this.throwGrenade();
};

Enemy_2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_2.prototype.constructor = Enemy_2;

Enemy_2.prototype.shoot = function() {
  if (this.dead) {
    return;
  }
  if (!playa.alive) {
    return;
  }
  this.shooting = true;
  this.game.time.events.repeat(150, 1, function() {
    new Howl({
      urls: ['assets/audio/pistol_shot.ogg'],
      volume: 0.5,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, -0.5],
    }).play();
    new Bullet (this.game, this.state, this.x, this.y, 'bullet', playa.x, playa.y, 400, 10, true, 0).scale.set(1.5);
  }, this);
  this.game.time.events.add(1500, function() {
    this.shooting = false;
  }, this);
};

Enemy_2.prototype.thrust = function() {
  if (this.frame === 0) {
    new Impact(this.game, this.state, this.x - 12, this.y + 12, 'impact', this.game.math.degToRad(280), [0xfaf223, 0xffc600, 0xfffbb7], 200, 0.5);
  }
  else {
    new Impact(this.game, this.state, this.x + 12, this.y + 12, 'impact', this.game.math.degToRad(260), [0xfaf223, 0xffc600, 0xfffbb7], 200, 0.5);
  }
  this.game.time.events.add(3, function() {
    if (this.alive) {
      this.thrust();
    }
  }, this);
};

Enemy_2.prototype.throwGrenade = function() {
  new HomingMissile(this.game, this.state, this.x, this.y, 'small_fish');
};

Enemy_2.prototype.update = function() {
  if (!this.alive) {
    return;
  }
  //flip
  if (this.x > playa.x) {
    if (this.frame === 0) {
      this.frame = 1;
    }
  }
  else {
    if (this.frame === 1) {
      this.frame = 0;
    }
  }
  //indicator
  if (this.x > this.game.camera.x + this.game.width && this.x < 1000){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x && this.x > -1000){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//behaviour
  if (!this.shooting && this.game.math.distance(this.x, this.y, playa.x, playa.y) < 400) {  
    this.shoot();
  }
//flying
  if (!this.dead) {
    if(this.y > this.target_position_y) {
      this.body.velocity.y += 10 * (Math.sin(Math.atan2(this.target_position_y - this.y, this.target_position_x - this.x )));
    }
    this.body.velocity.x += 10 * (Math.cos(Math.atan2(this.target_position_y - this.target_position_y, this.target_position_x - this.x )));
  }
  this.game.physics.arcade.collide(this, terrain_group, function(a, b) {
    this.kill();
  }, null, this);
};

Enemy_2.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);
  if (damage > 200) {
    this.kill();
    return;
  }
  if (this.health <= damage && !this.dead) {
    this.dead = true;
    this.health = 70;
    this.body.angularAcceleration = -50;
    this.body.gravity.y = 250;
    this.body.maxVelocity.y = 1000;
    this.body.gravity.x = -30;
    this.body.drag.x = 0;
    this.body.drag.y = 0;
  }
  else {
    this.damage(damage);   
  }
};

tweenDamage = function(game, state, object) {
  if (!object.alive) {
    return;
  }
  object.tint = 0xff9999;
  game.time.events.add(50, function() {
    object.tint = 0xffffff;
  }, this);
};

EnemyHandcar = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x , y , 'handcar');
  game.add.existing(this);
  this.state = state;
  this.enemy = true;
  this.cowboydead = false;
  terrain_group.add(this);
  this.material = 'metal';
  this.impact_tint = [0xFFFF99, 0xFFD699, 0xFFFFFF];
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(100, 20, 0, 37);
  this.body.drag.x = 200;
  this.body.maxVelocity.x = 150;
  this.body.immovable = true;
  this.playerTrain = false;
  this.anchor.set(0.5);
  this.x = Math.random() > 0.5 ? -1500 : 1500;
  this.body.acceleration.x = this.x > 0 ? -250 : 250;
//healthbar
  this.maxHealth = 180;
  this.health = 180;
  this.dead = false;

  this.events.onKilled.add(function() {
    for (i = 1; i <= 10; i++) {
      new Coin(this.game, this.state, this.x, this.y);          
    }
  }, this);

  this.cowboy = new Enemy_cowboy(game, state, this.x, this.y - 40, 'enemy_2');
  this.cowboy.events.onKilled.add(function() {
    if (this.alive) {
      this.cowboydead = true;
      this.body.acceleration.x = -250;
      this.body.maxVelocity.x = 200;
    }
  }, this);

  this.addChild(this.game.make.image(-30, 20, 'handcar_wheel')).anchor.set(0.5);
  this.addChild(this.game.make.image(30, 20, 'handcar_wheel')).anchor.set(0.5);
  this.addChild(this.game.make.image(0, -20, 'handcar_handle')).anchor.set(0.5);
  this.getChildAt(2).rotationchange = false;
};

EnemyHandcar.prototype = Object.create(Phaser.Sprite.prototype);
EnemyHandcar.prototype.constructor = EnemyHandcar;

EnemyHandcar.prototype.update = function() {
  this.getChildAt(0).angle += 10;
  this.getChildAt(1).angle += 10;
  if (this.getChildAt(2).rotationchange) {
    this.getChildAt(2).angle -= 3;
  }
  else {
    this.getChildAt(2).angle += 3;
  }
  if (this.getChildAt(2).angle > 25) {
    this.getChildAt(2).rotationchange = true;
  }
  if (this.getChildAt(2).angle < -25) {
    this.getChildAt(2).rotationchange = false;
  }
  if (!this.cowboydead) {
    if (this.x > 0 && this.x < 450) {
      this.body.acceleration.x = 250;
    }
    if (this.x > 700) {
      this.body.acceleration.x = -250;
    }
    if (this.x < 0 && this.x > -450) {
      this.body.acceleration.x = -250;
    }
    if (this.x < -700) {
      this.body.acceleration.x = 250;
    }
  }
};

EnemyHandcar.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);
  if (this.health <= damage && !this.dead) {
    this.game.time.events.repeat(200, 3, function() {
      new Explosion(this.game, this.state, this.x + Math.random() * 100 - 50, this.y + Math.random() * 70 - 35, 'bullet', 50, 30, false);
    }, this);
    this.game.time.events.add(601, function() {
      this.pendingDestroy = true;
    }, this);
    this.dead = true;
    this.health = 1;
  }
  else {
    this.damage(damage);
  }
};

Enemy_cowboy = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.material = 'tarmac';
  this.impact_tint = [0xFF0000, 0x990000, 0x4D0000];
  this.anchor.set(0.5);
  this.autoCull = true;
  enemy_group.add(this);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(22, 60, 9, 5)
  this.body.drag.x = 500;
  this.body.maxVelocity.x = 200;
  this.body.gravity.y = 400;
//healthbar
  this.maxHealth = 85 + WAVE * 15;
  this.health = 85 + WAVE * 15;
  this.dead = false;
//add indicator
  this.indicator = this.game.add.image(0, 0, 'indicator');

  this.shooting = false;
  this.throwing = false;
//when dead
  this.events.onKilled.add(function(){
    money += 75;
    for (i = 1; i <= 10; i++) {
      new Coin(this.game, this.state, this.x, this.y);          
    }
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    this.pendingDestroy = true;
  }, this);
//attack
//  this.throwGrenade();
};

Enemy_cowboy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_cowboy.prototype.constructor = Enemy_cowboy;

Enemy_cowboy.prototype.shoot = function() {
  if (this.dead) {
    return;
  }
  if (!playa.alive) {
    return;
  }
  this.shooting = true;
  this.game.time.events.repeat(150, 1, function() {
    new Howl({
      urls: ['assets/audio/pistol_shot.ogg'],
      volume: 0.5,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, -0.5],
    }).play();
    new Bullet (this.game, this.state, this.x, this.y, 'bullet', playa.x, playa.y, 400, 10, true, 0).scale.set(1.5);
  }, this);
  this.game.time.events.add(1500, function() {
    this.shooting = false;
  }, this);
};

Enemy_cowboy.prototype.throwGrenade = function() {
  new HomingMissile(this.game, this.state, this.x, this.y, 'small_fish');
};

Enemy_cowboy.prototype.update = function() {
  if (!this.alive) {
    return;
  }
  //flip
  if (this.x > playa.x) {
    if (this.frame === 0) {
      this.frame = 1;
    }
  }
  else {
    if (this.frame === 1) {
      this.frame = 0;
    }
  }
  //indicator
  if (this.x > this.game.camera.x + this.game.width && this.x < 1000){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x && this.x > -1000){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//behaviour
  if (!this.shooting && this.game.math.distance(this.x, this.y, playa.x, playa.y) < 400) {  
    this.shoot();
  }
//flying
  if (!this.dead) {
    if(this.y > this.target_position_y) {
      this.body.velocity.y += 10 * (Math.sin(Math.atan2(this.target_position_y - this.y, this.target_position_x - this.x )));
    }
    this.body.velocity.x += 10 * (Math.cos(Math.atan2(this.target_position_y - this.target_position_y, this.target_position_x - this.x )));
  }
  this.game.physics.arcade.collide(this, terrain_group, function(a, b) {
    if (b === floor) {
      this.kill();
    }
  }, null, this);
};

Enemy_cowboy.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);
  if (damage > 200) {
    this.kill();
    return;
  }
  if (this.health <= damage && !this.dead) {
    this.kill();
  }
  else {
    this.damage(damage);
  }
};

EnemyPlane = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x , y , 'enemy_plane');
  game.add.existing(this);
  this.state = state;
  this.enemy = true;
  front_enemy_group.add(this);
  this.material = 'metal';
  this.impact_tint = [0xFFFF99, 0xFFD699, 0xFFFFFF];
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(250, 40, 20, 50);
  this.anchor.set(0.5);
  this.y = Math.random() * 50 + 250;
  this.x = Math.random() > 0.5 ? -1500 : 1500;
  this.addChild(this.game.make.sprite(0, 20)).anchor.set(0.5);
  this.getChildAt(0).x = this.x > 0 ?  -130 : 130;
  this.body.velocity.x = this.x > 0 ? -250 : 250;
  this.body.velocity.y = Math.random() * 50 - 25;
  this.frame = this.x > 0 ? 0 : 1;
//healthbar
  this.maxHealth = 100;
  this.health = 100;
  this.dead = false;
  this.destroyed = false;
//add indicator
  this.events.onKilled.add(function() {
    for (i = 1; i <= 10; i++) {
      new Coin(this.game, this.state, this.x, this.y - 50);          
    }
    this.indicator.destroy();
  }, this);
  this.indicator = this.game.add.image(0, 0, 'indicator');
}

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {
  if (!this.alive) {
    return;
  }
  //indicator
  if (this.x > this.game.camera.x + this.game.width && this.x < 1000){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x && this.x > -1000){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//behaviour
/*  if (!this.shooting && this.game.math.distance(this.x, this.y, playa.x, playa.y) < 400) {  
    this.shoot();
  }*/
  this.game.physics.arcade.overlap(this, floor, function(a, b) {
    if (!this.destroyed) {
      for (i = 1; i <= 4; i++) {
        this.game.time.events.add(i * 50, function() {
          new Explosion(this.game, this.state, this.x + Math.random() * 250 - 125, this.y + Math.random() * 70 - 35, 'bullet', 50, 30, false);          
        }, this);
      }
      this.game.time.events.add(200, function() {
        this.kill();
        this.pendingDestroy = true;
      }, this);
      this.destroyed = true;
    }
  }, null, this);
};

EnemyPlane.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);
  if (damage > 200) {
    this.kill();
    return;
  }
  if (this.health <= damage && !this.dead) {
    this.body.gravity.y = 200;
    this.body.angularAcceleration = this.body.velocity.x > 0 ? 10 : -10;
    this.smoke();
  }
  else {
    this.damage(damage);
  }
};

EnemyPlane.prototype.smoke = function() {
  this.impact = new Impact(this.game, this.state, this.getChildAt(0).world.x, this.getChildAt(0).world.y, 'impact', this.game.math.degToRad(90), [0xffffff, 0xfff281, 0x999999], 300, 3);
  front_fx.add(this.impact);

  this.game.time.events.add(2, function() {
    if (this.alive) {
      this.smoke();
    }
  }, this);
};









ProtoEnemy = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y, sprite);
  game.add.existing(this);
  this.state = state;
  this.material = 'metal';
  this.impact_tint = [0x92705E, 0xC99689, 0x444B25];
  this.autoCull = true;
  this.anchor.set(0.5);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
//  this.body.gravity.y = 400;
  enemy_group.add(this);
//when dead
  this.events.onKilled.add(function(){
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    this.pendingDestroy = true;
  }, this);
};

ProtoEnemy.prototype = Object.create(Phaser.Sprite.prototype);
ProtoEnemy.prototype.constructor = ProtoEnemy;

ProtoEnemy.prototype.update = function() {
//indicator
  this.game.physics.arcade.collide(this, floor);
};

ProtoEnemy.prototype.receiveDamage = function(damage) {
  tweenDamage(this.game, this.state, this);
//  this.damage(damage);
};