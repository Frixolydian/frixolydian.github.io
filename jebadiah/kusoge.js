Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Impact = function (game, state, x, y, sprite, direction, impact_tint) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  bullet_group.add(this);
  this.autoCull = true;
  this.anchor.set(0.5);
  this.scale.set(0.5 + Math.random() * 0.5);
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
  this.game.time.events.add(150, function(){
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
      new Impact(this.game, this.state, this.x, this.y, 'impact', Math.atan2(this.body.velocity.y, this.body.velocity.x), this.impact_tint);
    }
  }, this);
};
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
  if (this.enemy === false && this.x < this.game.camera.x - 150 || this.x > this.game.camera.x + this.game.width + 150) {
    this.pendingDestroy = true;
  }
  this.game.physics.arcade.collide(this, terrain_group, function(a, b) {
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
      a.kill();
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

kusoge = function(game){};

kusoge.prototype = {

  create: function(){
//    MOBILE = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#DDDDDD"; //set the background color
    this.game.world.setBounds(-1500, 120, 3000, 600);
//background
    this.scrolling_background_4 = this.add.tileSprite(this.world.bounds.x, 0, this.world.width, 720, 'back_4');
    this.scrolling_background_4.autoScroll(-10, 0);
    this.scrolling_background_3 = this.add.tileSprite(this.world.bounds.x, 0, this.world.width, 720, 'back_3');
    this.scrolling_background_3.autoScroll(-20, 0);
    this.scrolling_background_2 = this.add.tileSprite(this.world.bounds.x, 0, this.world.width, 720, 'back_2');
    this.scrolling_background_2.autoScroll(-50, 0);
    this.scrolling_background_1 = this.add.tileSprite(this.world.bounds.x, 0, this.world.width, 720, 'back_1');
    this.scrolling_background_1.autoScroll(-500, 0);

    bullet_group = this.add.group();  //create groups
    player_group = this.add.group();
    terrain_group = this.add.group();
    enemy_group = this.add.group();

    playa = new Player(this.game, this.state, 0, 570, 'player');
    player_group.add(playa);

    LEFT_ENEMY_TRAIN = false;
    this.time.events.loop(10000, function() {
      if (!LEFT_ENEMY_TRAIN && WAVE > 20000) {
        if (Math.random() < 0.5){
          new EnemyTrain(this.game, this.state, -1300, 580).body.velocity.x = 170;
        }
        else {
          new EnemyTrain(this.game, this.state, 1300, 580).body.velocity.x = -170; 
        }
        LEFT_ENEMY_TRAIN = true;
      }
    }, this);

    this.time.events.loop(Math.max(5000 - WAVE * 100, 3000), function() {
      i = Math.random();
      if(i > 0.4){
        new Enemy(this.game, this.state, Math.random() *  500, 500, 'enemy_barrel');
      }
      else {
        new Enemy_2(this.game, this.state, 0, 200 + Math.random() *  100, 'enemy_2');
      }
    }, this);

    floor = new Terrain(this, this.state, -1500, 666, 3000, 20, false, 'tarmac', [0x92705E, 0xC99689, 0x444B25]);
//wagon1
    new Terrain(this, this.state, 32, 497, 240, 20, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true; //floorstructure1
    new Terrain(this, this.state, 0, 638, 300, 5, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
    new Terrain(this, this.state, 295, 593, 24, 50, true, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
    new Terrain(this, this.state, -14, 593, 24, 50, true, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
    new Terrain(this, this.state, 315, 593, 4, 50, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
    this.wagon_front = this.add.sprite (154, 580, 'wagon_1');
    this.wagon_front.anchor.set(0.5);
    this.wagon_front.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
    this.wagon_front.animations.play('anim');
//wagon2
    if (true) {
      new Terrain(this, this.state, -272 , 497, 240, 20, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true; //floorstructure1
      new Terrain(this, this.state, -300, 638, 300, 5, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
      new Terrain(this, this.state, -11, 593, 24, 50, true, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
      new Terrain(this, this.state, -316, 593, 24, 50, true, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
      new Terrain(this, this.state, -319, 593, 4, 50, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
      this.wagon_front1 = this.add.sprite (-154, 580, 'wagon_1');
      this.wagon_front1.anchor.set(0.5);
      this.wagon_front1.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
      this.wagon_front1.animations.play('anim');
    }
//wagon3
    if (WAGON_2) {
      new Terrain(this, this.state, 229 , 497, 320, 20, false); //floorstructure1
      new Terrain(this, this.state, 185, 636, 408, 5, false);
      new Terrain(this, this.state, 573, 593, 24, 50, false);  //floorstructure2
      new Terrain(this, this.state, 181, 593, 24, 50, false);
      this.wagon_front2 = this.add.sprite (389, 580, 'wagon_1');
      this.wagon_front2.anchor.set(0.5);
      this.wagon_front2.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
      this.wagon_front2.animations.play('anim');
    }

    if(TURRET_1){
      this.add.image(-250, 479, 'turret_stand').anchor.set(0.5);
      new Turret(this.game, this.state, -250, 464, 'turret', TURRET_1_UPGRADE).angle = 180;
    }
    if(TURRET_2){
      this.add.image(250, 479, 'turret_stand').anchor.set(0.5);
      new Turret(this.game, this.state, 250, 464, 'turret', TURRET_2_UPGRADE);
    }
//structure healthbar
    healthbar_fill = this.add.image(100, 30, 'healthbar');
    healthbar_fill.right = 100;
    healthbar_fill.scale.set(3);
    healthbar_fill.fixedToCamera = true;
    healthbar_outline = this.add.image(100, 30, 'healthbar_back');
    healthbar_outline.scale.set(3);
    healthbar_outline.fixedToCamera = true;
    updateHealthBar(this.game, this.state);

    this.joystick_camera_x = 0;
    this.joystick_camera_y = 0;
//clock
    new Clock(this.game, this.state);
    new WaveIndicator(this.game, this.state, WAVE);
//gamepad
    if (MOBILE) {
      // Add the VirtualGamepad plugin to the game
      this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
      // Add a joystick to the game (only one is allowed right now)
      this.joystick = this.gamepad.addJoystick(600, 400, 1.2, 'gamepad');
      // Add a button to the game (only one is allowed right now)
      this.button = this.gamepad.addButton(400, 420, 1.0);
      gamepad = new Gamepad(this.game, this.state);
    }
    else {
      this.furu = this.add.button(730, 435, 'fullscreen', this.fullscreen, this).fixedToCamera = true;
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
  },

  fullscreen: function() {
    if (this.game.scale.isFullScreen){
      this.game.scale.stopFullScreen();
    }
    else{
    this.game.scale.startFullScreen(false);
    }
  },

  update: function() {
    if (MOBILE && this.joystick.properties.distance !== 0) {
      this.joystick_camera_x = this.joystick.properties.x * 2.5;
      this.joystick_camera_y = this.joystick.properties.y * 2.5 + 150;
    }
    this.camera.x = MOBILE ? camera_offset_x + playa.x - this.game.width * 0.5 + this.joystick_camera_x : camera_offset_x + (playa.x - this.game.width * 0.5) + (this.input.x - this.game.width * 0.5) * 0.66;
    this.camera.y = MOBILE ? camera_offset_y + playa.y - this.game.width * 0.5 + this.joystick_camera_y : camera_offset_y + (playa.y - this.game.height * 0.5) + (this.input.y - this.game.height * 0.5) * 0.66;
  },


  render: function() {
//    enemy_group.forEach(function(item) {
//      this.game.debug.body(item);
//    }, this);
    //this.game.debug.body(playa);
    this.game.debug.text("X: " + this.input.worldX, 32, 32);
    this.game.debug.text("Y: " + this.input.worldY, 32, 64);
    if (MOBILE) {
      this.game.debug.text("FPS: " + this.game.time.fps, 32, 96);  
    }
  }
};

updateHealthBar = function (game, state) {
  this.state = state;
  healthbar_fill.scale.x = structure_health * 0.03;
  if (structure_health <= 0) {
    game.time.events.repeat(200, 20, function() {
      Shake (game, state, 15, 10, 1);
      new Explosion(game, state, Math.random() * 320 - 160, 580 + Math.random() * 170 - 85, 'bullet', 50, 30, false);
    }, this);
    game.time.events.add(4001, function() {
      this.state.states.Kusoge.wagon_front.destroy();
      playa.events.onKilled.add(function(){
        game.time.events.add(1500, function() {
          game.state.start('Boot');
        }, this);
      }, this);
      playa.kill();
    }, this);
  }
};

Gamepad = function (game, state) {
  Phaser.Sprite.call(this, game);
  game.add.existing(this);
  this.state = state;
  gamepad_left = this.game.add.button(30, 380, 'gamepad', null, null, 3, 0, 3);
  gamepad_left.onOverMouseOnly = false;
  gamepad_left.fixedToCamera = true;
  gamepad_left.inputEnabled = true;
  gamepad_left.pressed = false;
  gamepad_left.onInputOver.add(function(){
    gamepad_left.pressed = true;
  }, this);
  gamepad_left.onInputOut.add(function(){
    gamepad_left.pressed = false;
  }, this);
  gamepad_left.onInputDown.add(function(){
    gamepad_left.pressed = true;
  }, this);
  gamepad_left.onInputUp.add(function(){
    gamepad_left.pressed = false;
  }, this);

  gamepad_right = this.game.add.button(160, 380, 'gamepad', null, null, 3, 0, 3);
  gamepad_right.onOverMouseOnly = false;
  gamepad_right.fixedToCamera = true;
  gamepad_right.inputEnabled = true;
  gamepad_right.onInputOver.add(function(){
    gamepad_right.pressed = true;
  }, this);
  gamepad_right.onInputOut.add(function(){
    gamepad_right.pressed = false;
  }, this);
  gamepad_right.onInputDown.add(function(){
    gamepad_right.pressed = true;
  }, this);
  gamepad_right.onInputUp.add(function(){
    gamepad_right.pressed = false;
  }, this);

  gamepad_jump = this.game.add.button(95, 300, 'gamepad', null, null, 3, 0, 3);
  gamepad_jump.onOverMouseOnly = false;
  gamepad_jump.fixedToCamera = true;
  gamepad_jump.inputEnabled = true;
  gamepad_jump.onInputDown.add(function(){
    gamepad_jump.pressed = true;
  }, this);
  gamepad_jump.onInputUp.add(function(){
    gamepad_jump.pressed = false;
  }, this);
  gamepad_jump.onInputOver.add(function(){
    gamepad_jump.pressed = true;
  }, this);
  gamepad_jump.onInputOut.add(function(){
    gamepad_jump.pressed = false;
  }, this);
};
Gamepad.prototype = Object.create(Phaser.Sprite.prototype);
Gamepad.prototype.constructor = Gamepad;

Gamepad.prototype.update = function() {
  if (gamepad_right.input.pointerOver() && gamepad_right.pressed) {
    playa.runRight();
  }
  if (gamepad_left.input.pointerOver() && gamepad_left.pressed) {
    playa.runLeft();
  }
  if (!this.game.input.activePointer.isDown) {
    gamepad_right.pressed = false;
    gamepad_jump.pressed = false;
    gamepad_left.pressed = false;
  }
//  gamepad_left.input.pointerOver = false;
//  gamepad_right.input.pointerOver = false;
};

