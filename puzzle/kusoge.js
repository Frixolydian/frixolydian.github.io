Level1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Block = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'block');
  game.add.existing(this);
  walls_group.add(this);
  this.state = state;
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(40, 40);
  this.body.collideWorldBounds = true;
  this.swipe = new Swipe(this.game);

};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  var direction = this.swipe.check();
  this.game.physics.arcade.collide(this, walls_group, function() {
    this.body.immovable = true;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.game.time.events.add(100, function(){
      this.x = Math.round(this.x / 50) * 50;
      this.y = Math.round(this.y / 50) * 50;
    }, this);
  }, null, this);
  if (direction !== null && this.body.velocity.x === 0 && this.body.velocity.y === 0) {
    switch (direction.direction) {
      case this.swipe.DIRECTION_LEFT:
        this.swipeLeft();
    break
      case this.swipe.DIRECTION_RIGHT:
        this.swipeRight();
    break
      case this.swipe.DIRECTION_UP:
        this.swipeUp();
    break
      case this.swipe.DIRECTION_DOWN:
        this.swipeDown();
    break
    }
  }
};

Block.prototype.swipeLeft = function() {
  this.body.velocity.x = -200;
  this.body.immovable = false;
}

Block.prototype.swipeRight = function() {
  this.body.velocity.x = 200;
  this.body.immovable = false;
}

Block.prototype.swipeUp = function() {
  this.body.velocity.y = -200;
  this.body.immovable = false;
}

Block.prototype.swipeDown = function() {
  this.body.velocity.y = 200;
  this.body.immovable = false;
}



Player = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  game.add.existing(this);
  this.state = state;
  walls_group.add(this);
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(40, 40);
//  this.body.collideWorldBounds = true;
  this.swipe = new Swipe(this.game);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  var direction = this.swipe.check();
  this.game.physics.arcade.collide(this, walls_group, function() {
    this.body.immovable = true;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.game.time.events.add(10, function(){
      this.x = Math.round(this.x / 50) * 50;
      this.y = Math.round(this.y / 50) * 50;
    }, this);
  }, null, this);
  if (direction !== null && this.body.velocity.x === 0 && this.body.velocity.y === 0) {
    switch (direction.direction) {
      case this.swipe.DIRECTION_LEFT:
        this.swipeLeft();
    break
      case this.swipe.DIRECTION_RIGHT:
        this.swipeRight();
    break
      case this.swipe.DIRECTION_UP:
        this.swipeUp();
    break
      case this.swipe.DIRECTION_DOWN:
        this.swipeDown();
    break
    }
  }
};

Player.prototype.swipeLeft = function() {
  this.body.velocity.x = -200;
  this.body.immovable = false;
}

Player.prototype.swipeRight = function() {
  this.body.velocity.x = 200;
  this.body.immovable = false;
}

Player.prototype.swipeUp = function() {
  this.body.velocity.y = -200;
  this.body.immovable = false;
}

Player.prototype.swipeDown = function() {
  this.body.velocity.y = 200;
  this.body.immovable = false;
}



Wall = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'wall');
  game.add.existing(this);
  this.state = state;
  walls_group.add(this);
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
};

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;






kusoge = function(game){};

kusoge.prototype = {

  create:function(){
    this.game.stage.backgroundColor = "#000000"; //set the background color
    walls_group = this.add.group();
    RenderLevel(this.game, this.state, Level1);
  },

  update:function(){

  },

  render:function(){
    walls_group.forEach(function(item) {
      this.game.debug.body(item);
    }, this);
  },
};


RenderLevel = function (game, state, code) {
  for (var i = 0; i <= 144; i++) {
    if (code[i] === 1) {
      new Wall (game, state, i % 12 * 50, Math.floor(i / 12) * 50);
    }
    if (code[i] === 9) {
      new Player (game, state, i % 12 * 50, Math.floor(i / 12) * 50);
    }
    if (code[i] === 2) {
      new Block (game, state, i % 12 * 50, Math.floor(i / 12) * 50); 
    }
  }
};