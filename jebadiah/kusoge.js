Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Bullet = function (game, state, x, y, sprite, directionx, directiony, speed, power, enemy, deviation) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  bullet_group.add(this);
  this.power = power;
  this.enemy = enemy;
  this.scale.set(2);
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.game.physics.arcade.velocityFromAngle(this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, directionx, directiony)) + Math.random() * deviation - deviation / 2, speed, this.body.velocity);
  this.angle = this.game.math.radToDeg(this.game.math.angleBetween(this.x, this.y, directionx, directiony));

  this.events.onOutOfBounds.add(function() {
    this.destroy();
  }, this);
};
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
  this.game.physics.arcade.overlap(this, terrain_group, function() {
    new Howl({
      urls: ['assets/audio/tarmac_' + Math.ceil(Math.random() * 4) + '.ogg'],
      volume: 0.01,
      pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.01, 0, 0],
    }).play();
    this.kill();
    this.pendingDestroy = true;
  }, null, this);
};

Money = function (game, state, x, y, sprite) {
  Phaser.Sprite.call(this, game, x , y , sprite);
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);
//dissappear
  this.game.time.events.add(8000, function(){
    if(!this.alive){
      return;
    }
    this.game.add.tween(this).to( { alpha: 0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.game.time.events.add(5000, function(){
        this.destroy();
    }, this);
  }, this);
//physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.drag.x = 50;
  this.body.angularDrag = 500;
  this.body.velocity.x = Math.random() * 200 - 100;
  this.body.velocity.y = Math.random() * -100;
  this.body.angularVelocity = Math.random() * 1000 - 500;
  this.body.gravity.y = 400;
  this.body.bounce.y = 0.3;
};

Money.prototype = Object.create(Phaser.Sprite.prototype);
Money.prototype.constructor = Money;

Money.prototype.update = function() {
  this.game.physics.arcade.collide(this, terrain_group);
  this.game.physics.arcade.overlap(this, player_group, function(a, b) {
    a.destroy();
    money += 10;
    b.hud_money.text = '$$$: ' + money;
  }, null, this);
};(40, 10);

Terrain = function (game, state, a, b, c, d, oneway) {
  Phaser.Sprite.call(this, game, a, b);
  game.add.existing(this);
  state = this.state;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(c, d, 0, 0);
  this.body.immovable = true;
  this.oneway = oneway;
  if (this.oneway) {
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
  }
  terrain_group.add(this);
};
Terrain.prototype = Object.create(Phaser.Sprite.prototype);
Terrain.prototype.constructor = Terrain;

Terrain.prototype.update = function() {

};

kusoge = function(game){};

kusoge.prototype = {

  create: function(){
//    MOBILE = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#00CC66"; //set the background color
    this.game.world.setBounds(-1500, 0, 3000, 720);
//background
    this.scrolling_background_4 = this.add.tileSprite(-1500, 0, this.world.width, 720, 'back_4');
    this.scrolling_background_4.autoScroll(-10, 0);
    this.scrolling_background_4.smoothed = false;
    this.scrolling_background_3 = this.add.tileSprite(-1500, 0, this.world.width, 720, 'back_3');
    this.scrolling_background_3.autoScroll(-20, 0);
    this.scrolling_background_3.smoothed = false;
    this.scrolling_background_2 = this.add.tileSprite(-1500, 0, this.world.width, 720, 'back_2');
    this.scrolling_background_2.autoScroll(-50, 0);
    this.scrolling_background_2.smoothed = false;
    this.scrolling_background_1 = this.add.tileSprite(-1500, 0, this.world.width, 720, 'back_1');
    this.scrolling_background_1.autoScroll(-500, 0);
    this.scrolling_background_1.smoothed = false;

/*    this.structure_back = this.add.image (-500, 264, 'structure');
    this.structure_back.scale.set(0.6);
    this.structure_back2 = this.add.image (408, 264, 'structure');
    this.structure_back2.scale.set(-0.6,0.6);
*/

    bullet_group = this.add.group();  //create groups
    enemy_group = this.add.group();
    player_group = this.add.group();
    terrain_group = this.add.group();

    playa = new Player(this.game, this.state, 0, 570, 'player');
    player_group.add(playa);
    this.camera.follow(this.oa);

    this.time.events.loop(3000, function() {
      if(Math.random() > 0.33){
        new Enemy(this.game, this.state, Math.random() *  500, 500, 'enemy_spike');
      }
      else if (Math.random() > 0.66){
        new Flying_enemy(this.game, this.state, 0, 200 + Math.random() *  100, 'seagull');
      }
      else {
        new Enemy_2(this.game, this.state, 0, 200 + Math.random() *  100, 'player');
      }
    }, this);

    floor = new Terrain(this, this.state, -2880, 666, 5760, 20, false);
    new Terrain(this, this.state, -200, 497, 400, 20, false); //floorstructure1
    new Terrain(this, this.state, -244, 636, 488, 5, false);
    new Terrain(this, this.state, 221, 593, 24, 50, false);  //floorstructure2
    new Terrain(this, this.state, -244, 593, 24, 50, false);

    this.wagon_front = this.add.sprite (0, 580, 'wagon_1');
    this.wagon_front.anchor.set(0.5);
    this.wagon_front.animations.add('anim', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 16, true);
    this.wagon_front.animations.play('anim');
//    this.wagon_front.alpha = 0.2;
/*    this.wagon_back = this.add.image (408, 264, 'structure');
    this.structure_front2.scale.set(-0.6,0.6);
    this.structure_front2.alpha = 0.2;
*/
    if(TURRET_1){
      new Turret(this.game, this.state, -490, 603, 'turret', TURRET_1_UPGRADE);
    }
    if(TURRET_2){
      new Turret(this.game, this.state, 370, 603, 'turret', TURRET_2_UPGRADE);
    }
//    this.boss = new Boss(this.game, this.state, -1000, 600, 'player');

//structure healthbar
    healthbar_fill = this.add.graphics(0, 0);
    healthbar_fill.beginFill(0xff0000);
    healthbar_fill.drawRoundedRect(100, 20, 700, 16, 10);
    healthbar_fill.fixedToCamera = true;
    healthbar_outline = this.add.graphics(0, 0);
    healthbar_outline.beginFill(0x000000, 0);
    healthbar_outline.lineStyle(5, 0x000000, 1);
    healthbar_outline.drawRoundedRect(100, 20, 700, 16, 10);
    healthbar_outline.fixedToCamera = true;

//clock
    new Clock(this.game, this.state);

  if (MOBILE) {
    // Add the VirtualGamepad plugin to the game
    this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
    // Add a joystick to the game (only one is allowed right now)
    this.joystick = this.gamepad.addJoystick(600, 400, 1.2, 'gamepad');
    // Add a button to the game (only one is allowed right now)
    this.button = this.gamepad.addButton(400, 420, 1.0);
    gamepad = new Gamepad(this.game, this.state);
//    this.game.time.desiredFps = 45;
    }
  },

  update:function(){
    this.camera.x = MOBILE ? this.camera.x = playa.x -this.game.width * 0.5:(playa.x - this.game.width * 0.5) + (this.input.x - this.game.width * 0.5) * 0.66;
    this.camera.y = MOBILE ? this.camera.y = playa.y -this.game.width * 0.5:(playa.y - this.game.height * 0.5) + (this.input.y - this.game.height * 0.5) * 0.66;
  },


  render:function(){
    terrain_group.forEach(function(item) {
//      this.game.debug.body(item);
    }, this);
//    this.game.debug.body(playa);
    this.game.debug.text("X: " + this.input.worldX, 32, 32);
    this.game.debug.text("Y: " + this.input.worldY, 32, 64);
    this.game.debug.text("FPS: " + this.time.fps, 32, 96);
  }
};

updateHealthBar = function (game, state) {
  healthbar_fill.clear();
  healthbar_fill.drawRoundedRect(100, 20, 700 * structure_health * 0.01, 16, 10);
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

