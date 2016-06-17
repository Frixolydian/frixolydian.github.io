Player = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , 'jebadiah_left');
  game.add.existing(this);
  this.state = state;
  this.can_shoot = true;
  MP5 = {sprite: 'mp5', max_bullets: 50, shots: 1, bullet_speed: 1200, shooting_speed: 75, reload_time: 1200, deviation: 3, damage: 30};
  shotgun = {sprite: 'mp5', max_bullets: 8, shots: 5, bullet_speed: 1200, shooting_speed: 600, reload_time: 1200, deviation: 2, damage: 20};

  this.current_weapon = MP5;
  this.bullets = this.current_weapon.max_bullets;
  this.reloading = false;
//fire trajectory
  this.addChild(this.game.make.sprite(0, 0, 'trajectory'));
  this.getChildAt(0).pivot.set(2, 2);
  this.getChildAt(0).angle = 180;
//gun
  this.addChild(this.game.make.sprite(0, -3, 'mp5'));
  this.getChildAt(1).pivot.set(32, 2);
//legs
  this.addChild(this.game.make.sprite(-20, -34, 'legs_left'));
  this.getChildAt(2).animations.add('run', [1, 2, 3, 4], 12, true);
  this.getChildAt(2).animations.add('stand', [0], 10, false);
  this.getChildAt(2).animations.play('run');


//buttons
  this.left_button = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.right_button = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.up_button = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.down_button = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  this.space_button = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reload_button = this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(this.reload, this);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.anchor.set(0.5);
  this.body.drag.x = 1000;
  this.body.maxVelocity.x = 300;
  this.body.gravity.y = 400;
//hud
  this.hud_bullets = this.game.add.bitmapText(500, 70, 'font', 'Bullets: ' + this.bullets + '/' + this.current_weapon.max_bullets);
  this.hud_bullets.fixedToCamera = true;
  this.hud_money = this.game.add.bitmapText(100, 70, 'font', '$$$: ' + money);
  this.hud_money.fixedToCamera = true;
//death
  this.events.onKilled.add(function() {
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
  if (this.getChildAt(2).key !== 'legs_left'){
    this.getChildAt(2).loadTexture('legs_left');
  }
  this.getChildAt(2).animations.play('run');
};

Player.prototype.runRight = function() {
  this.body.velocity.x += 40;
  if (this.getChildAt(2).key !== 'legs_right'){
    this.getChildAt(2).loadTexture('legs_right');
  }
  this.getChildAt(2).animations.play('run');
};

Player.prototype.shoot = function() {
  if (MOBILE) {
    for (i = 1; i <= this.current_weapon.shots; i++) {
      new Bullet (this.game, this.state, this.x, this.y, 'bullet', this.x + Math.cos(this.game.math.degToRad(this.state.states.Kusoge.joystick.properties.angle)), this.y + Math.sin(this.game.math.degToRad(this.state.states.Kusoge.joystick.properties.angle)), 1000, this.current_weapon.damage, false, this.current_weapon.deviation);
    }
  }
  else {
    for (i = 1; i<= this.current_weapon.shots; i++) {
      new Bullet (this.game, this.state, this.x, this.y, 'bullet', this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 1000, this.current_weapon.damage, false, this.current_weapon.deviation);
    }
  }
  new Howl({
    urls: ['assets/audio/mp5_shot.ogg'],
    volume: 0.1
 }).play();
  this.can_shoot = false;
  this.game.time.events.add(this.current_weapon.shooting_speed, function(){
    this.can_shoot = true;
  }, this);
  this.bullets -= 1;
  this.hud_bullets.text = 'Bullets: ' + this.bullets + '/' + this.current_weapon.max_bullets;
};

Player.prototype.pointWeapon = function(pointingLeft, joystickAngle) {
  if (pointingLeft){
    if (this.key !== 'jebadiah_right'){
      this.loadTexture('jebadiah_right');
    }
    this.getChildAt(1).scale.set(-1, 1);
    this.getChildAt(1).angle = MOBILE ? joystickAngle : this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY));
    this.getChildAt(0).angle = this.getChildAt(1).angle;
  }
  else{
    if (this.key !== 'jebadiah_left'){
      this.loadTexture('jebadiah_left');
    }
    this.getChildAt(1).scale.set(1);
    this.getChildAt(1).angle = MOBILE ? joystickAngle + 180 : this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY)) + 180;
    this.getChildAt(0).angle = this.getChildAt(1).angle + 180;
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
    if (MOBILE) {
      if ((this.up_button.isDown || this.space_button.isDown || (gamepad_jump.input.pointerOver() && gamepad_jump.pressed && MOBILE)) && this.body.touching.down) {
        this.body.velocity.y = -300;
      }
    }
    else {
      if ((this.up_button.isDown || this.space_button.isDown) && this.body.touching.down) {
        this.body.velocity.y = -300;
      }
    }
  }, null, this);
//on air
  if (!this.body.touching.down && this.getChildAt(2).frame !== 2) {
    this.getChildAt(2).frame = 2;
  }
//die
  this.game.physics.arcade.overlap(this, bullet_group, function(a, b) {
    if (b.enemy){
      this.kill();
    }
  }, null, this);
  this.game.physics.arcade.overlap(this, enemy_group, function(a, b) {
    this.kill();
  }, null, this);

//movement keys
  if (this.right_button.isDown) {
    this.runRight();
  }
  if (this.left_button.isDown) {
    this.runLeft();
  }
  if (MOBILE) {
    if (!this.left_button.isDown && !this.right_button.isDown && this.body.touching.down && !gamepad_right.input.pointerOver() && !gamepad_left.input.pointerOver()) {
      this.getChildAt(2).animations.play('stand');
    }
  }
  else {
    if (!this.left_button.isDown && !this.right_button.isDown && this.body.touching.down) {
      this.getChildAt(2).animations.play('stand');
    }
  }
  //shooting
  if (MOBILE){
    if (this.state.states.Kusoge.joystick.properties.distance > 80 && this.can_shoot && this.reloading === false) {
      if (this.bullets === 0) {
        this.reload();
      }
      else {
        this.shoot();
      }
    }
  }
  else if (this.game.input.activePointer.isDown && this.can_shoot && this.reloading === false) {
    if (this.bullets === 0){
      this.reload();
    }
    else {
      this.shoot();
    }
  }
};