Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Player = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'oa');
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
  var direction = this.swipe.check();
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
    }
  }

  if (this.body.touching.down) {
    this.body.drag.x = 400;
  }
  else {
    this.body.drag.x = 300;
  }

};

Player.prototype.runLeft = function() {
  this.body.velocity.x -= 300;
}

Player.prototype.runRight = function() {
  this.body.velocity.x += 300;
}

Player.prototype.jump = function() {
  this.body.velocity.y -= 400;
}

kusoge = function(game){};

kusoge.prototype = {

  create:function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#00CC66"; //set the background color


    new Player(this.game, this.state, 200, 200);
//    this.game.world.setBounds(0, 0, );
//    this.tilesprite = this.game.add.tileSprite(-2880, 0, 5760, 1280, 'background_1');
  },

  update:function(){

 },

  render:function(){

  }
};
