Boss = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);
  enemy_group.add(this);
//animations
  this.animations.add('right', [4, 3, 5, 3], 10, false);
  this.animations.add('left', [7, 8, 6, 8], 10, false);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.drag.x = 700;
  this.body.maxVelocity.x = 300;
  this.body.gravity.y = 400;
//healthbar
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(0).beginFill(0xff0000);
  this.getChildAt(0).drawRoundedRect(-50, -100, 100, 16, 10);
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(1).beginFill(0x000000, 0);
  this.getChildAt(1).lineStyle(5, 0x000000, 1);
  this.getChildAt(1).drawRoundedRect(-50, -100, 100, 16, 10);
  this.maxHealth = 3000;
  this.health = 3000;
//when dead
  this.events.onKilled.add(function(){
    for (i = 1; i <= 50; i++) {
      new Money(this.game, this.state, this.x, this.y, 'small_fish');
    }
    pendingDestroy = true;
  }, this);
//attack
  this.switchAttacks();
};

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.switchAttacks = function() {
  if (!this.alive) {
    return;
  }
  if (Math.random() > 0.4){
    this.game.time.events.repeat(1000, 4, this.move, this);
    this.game.time.events.add(7000, this.switchAttacks, this);
  }
  else {
    this.shootMissile();
    this.game.time.events.add(7000, this.switchAttacks, this);
  }
};

Boss.prototype.move = function() {
  if (!this.alive) {
    return;
  }
  this.body.velocity.x = 300;
  this.animations.play('right');
};

Boss.prototype.shootMissile = function() {
  if (!this.alive) {
    return;
  }
  new HomingMissile(this.game, this.state, this.x, this.y, 'small_fish');
};

Boss.prototype.update = function() {
  if (!this.alive){
    return;
  }
  this.game.physics.arcade.collide(this, terrain_group);
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    b.pendingDestroy = true;
    a.receiveDamage(b.power);
  }, null, this);
};

Boss.prototype.receiveDamage = function(damage) {
  this.damage(damage);
  this.getChildAt(0).clear();
  this.getChildAt(0).drawRoundedRect(-50, -100, 100 * this.health / this.maxHealth, 16, 10);
};



Enemy = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y);
  game.add.existing(this);
  this.state = state;
  this.autoCull = true;
  this.anchor.set(0.5);
//skin
  this.addChild(this.game.make.sprite(0, 0, sprite));
  this.getChildAt(0).anchor.set(0.5);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(40, 40, 0, 0);
  this.game.physics.enable(this.getChildAt(0), Phaser.Physics.ARCADE);
  this.body.drag.x = 1000;
  this.body.maxVelocity.x = 300;
  this.body.gravity.y = 400;
  this.body.bounce.y = 1;
  if (Math.random() > 0.5) {
    this.x = -1480;
    this.direction = 1;
    this.getChildAt(0).body.angularVelocity = 500;
  }
  else {
    this.x = 1480;
    this.direction =- 2;
    this.getChildAt(0).body.angularVelocity = -500;
  }
  enemy_group.add(this);
//healthbar
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(1).beginFill(0xff0000);
  this.getChildAt(1).drawRoundedRect(-25, -50, 50, 8, 5);
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(2).beginFill(0x000000, 0);
  this.getChildAt(2).lineStyle(2.5, 0x000000, 1);
  this.getChildAt(2).drawRoundedRect(-25, -50, 50, 8, 5);
  this.maxHealth = 100;
  this.health = 100;
//add indicator
  this.indicator = this.game.add.graphics(0,0);
  this.indicator.beginFill(0xCC0000);
  this.indicator.drawPolygon(-25, 0, 0, 15, 0, -15);
//when dead
  this.events.onKilled.add(function(){
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    for (i = 1; i <= 10; i++) {
//      new Money(this.game, this.state, this.x, this.y, 'small_fish');
    }
    money += 50;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    this.pendingDestroy = true;
  }, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
  if (!this.alive) {
    return;
  }
//indicator
  if (this.x > this.game.camera.x + this.game.width){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//behavoiur
  this.body.velocity.x = this.direction * 70;
  this.game.physics.arcade.collide(this, terrain_group);
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
      new Howl({
        urls: ['assets/audio/metal_' + Math.ceil(Math.random() * 15) + '.wav'],
        volume: 0.05,
        pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
      }).play();
    b.pendingDestroy = true;
    a.receiveDamage(b.power);
  }, null, this);
  if (this.x > -250 && this.x < 250){
    structure_health -= 10;
    updateHealthBar();
    this.kill();
  }
};

Enemy.prototype.receiveDamage = function(damage) {
  if (!this.alive) {
    return;
  }
  this.getChildAt(1).clear();
  this.getChildAt(1).drawRoundedRect(-25, -50, 50 * (this.health - damage) / this.maxHealth, 8, 5);
  this.damage(damage);
};



Enemy_1 = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.autoCull = true;
  this.anchor.set(0.5);
  this.scale.set(0.5);
  enemy_group.add(this);
//animations
  this.animations.add('right', [4, 3, 5, 3], 10, false);
  this.animations.add('left', [7, 8, 6, 8], 10, false);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.drag.x = 700;
  this.body.maxVelocity.x = 300;
  this.body.gravity.y = 400;
//healthbar
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(0).beginFill(0xff0000);
  this.getChildAt(0).drawRoundedRect(-50, -100, 100, 16, 10);
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(1).beginFill(0x000000, 0);
  this.getChildAt(1).lineStyle(5, 0x000000, 1);
  this.getChildAt(1).drawRoundedRect(-50, -100, 100, 16, 10);
  this.maxHealth = 150;
  this.health = 150;
//spawn
  if (Math.random() > 0.5) {
    this.x = -1480;
  }
  else {
    this.x = 1480;
  }
  this.shooting = false;
  this.throwing = false;
//when dead
  this.events.onKilled.add(function(){
    for (i = 1; i <= 10; i++) {
//      new Money(this.game, this.state, this.x, this.y, 'small_fish');
    }
    money += 50;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    pendingDestroy = true;
  }, this);
//attack
//  this.throwGrenade();
};

Enemy_1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_1.prototype.constructor = Enemy_1;

Enemy_1.prototype.move = function() {
  if (!this.alive) {
    return;
  }
  if (this.x > -550 && this.x < 450) {
    this.body.velocity.x = 0;
  }
  else if (this.x < -550){
    this.body.velocity.x = 100;    
  this.animations.play('right');
  }
  else if (this.x > 450){
    this.body.velocity.x = -100;
  this.animations.play('left');
  }
};

Enemy_1.prototype.shoot = function() {
  if (!this.alive) {
    return;
  }
  this.shooting = true;
  this.game.time.events.repeat(150, 3, function() {
    if (!this.alive) {
      return;
    }
    new Howl({
      urls: ['assets/audio/mp5_shot.ogg'],
      volume: 0.05,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, -0.5],
    }).play();
    new Bullet (this.game, this.state, this.x, this.y, 'bullet', playa.x, playa.y, 300, 10, true, 0);
  }, this);
  this.game.time.events.add(1500, function() {
    this.shooting = false;
  }, this);
  
};

Enemy_1.prototype.throwGrenade = function() {
  if (!this.alive) {
    return;
  }
  new HomingMissile(this.game, this.state, this.x, this.y, 'small_fish');
};

Enemy_1.prototype.update = function() {
  if (!this.alive){
    return;
  }
//behaviour
  if (!this.shooting && !this.throwing) {  
    this.move();
    if (this.game.math.distance(this.x, this.y, playa.x, playa.y) < 500) {
      this.shoot();
    }
  }
  this.game.physics.arcade.collide(this, terrain_group);
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    if (b.enemy === false) {
      b.pendingDestroy = true;
      a.receiveDamage(b.power);
    }
  }, null, this);
};

Enemy_1.prototype.receiveDamage = function(damage) {
  this.damage(damage);
  this.getChildAt(0).clear();
  this.getChildAt(0).drawRoundedRect(-50, -100, 100 * this.health / this.maxHealth, 16, 10);
};



Enemy_2 = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);
  this.autoCull = true;
  this.scale.set(0.5);
  enemy_group.add(this);
//animations
  this.animations.add('right', [4, 3, 5, 3], 10, false);
  this.animations.add('left', [7, 8, 6, 8], 10, false);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.drag.x = 500;
  this.body.drag.y = 30;
  this.body.maxVelocity.x = 200;
  this.body.maxVelocity.y = 50;
  this.body.gravity.y = 50;
//healthbar
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(0).beginFill(0xff0000);
  this.getChildAt(0).drawRoundedRect(-50, -100, 100, 16, 10);
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(1).beginFill(0x000000, 0);
  this.getChildAt(1).lineStyle(5, 0x000000, 1);
  this.getChildAt(1).drawRoundedRect(-50, -100, 100, 16, 10);
  this.maxHealth = 150;
  this.health = 150;
//add indicator
  this.indicator = this.game.add.graphics(0,0);
  this.indicator.beginFill(0xCC0000);
  this.indicator.drawPolygon(-25, 0, 0, 15, 0, -15);
//spawn
  if (Math.random() > 0.5) {
    this.x = -1480;
    this.target_position_x = -700 + Math.random() * 200;
    this.target_position_y = 200 + Math.random() * 300;
  }
  else {
    this.x = 1480;
    this.target_position_x = 430 + Math.random() * 200;
    this.target_position_y = 200 + Math.random() * 300;
  }
   this.y = 100 + Math.random() * 500;
  this.shooting = false;
  this.throwing = false;
//when dead
  this.events.onKilled.add(function(){
    for (i = 1; i <= 10; i++) {
//      new Money(this.game, this.state, this.x, this.y, 'small_fish');
    }
    money += 50;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    this.pendingDestroy = true;
  }, this);
//attack
//  this.throwGrenade();
};

Enemy_2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_2.prototype.constructor = Enemy_2;

Enemy_2.prototype.shoot = function() {
  if (!this.alive) {
    return;
  }
  this.shooting = true;
  this.game.time.events.repeat(150, 1, function() {
    if (!this.alive) {
      return;
    }
    new Howl({
      urls: ['assets/audio/mp5_shot.ogg'],
      volume: 0.05,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, -0.5],
    }).play();
    new Bullet (this.game, this.state, this.x, this.y, 'bullet', playa.x, playa.y, 400, 10, true, 0);
  }, this);
  this.game.time.events.add(1500, function() {
    this.shooting = false;
  }, this);
  
};

Enemy_2.prototype.throwGrenade = function() {
  if (!this.alive) {
    return;
  }
  new HomingMissile(this.game, this.state, this.x, this.y, 'small_fish');
};

Enemy_2.prototype.update = function() {
  if (!this.alive){
    return;
  }
  //indicator
  if (this.x > this.game.camera.x + this.game.width){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//behaviour
  if (!this.shooting && !this.throwing && this.game.math.distance(this.x, this.y, playa.x, playa.y) < 500) {  
    this.shoot();
  }
//flying
  if(this.y > this.target_position_y) {
    this.body.velocity.y += 10 * (Math.sin(Math.atan2(this.target_position_y - this.y, this.target_position_x - this.x )));
  }
  this.body.velocity.x += 10 * (Math.cos(Math.atan2(this.target_position_y - this.target_position_y, this.target_position_x - this.x )));

  this.game.physics.arcade.collide(this, terrain_group);
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    if (b.enemy === false) {
      b.pendingDestroy = true;
      a.receiveDamage(b.power);
    }
  }, null, this);

};

Enemy_2.prototype.receiveDamage = function(damage) {
  this.damage(damage);
  this.getChildAt(0).clear();
  this.getChildAt(0).drawRoundedRect(-50, -100, 100 * this.health / this.maxHealth, 16, 10);
};



Flying_enemy = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.autoCull = true;
  this.anchor.set(0.5);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  if (Math.random() > 0.5) {
    this.x = -1480;
    this.direction = 1;
  }
  else {
    this.x = 1480;
    this.direction =- 1;
  }
  enemy_group.add(this);
//healthbar
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(0).beginFill(0xff0000);
  this.getChildAt(0).drawRoundedRect(-50, -50, 100, 8, 10);
  this.addChild(this.game.make.graphics(0, 0));
  this.getChildAt(1).beginFill(0x000000, 0);
  this.getChildAt(1).lineStyle(2.5, 0x000000, 1);
  this.getChildAt(1).drawRoundedRect(-50, -50, 100, 8, 10);
  this.maxHealth = 50;
  this.health = 50;
//add indicator
  this.indicator = this.game.add.graphics(0,0);
  this.indicator.beginFill(0xCC0000);
  this.indicator.drawPolygon(-25, 0, 0, 15, 0, -15);
//add bomb
  new Flying_enemy_bomb (this.game, this.state, 0, 0, 'small_fish', this);

//when dead
  this.events.onKilled.add(function(){
    for (i = 1; i <= 10; i++) {
//      new Money(this.game, this.state, this.x, this.y, 'small_fish');
    }
    money += 50;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    this.pendingDestroy = true;
  }, this);
};

Flying_enemy.prototype = Object.create(Phaser.Sprite.prototype);
Flying_enemy.prototype.constructor = Flying_enemy;

Flying_enemy.prototype.update = function() {
  if (!this.alive) {
    return;
  }
  //indicator
  if (this.x > this.game.camera.x + this.game.width){
    this.indicator.x = this.game.camera.x + this.game.width - 40;
    this.indicator.scale.set(Math.min((this.x - this.game.camera.x - 1040) * 0.001 - 1, -0.5));
    this.indicator.alpha = 1;
  }
  else if (this.x < this.game.camera.x){
    this.indicator.x = this.game.camera.x + 40;
    this.indicator.scale.set(Math.max((this.x - this.game.camera.x) * 0.001 + 1, 0.5));
    this.indicator.alpha = 1;
  }
  else {
    this.indicator.alpha = 0;
  }
  this.indicator.y = this.y;
//behabiour
  this.body.velocity.x = this.direction * 150;
  this.game.physics.arcade.collide(this, terrain_group);
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
      new Howl({
        urls: ['assets/audio/metal_' + Math.ceil(Math.random() * 15) + '.wav'],
        volume: 0.05,
        pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
      }).play();
    b.destroy();
    a.receiveDamage(b.power);
  }, null, this);
};

Flying_enemy.prototype.receiveDamage = function(damage) {
  if (!this.alive) {
    return;
  }
  this.getChildAt(0).clear();
  this.getChildAt(0).drawRoundedRect(-50, -50, 100 * (this.health - damage) / this.maxHealth, 8, 10);
  this.damage(damage);
};

Flying_enemy_bomb = function (game, state, x, y, sprite, parent) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);
  this.scale.set(2);
  this.angle = 90;
  this.ship = parent;
  this.activated = false;
  console.log(this.ship.x);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  enemy_group.add(this);
//health
  this.maxHealth = 30;
  this.health = 30;
//when dead
  this.events.onKilled.add(function(){
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    this.pendingDestroy = true;
  }, this);
};

Flying_enemy_bomb.prototype = Object.create(Phaser.Sprite.prototype);
Flying_enemy_bomb.prototype.constructor = Flying_enemy_bomb;

Flying_enemy_bomb.prototype.update = function() {
  if (!this.alive) {
    return;
  }
  if (this.ship.alive && !this.activated) {
    this.x = this.ship.x;
    this.y = this.ship.y + 25;
  }
  else if (!this.activated) {
    this.body.gravity.y = 300;
    this.activated = true;
  }
  if (this.x > 0 && this.x < 10 && !this.activated) {
    this.body.gravity.y = 300;
    this.activated = true
  }
  this.game.physics.arcade.collide(this, terrain_group, function() {
    if(this.x > -450 && this.x < 350){
      structure_health -= 10;
      updateHealthBar();
    }
    this.kill();
  }, null, this);
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    if (this.activated) {
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

Flying_enemy_bomb.prototype.receiveDamage = function(damage) {
  if (!this.alive) {
    return;
  }
  this.damage(damage);
};