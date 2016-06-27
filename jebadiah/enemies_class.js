Enemy = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y);
  game.add.existing(this);
  this.state = state;
  this.material = 'tarmac';
  this.impact_tint = [0x92705E, 0xC99689, 0x444B25];
  this.autoCull = true;
  this.anchor.set(0.5);
//skin
  this.addChild(this.game.make.sprite(0, 0, sprite));
  this.getChildAt(0).anchor.set(0.5);
//physics
  this.y = 500 + Math.random() * 70;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(40, 40, 0, 0);
  this.body.gravity.y = 400;
  this.body.bounce.y = 1;
  if (Math.random() > 0.5) {
    this.x = this.game.world.bounds.x - 40;
    this.body.velocity.x = 90;
    this.direction = 1;
 }
  else {
    this.x = this.game.world.bounds.x + this.game.world.bounds.width + 40;;
    this.body.velocity.x = -90;
    this.direction =- 1;
  }
  enemy_group.add(this);
//healthbar
  this.addChild(this.game.make.image(-25, -50, 'healthbar')).scale.x = 0.5;
  this.addChild(this.game.make.image(-25, -50, 'healthbar_back')).scale.x = 0.5;
  this.maxHealth = 40 + WAVE * 10;
  this.health = 40 + WAVE * 10;
//add indicator
  this.indicator = this.game.add.image(0, 0, 'indicator');
//when dead
  this.events.onKilled.add(function(){
    Shake (this.game, this.state, 15, 10, 1);
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
//    for (i = 1; i <= 10; i++) {
//      new Money(this.game, this.state, this.x, this.y, 'small_fish');
//    }
    money += 50;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    this.pendingDestroy = true;
  }, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
//rotate
  this.getChildAt(0).angle += this.direction * 5;
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
  tweenDamage(this.game, this.state, this.getChildAt(0));
  this.damage(damage);
  this.getChildAt(1).scale.x = this.health / this.maxHealth * 0.5;
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
  this.addChild(this.game.make.image(-25, -50, 'healthbar')).scale.x = 0.5;
  this.addChild(this.game.make.image(-25, -50, 'healthbar_back')).scale.x = 0.5;
  this.maxHealth = 85 + WAVE * 15;
  this.health = 85 + WAVE * 15;
  this.dead = false;
//add indicator
  this.indicator = this.game.add.image(0, 0, 'indicator');
//spawn
  if (Math.random() > 0.5) {
    this.x = this.game.world.bounds.x - 40;
    this.target_position_x = -700 + Math.random() * 400;
    this.target_position_y = 270 + Math.random() * 100;
  }
  else {
    this.x = this.game.world.bounds.x + this.game.world.bounds.width + 40;
    this.target_position_x = 430 + Math.random() * 400;
    this.target_position_y = 270 + Math.random() * 100;
  }
   this.y = 100 + Math.random() * 500;
  this.shooting = false;
  this.throwing = false;
//when dead
  this.events.onKilled.add(function(){
    money += 75;
    playa.hud_money.text = '$$$: ' + money;
    this.indicator.destroy();
    Shake (this.game, this.state, 15, 20, 1);
    new Explosion(this.game, this.state, this.x, this.y, 'bullet', 50, 30, false);
    this.pendingDestroy = true;
  }, this);
//attack
//  this.throwGrenade();
};

Enemy_2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_2.prototype.constructor = Enemy_2;

Enemy_2.prototype.shoot = function() {
  if (this.dead) {
    return;
  }
  this.shooting = true;
  this.game.time.events.repeat(150, 1, function() {
    new Howl({
      urls: ['assets/audio/mp5_shot.ogg'],
      volume: 0.05,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, -0.5],
    }).play();
    new Bullet (this.game, this.state, this.x, this.y, 'bullet', playa.x, playa.y, 400, 10, true, 0).scale.set(1.5);
  }, this);
  this.game.time.events.add(1500, function() {
    this.shooting = false;
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
  if (!this.shooting && this.game.math.distance(this.x, this.y, playa.x, playa.y) < 500) {  
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
  if (this.health <= damage && !this.dead) {
    this.dead = true;
    this.health = 70;
    this.body.angularAcceleration = -50;
    this.body.gravity.y = 250;
    this.body.maxVelocity.y = 1000;
    this.body.gravity.x = -30;
    this.body.drag.x = 0;
    this.body.drag.y = 0;
    this.getChildAt(0).kill();
    this.getChildAt(1).kill();
  }
  else {
    this.damage(damage);
    this.getChildAt(0).scale.x = this.health / this.maxHealth * 0.5;    
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
}