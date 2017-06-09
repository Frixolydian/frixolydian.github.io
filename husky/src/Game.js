husky = function (game, state, x, y) {
  Phaser.Sprite.call(this, game, x , y , 'doge');
  game.add.existing(this);
  this.state = state;

//add doge
    this.scale.set(2.75 + Math.random() / 2);
    this.smoothed=false;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 300;
    this.animations.add('walking', [1,1,2,2,3,3,2,2],6,true);
    this.animations.add('running', [4,5,6,7],12,true);
    this.animations.add('sprinting',[4,5,6,7],12,true);
    this.animations.add('jumpup',[8]);
    this.animations.add('jumpdown',[9]);
    this.animations.add('stop', [0]);
    this.animations.add('kill',[10]);
    this.animations.play('stop',0,true);
    this.running_factor = Math.random() * 8
    this.inputEnabled = true;
    this.events.onInputOver.add(function(){
        if (runningspeed>10&&this.body.touching.down&&this.animations.currentAnim.name!='kill'){
            this.body.velocity.y=-193;
            this.jumping=true;
        }
    }, this);



};
husky.prototype = Object.create(Phaser.Sprite.prototype);
husky.prototype.constructor = husky;

husky.prototype.update = function() {

//wrapdoge
    if(this.body.position.x>600){
        this.running_factor = Math.random() * 8
        this.body.position.x=-99;
    }
//collision
    this.game.physics.arcade.collide(this, floor);
    if (runningspeed<0){
        runningspeed=0;
    }

//JUMP



//jumping animation
    if (this.body.velocity.y<0&&this.animations.currentAnim.name!='kill'){
        this.animations.play('jumpup');
        }
    if (this.body.velocity.y>0&&this.animations.currentAnim.name!='kill'){
        this.animations.play('jumpdown');
        }
    if (this.animations.currentAnim.name!='kill'&&this.body.velocity.y==0){
        if (this.body.velocity.x > 50){
            this.animations.play('running',12,true);
        }
        else{
            this.animations.play('walking',12,true);
        }
    }
    if(runningspeed<1&&this.body.velocity.y==0&&this.animations.currentAnim.name!='kill'){
        this.animations.play('stop');
    }

    this.body.velocity.x=runningspeed*(5+this.running_factor);
};







Doge.Game = function(game){};

Doge.Game.prototype = {

create:function() {
//music
    this.audio1=this.add.audio('audio');
    this.game.time.events.add(800, this.playmusic, this);  

    this.game.world.setBounds(0, 0, 480, 80);

//CALL VARIABLES
    runningspeed=0;
    this.jump=0;
    this.endscore=0;
    this.endbestscore=0;
    this.clickpressed=false;

    this.jumping=false;
    this.gameend=false;
    this.aurora='cyan';
    this.gamestart='false';
    
    this.physics.startSystem(Phaser.Physics.ARCADE);
    floor=this.add.sprite(-20000,436);
    this.physics.arcade.enable(floor);
    floor.enableBody = true;
    floor.body.setSize(10000000, 16, 0, 0);
    floor.body.immovable = true;
//background create
    this.back1=this.add.sprite(0,0,'back1');
    this.back1.scale.set(4);
    this.back1.smoothed=false;
    this.back2=this.add.sprite(0,0,'back2');
    this.back2.scale.set(4);
    this.back2.smoothed=false;
//ADD AURORA
    this.back3magenta=this.add.sprite(0,0,'back3magenta');
    this.back3magenta.scale.set(4);
    this.back3magenta.smoothed=false; 
    this.back3magenta.alpha = 0;
    this.back3blue=this.add.sprite(0,0,'back3blue');
    this.back3blue.scale.set(4);
    this.back3blue.smoothed=false;     
    this.back3blue.alpha = 0;
    this.back3cyan=this.add.sprite(0,0,'back3cyan');    
    this.back3cyan.scale.set(4);
    this.back3cyan.smoothed=false; 
    this.back3cyan.alpha = 1;    

    this.back4=this.add.tileSprite(0, 0, 256, 256, 'back4');
    this.back4.scale.set(4);
    this.back4.smoothed=false;
    this.back5=this.add.tileSprite(0, 0, 256, 256, 'back5');
    this.back5.scale.set(4);
    this.back5.smoothed=false;
    this.background = this.add.tileSprite(0, 5, 256, 256, 'background');
    this.background.scale.set(2);
    this.background.smoothed = false;

    
    new husky(this.game, this.state, -1000, 300);
    new husky(this.game, this.state, -2000, 300);
    new husky(this.game, this.state, -3000, 300);
    new husky(this.game, this.state, -4000, 300);
    new husky(this.game, this.state, -5000, 300);
    new husky(this.game, this.state, -6000, 300);
    new husky(this.game, this.state, -7000, 300);
    new husky(this.game, this.state, -8000, 300);
    new husky(this.game, this.state, 210, 330);


//gamestart
    this.time.events.add(Phaser.Timer.SECOND*1,this.gameStart,this)
//loop aurora
    this.changeAurora();
    this.time.events.repeat(Phaser.Timer.SECOND*15, 7000, this.changeAurora,this);
},

gameStart:function(){
    this.gamestart=true;
},

playmusic:function(){
    this.audio1.loopFull(0.5);
},

update:function() {


//checkclick
    if (this.input.activePointer.isDown){
        this.clickpressed=true;
    }
    
    if (!this.input.activePointer.isDown){
        this.clickpressed=false;
    }

    //running animation
    if (this.input.activePointer.isDown&&this.gamestart==true&&runningspeed<15){
        runningspeed+=0.2;
    }

    if (runningspeed>0){
        runningspeed-=0.1;
    }



//scroll
    this.background.tilePosition.x -= runningspeed/5;
    this.back4.tilePosition.x-=runningspeed/200;
    this.back5.tilePosition.x-=runningspeed/12;

},


checkOverlap:function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

},

changeAurora:function(){
    if(this.aurora=='cyan'){
        this.add.tween(this.back3cyan).to( { alpha: 0 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.add.tween(this.back3blue).to( { alpha: 1 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.aurora='blue';
    }
    else if(this.aurora=='blue'){
        this.add.tween(this.back3blue).to( { alpha: 0 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.add.tween(this.back3magenta).to( { alpha: 1 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.aurora='magenta';
    }
    else if(this.aurora=='magenta'){
        this.add.tween(this.back3magenta).to( { alpha: 0 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.add.tween(this.back3blue).to( { alpha: 1 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.aurora='blue2';
    }
    else if (this.aurora=='blue2'){
        this.add.tween(this.back3blue).to( { alpha: 0 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.add.tween(this.back3cyan).to( { alpha: 1 }, 3500, Phaser.Easing.Exponential.None, true, 0, 0, false);
        this.aurora='cyan';
    }
},
render:function(){
//    this.game.debug.text("Over: " + this.frisbee.input.pointerDown(), 32, 32);
//    this.game.debug.text("Clicking: " + this.input.activePointer.isDown, 32, 48);
//    this.game.debug.text("Clickpressed: " + this.clickpressed, 32, 64);
//    this.game.debug.text("Aurora: "+this.aurora,32,72);
}
};