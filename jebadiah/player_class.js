Player = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , 'jebadiah');
  game.add.existing(this);
  this.state = state;
  this.can_shoot = true;

  this.current_weapon = current_weapon;
  this.bullets = this.current_weapon.max_bullets;
  this.reloading = false;
//fire trajectory
  this.addChild(this.game.make.sprite(4, -4, 'trajectory'));
  this.getChildAt(0).anchor.y = 0.5;
  this.getChildAt(0).pivot.x = -35;
  this.getChildAt(0).angle = 180;
//legs
  this.addChild(this.game.make.sprite(-20, -34, 'legs_left'));
  this.getChildAt(1).animations.add('run', [1, 2, 3, 4], 12, true);
  this.getChildAt(1).animations.add('stand', [0], 10, false);
  this.getChildAt(1).animations.play('run');
//gun
  this.addChild(this.game.make.sprite(4, -3, this.current_weapon.sprite));
  this.getChildAt(2).pivot.set(34, 5);

//buttons
  this.left_button = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.right_button = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.up_button = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.down_button = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  this.space_button = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reload_button = this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(this.reload, this);
  this.change_weapon_1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(this.weapon_1, this);
  this.change_weapon_2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(this.weapon_2, this);
  this.change_weapon_3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE).onDown.add(this.weapon_3, this);
  this.change_weapon_4 = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR).onDown.add(this.weapon_4, this);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.collideWorldBounds = true;
  this.anchor.set(0.5);
  this.body.setSize(22, 63, 9, 5)
  this.body.drag.x = 1000;
  this.body.maxVelocity.x = 350;
  this.body.gravity.y = 700;
//hud
  this.hud_bullets = this.game.add.bitmapText(500, 70, 'font', 'Bullets: ' + this.bullets + '/' + this.current_weapon.max_bullets, 18);
  this.hud_bullets.fixedToCamera = true;
  this.hud_money = this.game.add.bitmapText(100, 70, 'font', '$$$: ' + money, 18);
  this.hud_money.fixedToCamera = true;
//death
  this.events.onKilled.add(function() {
      Shake (this.game, this.state, 15, 30, 1);
      this.game.time.events.add(3000, function(){
        this.reset(0, 570);
      }, this);
  }, this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.reload = function() {
//manual reloading
  if (this.current_weapon.max_bullets !== this.bullets && this.reloading === false){
    this.reloading = true;
    mp5_reload.play();
    this.game.time.events.add(this.current_weapon.reload_time, function(){
      this.bullets = this.current_weapon.max_bullets;
      this.reloading = false;
    this.hud_bullets.text = 'Bullets: ' + this.bullets + '/' + this.current_weapon.max_bullets;
    }, this);
  }
};

Player.prototype.runLeft = function() {
  this.body.velocity.x -= 40;
  if (this.getChildAt(1).key !== 'legs_left'){
    this.getChildAt(1).loadTexture('legs_left');
  }
  this.getChildAt(1).animations.play('run');
};

Player.prototype.runRight = function() {
  this.body.velocity.x += 40;
  if (this.getChildAt(1).key !== 'legs_right'){
    this.getChildAt(1).loadTexture('legs_right');
  }
  this.getChildAt(1).animations.play('run');
};

Player.prototype.shoot = function() {
  if (MOBILE) {
    for (i = 1; i <= this.current_weapon.shots; i++) {
      if (this.current_weapon.bullet === 'bullet') {
        new Bullet (this.game, this.state, this.getChildAt(0).world.x, this.getChildAt(0).world.y, 'bullet', this.getChildAt(0).world.x + Math.cos(this.game.math.degToRad(this.state.states.Kusoge.joystick.properties.angle)), this.getChildAt(0).world.y + Math.sin(this.game.math.degToRad(this.state.states.Kusoge.joystick.properties.angle)), this.current_weapon.bullet_speed, this.current_weapon.damage, false, this.current_weapon.deviation);
      }
      else if (this.current_weapon.bullet === 'rocket') {
        new Rocket (this.game, this.state, this.getChildAt(0).world.x, this.getChildAt(0).world.y, 'rocket', this.getChildAt(0).world.x + Math.cos(this.game.math.degToRad(this.state.states.Kusoge.joystick.properties.angle)), this.getChildAt(0).world.y + Math.sin(this.game.math.degToRad(this.state.states.Kusoge.joystick.properties.angle)), this.current_weapon.bullet_speed, this.current_weapon.damage, false, this.current_weapon.deviation);
        console.log (000);
      }
    }
  }
  else {
    for (i = 1; i<= this.current_weapon.shots; i++) {
      if (this.current_weapon.bullet === 'bullet') {
        new Bullet (this.game, this.state, this.getChildAt(0).world.x, this.getChildAt(0).world.y, 'bullet', this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, this.current_weapon.bullet_speed, this.current_weapon.damage, false, this.current_weapon.deviation);
      }
      else if (this.current_weapon.bullet === 'rocket') {
        new Rocket (this.game, this.state, this.getChildAt(0).world.x, this.getChildAt(0).world.y, 'rocket', this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, this.current_weapon.bullet_speed, this.current_weapon.damage, false, this.current_weapon.deviation);
      }
    }
  }
  this.body.velocity.x -= Math.cos(Math.atan2(this.getChildAt(0).world.y - this.y, this.getChildAt(0).world.x - this.x )) * current_weapon.recoil * 70;
  this.body.velocity.y -= Math.sin(Math.atan2(this.getChildAt(0).world.y - this.y, this.getChildAt(0).world.x - this.x )) * current_weapon.recoil * 3;
  Shake (this.game, this.state, current_weapon.shake_time, current_weapon.shake_intensity, 1);
  new Howl({
    urls: ['assets/audio/' + current_weapon.sprite + '_shot.ogg'],
    volume: 0.6
 }).play();
  this.can_shoot = false;
  this.game.time.events.add(this.current_weapon.shooting_speed, function(){
    this.can_shoot = true;
  }, this);
  this.bullets -= 1;
  this.hud_bullets.text = 'Bullets: ' + this.bullets + '/' + this.current_weapon.max_bullets;
};

Player.prototype.weapon_1 = function() {
  if (PISTOL_SHOP.bought){
    current_weapon = pistol;
    this.current_weapon = current_weapon;
    this.bullets = 0;
    this.getChildAt(2).loadTexture(this.current_weapon.sprite);
  }
};

Player.prototype.weapon_2 = function() {
  if (SHOTGUN_SHOP.bought){
    current_weapon = shotgun;
    this.current_weapon = current_weapon;
    this.bullets = 0;
    this.getChildAt(2).loadTexture(this.current_weapon.sprite);
  }
};

Player.prototype.weapon_3 = function() {
  if (MP5_SHOP.bought){
    current_weapon = mp5;
    this.current_weapon = current_weapon;
    this.bullets = 0;
    this.getChildAt(2).loadTexture(this.current_weapon.sprite);
  }
};

Player.prototype.weapon_4 = function() {
  if (ROCKET_LAUNCHER_SHOP.bought){
    current_weapon = rocket_launcher;
    this.current_weapon = current_weapon;
    this.bullets = 0;
    this.getChildAt(2).loadTexture(this.current_weapon.sprite);
  }
};

Player.prototype.pointWeapon = function(pointingLeft, joystickAngle) {
  if (pointingLeft && !SHOP_OPEN){
    if (this.frame !== 0){
      this.frame = 0;
      this.getChildAt(0).x = -4;
      this.getChildAt(2).x = -4;
    }
    this.getChildAt(2).scale.set(-1, 1);
    this.getChildAt(2).angle = MOBILE ? joystickAngle : this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY));
    this.getChildAt(0).angle = this.getChildAt(2).angle;
  }
  else if (!SHOP_OPEN) {
    if (this.frame !== 1){
      this.frame = 1;
      this.getChildAt(0).x = 4;
      this.getChildAt(2).x = 4;
    }
    this.getChildAt(2).scale.set(1);
    this.getChildAt(2).angle = MOBILE ? joystickAngle + 180 : this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY)) + 180;
    this.getChildAt(0).angle = this.getChildAt(2).angle + 180;
  }
};

Player.prototype.update = function() {
  if(!this.alive){
    return;
  }
//weapon angle and flip player
  if (!MOBILE) {
    this.pointWeapon(this.x < this.game.input.activePointer.worldX);
  }
  else if (this.state.states.Kusoge.joystick.properties.distance !==0) {
    this.pointWeapon(this.state.states.Kusoge.joystick.properties.angle > -90 && this.state.states.Kusoge.joystick.properties.angle < 90, this.state.states.Kusoge.joystick.properties.angle);
  }
//pit
  this.game.physics.arcade.collide(this, floor, function() {
    this.kill();
  }, null, this);
//collision
  this.game.physics.arcade.collide(this, terrain_group, function(a, b) {
    if (!SHOP_OPEN) {
      if (MOBILE) {
        if ((this.up_button.isDown || this.space_button.isDown || (gamepad_jump.input.pointerOver() && gamepad_jump.pressed && MOBILE)) && this.body.touching.down) {
          this.body.velocity.y = -400;
        }
      }
      else {
        if ((this.up_button.isDown || this.space_button.isDown) && this.body.touching.down) {
          this.body.velocity.y = -400;
        }
      }
    }
  }, null, this);
//on air
  if (!this.body.touching.down && this.getChildAt(2).frame !== 2) {
    this.getChildAt(1).frame = 2;
  }
//die
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    if (b.enemy){
//      this.kill();
    }
  }, null, this);
  this.game.physics.arcade.overlap(this, enemy_group, function(a, b) {
//    this.kill();
  }, null, this);
  if (SHOP_OPEN) {
    this.getChildAt(1).animations.play('stand');
    return;
  }
//movement keys
  if (this.right_button.isDown) {
    this.runRight();
  }
  if (this.left_button.isDown) {
    this.runLeft();
  }
  if (MOBILE) {
    if (!this.left_button.isDown && !this.right_button.isDown && this.body.touching.down && !gamepad_right.input.pointerOver() && !gamepad_left.input.pointerOver()) {
      this.getChildAt(1).animations.play('stand');
    }
  }
  else {
    if (!this.left_button.isDown && !this.right_button.isDown && this.body.touching.down) {
      this.getChildAt(1).animations.play('stand');
    }
  }
  if (this.bullets === 0 && this.can_shoot) {
    this.reload();
  }
  //shooting
  if (MOBILE){
    if (this.state.states.Kusoge.joystick.properties.distance > 80 && this.can_shoot && this.reloading === false && this.bullets !== 0) {
      this.shoot();
    }
  }
  else if (this.game.input.activePointer.isDown && this.can_shoot && this.reloading === false && this.bullets !== 0) {
    this.shoot();
  }
};