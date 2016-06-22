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
  this.body.maxVelocity.x = 300;
  this.body.collideWorldBounds = true;
  this.swipe = new Swipe(this.game);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  //collisions
  this.game.physics.arcade.collide(this, terrain_group);

  var direction = this.swipe.check();

  if (this.body.touching.down) {
    this.body.drag.x = 300;
  }
  else {
    this.body.drag.x = 100;
  }
  if (this.body.touching.left || this.body.touching.right) {
    this.body.drag.y = 700;
  }
  else {
    this.body.drag.y = 0;
  }
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


};

Player.prototype.runLeft = function() {
  if (this.body.touching.down) {
    this.body.velocity.x -= 300;
  }
}

Player.prototype.runRight = function() {
  if (this.body.touching.down) {
    this.body.velocity.x += 300;
  }
}

Player.prototype.jump = function() {
  if (this.body.touching.down) {
    this.body.velocity.y -= 400;
  }
  if (this.body.touching.right) {
    this.body.velocity.x = -300;
    this.body.velocity.y = -400;
  }
  if (this.body.touching.left) {
    this.body.velocity.x = 300;
    this.body.velocity.y = -400;
  }
}

Player.prototype.jumpLeft = function() {
  if (this.body.touching.down) {
    this.body.velocity.y -= 400;
    this.body.velocity.x -= 300;
  }
}

Player.prototype.jumpRight = function() {
  if (this.body.touching.down) {
    this.body.velocity.y -= 400;
    this.body.velocity.x += 300;
  }
}


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


kusoge = function(game){};

kusoge.prototype = {

  create:function(){
    terrain_group = this.add.group();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#0044AA"; //set the background color

    new Player(this.game, this.state, 200, 200);
    new Terrain(this.game, this.state, 0, 0, 20, 720);
    new Terrain(this.game, this.state, 0, 700, 480, 20)
    new Terrain(this.game, this.state, 200, 0, 20, 720);

//    this.game.world.setBounds(0, 0, );
//    this.tilesprite = this.game.add.tileSprite(-2880, 0, 5760, 1280, 'background_1');
  },

  update:function(){

 },

  render:function(){
    terrain_group.forEach(function(item) {
      this.game.debug.body(item);
    }, this);
    //this.game.debug.body(playa);
//    this.game.debug.text("X: " + this.input.worldX, 32, 32);
//    this.game.debug.text("Y: " + this.input.worldY, 32, 64);
    this.game.debug.text("FPS: " + this.game.time.fps, 32, 32); 
  }
};
