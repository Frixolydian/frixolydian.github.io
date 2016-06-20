var starting_evolution = 10;

var ang;

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

SnakeBody = function (game, sprite, bodytofollow) {
  Phaser.Sprite.call(this, game, bodytofollow.world.x , bodytofollow.world.y , sprite);
  game.add.existing(this);
  this.smoothed = false;

  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.target = bodytofollow;
  this.anchor.y = 0.5;
  this.anchor.x = 1;

  this.addChild(this.game.make.sprite(-55, 0, null));
  this.addChild(this.game.make.sprite(-23, 0, null));
//  this.scale.set(0.15);
//  this.body.setSize(150, 150, 0, 0);

};

SnakeBody.prototype = Object.create(Phaser.Sprite.prototype);
SnakeBody.prototype.constructor = SnakeBody;

SnakeBody.prototype.update = function() {
  this.rotation = this.game.physics.arcade.angleBetween(this.getChildAt(1).world, this.target.world);
  this.x = this.target.world.x;
  this.y = this.target.world.y;
};

Seagull = function (game, spawnx, spawny, turn) {
  Phaser.Sprite.call(this, game, spawnx, spawny, 'small_fish');
  game.add.existing(this);
  this.autoCull = true;
  this.animations.add('swim');
  this.animations.play('swim', 12 , true);
  this.animations.currentAnim.setFrame(Math.floor(Math.random()*8), true);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.events.onOutOfBounds.add(function() {
    this.destroy();
  }, this);


  this.anchor.set(0.5);
  if(turn === true){
  this.body.velocity.x = 70;
  this.scale.x = 1;
  }
  else{
  this.body.velocity.x = -70;
  this.scale.x = -1;
  }



  //this.body.gravity.y = 200;

  game.time.events.loop(1000, function(){
  //  this.body.velocity.y = -75 - Math.random() * 50;
  }, this);
};

Seagull.prototype = Object.create(Phaser.Sprite.prototype);
Seagull.prototype.constructor = Seagull;


kusoge = function(game){};

kusoge.prototype = {

  create:function(){

    this.momentum = 0;
    this.origDragPoint = null;
//  ADD HUD
    this.evolution = 0;
    this.evolution_points = 0
    this.for_next_evolution = 25;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#00CC66"; //set the background color
    this.game.world.setBounds(-2880, 0, 5760, 1280);
    this.tilesprite = this.game.add.tileSprite(-2880, 0, 5760, 1280, 'background_1');
//add onTap function to change snake direction
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//  this.key1.onDown.add(this.changeDirection, this);
//  this.game.input.onDown.add(this.changeDirection, this);

//create snake
    this.snakegroup = this.add.group();

    this.snake = this.add.sprite(0, this.game.world.height / 2, 'snake_head');
    this.snake.smoothed = false;
    this.snake.anchor.y = 0.5;
    this.snake.anchor.x = 0.15;
    this.game.physics.enable(this.snake, Phaser.Physics.ARCADE);
    this.snake.body.collideWorldBounds = true;
    this.snake.body.angularDrag = 250;
    this.snake.body.maxAngular = 250;
    this.snake.deep_factor = -50;
    this.snakegroup.add(this.snake);
    this.camera.follow(this.snake);

    this.snake_body = [];
    this.snake_body[0] = new SnakeBody (this, 'snake_body_1', this.snake);
    this.snakegroup.add(this.snake_body[0]);
    
    for (var i = 1; i < starting_evolution; i++) {
      this.snake_body[i] = new SnakeBody (this, 'snake_body_1', this.snake_body[i - 1].getChildAt(0), i);
      this.snakegroup.add(this.snake_body[i]);
      this.snake_body[i].deep_factor = i;
    }
    console.log(i);
    this.snakegroup.sort('deep_factor', Phaser.Group.SORT_DESCENDING);

    //create gulls
    this.seagullgroup = this.add.group();
    this.time.events.loop(1000, function(){
      this.fishBankSpawn();
    }, this);

    this.createHud();
  },

  fishBankSpawn: function() {
    ix =  Math.random() * 1920;
    iy = 200 + Math.random() * 400;
    ir = false;
    if(Math.random() > 0.5){
      ir = true;
    }

    for (i = 1; i < 10; i++) {
      this.seagull = new Seagull (this.game, ix + Math.random() * 200, iy + Math.random() * 100, ir);
      this.seagullgroup.add(this.seagull);
    }

  },


  createHud: function() {
    //create hud
/*    this.evolve_bar_fill = this.game.add.graphics(0, 0);
    this.evolve_bar_fill.fixedToCamera = true;
    this.evolve_bar_fill.beginFill(0x00FF99, 1);
    this.evolve_bar_fill.drawRect(75, 450, 650, 16);
    console.log(this.evolve_bar_fill);

    this.evolve_bar_outline = this.game.add.graphics(0, 0);
    this.evolve_bar_outline.fixedToCamera = true;
    this.evolve_bar_outline.beginFill(0x000000, 0);
    this.evolve_bar_outline.lineStyle(5, 0x000000, 1);
    this.evolve_bar_outline.drawRect(75, 450, 650, 16);
*/
  },

  updateHud: function() {

  },

  killSnake: function() {
    this.game.state.restart();
  },

  evolve:function(){
    this.snake_body[this.evolution + starting_evolution] = new SnakeBody (this, 'snake_body_1', this.snake_body[this.evolution + starting_evolution - 1].getChildAt(0));
    this.snakegroup.add(this.snake_body[this.evolution + starting_evolution]);
    this.snake_body[this.evolution + starting_evolution].deep_factor = this.evolution + starting_evolution;
    this.snakegroup.sort('deep_factor', Phaser.Group.SORT_DESCENDING);
    this.evolution += 1;
//    this.snake.body.maxAngular = 120 + this.evolution * 2;

  },

  update:function(){

    //collisions
  //  this.game.physics.arcade.collide(this.snake, this.snakegroup, this.killSnake, null, this); //collide snake head with body
    this.game.physics.arcade.overlap(this.snake, this.seagullgroup, function(a,b){
      b.destroy();
//      this.evolve();
      this.evolution_points += 1;
      if (this.evolution_points > this.for_next_evolution) {
        this.evolve();
        this.evolution_points = 0; 
      }
    }, null, this);
    if (this.momentum > 50){
      this.momentum -= 0.5;
    }
    this.game.physics.arcade.velocityFromAngle(this.snake.angle, Math.max(this.momentum * 1, 100), this.snake.body.velocity);

    this.snakegroup.forEach(function(item) {
      if (item.angle < 90 && item.angle > -90){
//        item.scale.y = 0.15;
      }
      else{
//        item.scale.y = -0.15;
      }   
    }, this);

    //scroll background w snake and shit
    this.game.world.setBounds(this.snake.x - 2880, 0, 4320, 1280);

    if (this.input.activePointer.isDown) {
      this.snake.body.angularDrag = 300;
      var ang = this.game.math.radToDeg(this.game.math.angleBetween(this.input.activePointer.worldX, this.input.activePointer.worldY, this.snake.x, this.snake.y));
      if (this.origDragPoint) {
        if (true) {
          if (this.game.math.wrapAngle(ang - this.snake.angle) > 0) {
            this.snake.body.angularVelocity -= 20;
          }
          else {
            this.snake.body.angularVelocity += 20;
          }
          this.momentum = Math.min(Math.abs(this.snake.body.angularVelocity / 100) + this.momentum, 250);
        }
      }
      this.origDragPoint = this.input.activePointer.position.clone();
    }
    else {
      this.origDragPoint = null;
      this.snake.body.angularDrag = 150;
    }
  },

  render:function(){
    this.snakegroup.forEach(function(item) {
      //this.game.debug.body(item);
    }, this);
    this.game.debug.text("FPS: " + this.game.time.fps, 32, 32);
//    this.game.debug.text("olas " + (this.for_next_evolution - this.evolution_points), 32, 32);
    this.game.debug.text("Momentum " + this.momentum, 32, 64);

//    this.game.debug.text('anglebetween' + ang, 30, 120);
  }
};
