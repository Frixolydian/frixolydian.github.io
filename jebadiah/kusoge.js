Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

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

    player_group = this.add.group();
    enemy_group = this.add.group();
    bullet_group = this.add.group();  //create groups
    terrain_group = this.add.group();
    front_enemy_group = this.add.group();
    front_fx = this.add.group();


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

    this.time.events.loop(Math.max(3500 - WAVE * 100, 2000), function() {
      if (!BUYING && TIMER > 10) {
        i = Math.random();
        if(i > 0.7){
          new Enemy(this.game, this.state, Math.random() *  500, 500, 'enemy_barrel');
        }
        else if (i > 0.5) {
          new Enemy_2(this.game, this.state, 0, 200 + Math.random() *  100, 'enemy_2');
        }
        else if (i > 0.2) {
          new EnemyPlane(this.game, this.state, 0, 400);
        }
        else {
          new EnemyHandcar(this.game, this.state, 450, 640);
        }
      }
    }, this);

    floor = new Terrain(this, this.state, -1500, 666, 3000, 20, false, 'tarmac', [0x92705E, 0xC99689, 0x444B25]);
//wagon1
    new Terrain(this, this.state, 32, 497, 240, 20, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true; //floorstructure1
    new Terrain(this, this.state, 0, 638, 300, 20, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
    new Terrain(this, this.state, 295, 593, 24, 50, true, 'none', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
    new Terrain(this, this.state, -14, 593, 24, 50, true, 'none', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
    new Terrain(this, this.state, 315, 593, 4, 50, false, 'none', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
    this.wagon_front = this.add.sprite (154, 580, 'wagon_1');
    terrain_group.add(this.wagon_front);
    this.wagon_front.anchor.set(0.5);
    this.wagon_front.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
    this.wagon_front.animations.play('anim');
//wagon2
    if (true) {
      new Terrain(this, this.state, -272 , 497, 240, 20, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true; //floorstructure1
      new Terrain(this, this.state, -300, 638, 300, 20, false, 'metal', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
      new Terrain(this, this.state, -11, 593, 24, 50, true, 'none', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
      new Terrain(this, this.state, -316, 593, 24, 50, true, 'none', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;
      new Terrain(this, this.state, -319, 593, 4, 50, false, 'none', [0xFFFF99, 0xFFD699, 0xFFFFFF]).playerTrain = true;  //floorstructure2
      this.wagon_front1 = this.add.sprite (-154, 580, 'wagon_1');
      terrain_group.add(this.wagon_front1);
      this.wagon_front1.anchor.set(0.5);
      this.wagon_front1.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
      this.wagon_front1.animations.play('anim');
    }
//structure healthbar
    healthbar_fill = this.add.image(100, 30, 'healthbar');
    healthbar_fill.right = 100;
    healthbar_fill.scale.set(3);
    healthbar_fill.fixedToCamera = true;
    healthbar_outline = this.add.image(100, 30, 'healthbar_back');
    healthbar_outline.scale.set(3);
    healthbar_outline.fixedToCamera = true;
    healthbar_text = this.add.bitmapText(250, 44, 'font', 'Train health: ' + structure_health + ' / ' + 100, 12);
    healthbar_text.anchor.set(0.5);
    healthbar_text.fixedToCamera = true;
    updateHealthBar(this.game, this.state);

    this.joystick_camera_x = 0;
    this.joystick_camera_y = 0;
//clock
    new Clock(this.game, this.state);
    new WaveIndicator(this.game, this.state, WAVE);

    Shoppe(this.game, this.state);

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
    if (playa.alive && !SHOP_OPEN) {
      if (MOBILE && this.joystick.properties.distance !== 0) {
        this.joystick_camera_x = this.joystick.properties.x * 2.5;
        this.joystick_camera_y = this.joystick.properties.y * 2.5 + 150;
      }
      this.camera.x = MOBILE ? camera_offset_x + playa.x - this.game.width * 0.5 + this.joystick_camera_x : camera_offset_x + (playa.x - this.game.width * 0.5) + (this.input.x - this.game.width * 0.5) * 0.66;
      this.camera.y = MOBILE ? camera_offset_y + playa.y - this.game.width * 0.5 + this.joystick_camera_y : camera_offset_y + (playa.y - this.game.height * 0.5) + (this.input.y - this.game.height * 0.5) * 0.66;
    }
  },


  render: function() {
//    enemy_group.forEach(function(item) {
//      this.game.debug.body(item);
//    }, this);
    //this.game.debug.body(playa);
//    this.game.debug.text("X: " + this.input.worldX, 32, 32);
//    this.game.debug.text("Y: " + this.input.worldY, 32, 64);
    if (MOBILE) {
      this.game.debug.text("FPS: " + this.game.time.fps, 32, 96);  
    }
  }
};

updateHealthBar = function (game, state) {
  this.state = state;
  healthbar_fill.scale.x = structure_health * 0.03;
  healthbar_text.text = 'Train health: ' + structure_health + ' / ' + 100;
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
