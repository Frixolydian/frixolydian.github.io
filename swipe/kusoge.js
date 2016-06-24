Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Player = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.gravity.y = 800;
  this.body.drag.x = 400;
  this.body.velocity.x = 50;
  this.body.maxVelocity.x = 200;
  this.body.collideWorldBounds = true;
  this.swipe = new Swipe(this.game);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  //collisions
  this.game.physics.arcade.collide(this, terrain_group);

  var direction = this.swipe.check();

  this.body.drag.x = this.body.touching.down? 200 : 100;
  this.body.drag.y = this.body.touching.left || this.body.touching.right? 700 : 0;
  if (this.body.touching.left) {
    this.body.velocity.x = -2;
  }
  if (this.body.touching.right) {
    this.body.velocity.x = 2;
  }

  if (direction !== null) {
    switch (direction.direction) {
      case this.swipe.DIRECTION_LEFT: 
        this.runLeft();
    break
      case this.swipe.DIRECTION_RIGHT:
        this.runRight();
    break
      case this.swipe.DIRECTION_UP:
        this.jump();
    break
      case this.swipe.DIRECTION_UP_LEFT:
        this.jumpLeft();
    break      
      case this.swipe.DIRECTION_UP_RIGHT:
        this.jumpRight();
    break      
    }
  }
//GENERATE LEVELS
//console.log (this.game.world.bounds.y - GAMEY * 20 + 360 + 720);
  if (this.world.y < -GAMEY * 20 + 1080) {
    Level1(this.game, this.state, GAMEY);
    this.game.world.setBounds(0, this.y - 720, 480, 1720);
//    this.game.world.bounds.y -= 9 * 20;
    console.log(-GAMEY * 20 + 1080);
    console.log(this.game.world.bounds.y);
  }

};

Player.prototype.runLeft = function() {
  if (this.body.touching.down) {
    this.body.velocity.x -= 150;
  }
}

Player.prototype.runRight = function() {
  if (this.body.touching.down) {
    this.body.velocity.x += 300;
  }
}

Player.prototype.jump = function() {
  if (this.body.touching.down) {
    this.body.velocity.y -= 300;
  }
  if (this.body.touching.right) {
    this.body.velocity.x = -300;
    this.body.velocity.y = -300;
  }
  if (this.body.touching.left) {
    this.body.velocity.x = 300;
    this.body.velocity.y = -300;
  }
}

Player.prototype.jumpLeft = function() {
  if (this.body.touching.down) {
    this.body.velocity.x -= 300;
    this.body.velocity.y -= 300;
  }
  if (this.body.touching.right) {
    this.body.velocity.x = -300;
    this.body.velocity.y = -300;
  }
  if (this.body.touching.left) {
    this.body.velocity.x = 300;
    this.body.velocity.y = -300;
  }
}

Player.prototype.jumpRight = function() {
  if (this.body.touching.down) {
    this.body.velocity.y -= 300;
    this.body.velocity.x += 300;
  }
  if (this.body.touching.right) {
    this.body.velocity.x = -300;
    this.body.velocity.y = -300;
  }
  if (this.body.touching.left) {
    this.body.velocity.x = 300;
    this.body.velocity.y = -300;
  }
}


Terrain = function (game, state, x, y, sprite, oneway) {
  Phaser.Sprite.call(this, game, x, y, sprite);
  game.add.existing(this);
  state = this.state;
  this.events.onOutOfBounds.add(function() {
    this.destroy();
  }, this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
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

Spikes = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'spikes');
  game.add.existing(this);
  state = this.state;
  this.events.onOutOfBounds.add(function() {
    this.destroy();
  }, this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  terrain_group.add(this);
};
Spikes.prototype = Object.create(Phaser.Sprite.prototype);
Spikes.prototype.constructor = Spikes;

kusoge = function(game){};

kusoge.prototype = {

  create:function(){
    GAMEY = 0;
    ORIENTATION = false;
    terrain_group = this.add.group();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#0044AA"; //set the background color

    Player = new Player(this.game, this.state, 100, 680);
    this.camera.follow(Player);

    Level1(this.game, this.state, GAMEY);

    this.game.world.setBounds(0, 0, 480, 720);
//    this.tilesprite = this.game.add.tileSprite(-2880, 0, 5760, 1280, 'background_1');
  },

  update:function(){

 },

  render:function(){
    terrain_group.forEach(function(item) {
//      this.game.debug.body(item);
    }, this);
    //this.game.debug.body(playa);
//    this.game.debug.text("X: " + this.input.worldX, 32, 32);
//    this.game.debug.text("Y: " + this.input.worldY, 32, 64);
    this.game.debug.text("FPS: " + this.game.time.fps, 32, 32); 
    this.game.debug.text("X: " + (this.input.x / 20 - 1), 32, 64);
    this.game.debug.text("Y: " + (this.game.height - this.input.y) / 20, 32, 96);
    this.game.debug.text("Player y: " + Player.y, 32, 120);    
  }
};

Level1 = function (game, state, y, orientation) {
  this.state = state;
  height = 9;
//floor
  for (var i = 4; i <= 21; i++) {
    new Terrain(game, this.state, ORIENTATION? game.width - i * 20 - 20 : i * 20, game.height - (y + 1) * 20, 'block');
  };
//walls
  for (var i = 1; i <= height; i++) {
    new Terrain(game, this.state, 20, game.height - (i + y) * 20, 'block');
    new Terrain(game, this.state, 440, game.height - (i + y) * 20, 'block');
  };

  var a = [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], 
  [13, 4], [14, 4], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4], [20, 4],
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],];
  a.forEach(function(item) {
    new Terrain(game, this.state, ORIENTATION? 20 + item[0] * 20 : game.width - (40 + item[0] * 20), game.height - (item[1] + y + 1) * 20, 'block');
  }, this);
  new Spikes(game, this.state, ORIENTATION? 200 : game.width - 220, game.height - (2 + y) * 20);
  new Spikes(game, this.state, ORIENTATION? 220 : game.width - 240, game.height - (2 + y) * 20);

  GAMEY += height;
  ORIENTATION = !ORIENTATION;
};