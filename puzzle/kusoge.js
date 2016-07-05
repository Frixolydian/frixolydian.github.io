Level1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 9, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
          1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1];



Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
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

Player = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  game.add.existing(this);
  this.state = state;
  this.anchor.set(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.collideWorldBounds = true;
  this.swipe = new Swipe(this.game);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  var direction = this.swipe.check();
  this.game.physics.arcade.collide(this, walls_group);
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
  this.body.velocity.x = -400;
}

Player.prototype.swipeRight = function() {
  this.body.velocity.x = 400;
}

Player.prototype.swipeUp = function() {
  this.body.velocity.y = -400;
}

Player.prototype.swipeDown = function() {
  this.body.velocity.y = 400;
}
kusoge = function(game){};

kusoge.prototype = {

  create:function(){
    this.game.stage.backgroundColor = "#000000"; //set the background color
    walls_group = this.add.group();
    RenderLevel(this.game, this.state);
    console.log(Level1);
  },

  update:function(){

  },

  render:function(){

  },
};

RenderLevel = function (game, state, code) {
  for (var i = 0; i <= 100; i++) {
    if (Level1[i] === 1) {
      new Wall (game, state, i % 10 * 70 + 45, Math.floor(i / 10) * 70 + 70);
    }
    if (Level1[i] === 9) {
      new Player (game, state, i % 10 * 70 + 45, Math.floor(i / 10) * 70 + 70);
    }
  }
};