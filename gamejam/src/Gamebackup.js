Doge.Husky = function(game){};

Doge.Husky.prototype = {
preload: function() {
    this.load.image('bobby','assets/bobby.png');
    this.load.image('button','assets/button.png');
    },
damageClick: function() {
    if(this.menu.visible&&this.money>this.damagecost){
        this.strength+=1;
        this.money-=this.damagecost;
        this.damagecost=Math.ceil(Math.pow(this.damagecost,1.25));
        this.damagelabel.setText('Damage '+this.damagecost);
    }
    },
healthClick: function() {
    if(this.menu.visible&&this.money>this.healthcost){
        this.health+=30;
        this.money-=this.healthcost;
        this.healthcost=Math.ceil(Math.pow(this.healthcost,1.25));
        this.healthlabel.setText('Health '+this.healthcost);
    }
    },
maxspeedClick: function() {
    if(this.menu.visible&&this.money>this.maxspeedcost){
        this.bobby.body.maxVelocity.x+=50;
        this.bobby.body.maxVelocity.y+=50;
        this.money-=this.maxspeedcost;
        this.maxspeedcost=Math.ceil(Math.pow(this.maxspeedcost,1.25));
        this.maxspeedlabel.setText('Max Speed '+this.maxspeedcost);
    }
    },
create:function(){
    this.game.stage.setBackgroundColor(0XAA3939);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors=this.game.input.keyboard.createCursorKeys();
//añadir grupos
    this.carne = this.game.add.group();
    this.menu = this.game.add.group();
    this.grupoestela = this.game.add.group();
    this.menu.visible=false;
//menu
    this.money=100;
    this.damagecost=10;
    this.healthcost=10;
    this.maxspeedcost=10;
    this.staminacost=10;
    this.damage1 = this.game.add.button(50, 100, 'button', this.damageClick, this, 2, 1, 0);
    this.menu.add(this.damage1);
    this.damagelabel = this.game.add.text(90, 100, 'Damage '+this.damagecost, { font: '16px Arial', fill: '#fff' });
    this.menu.add(this.damagelabel);
    this.health1 = this.game.add.button(50, 132, 'button', this.healthClick, this, 2, 1, 0);
    this.menu.add(this.health1);
    this.healthlabel = this.game.add.text(90, 132, 'Health '+this.healthcost, { font: '16px Arial', fill: '#fff' });
    this.menu.add(this.healthlabel);
    this.maxspeed1 = this.game.add.button(50, 164, 'button', this.maxspeedClick, this, 2, 1, 0);
    this.menu.add(this.maxspeed1);
    this.maxspeedlabel = this.game.add.text(90, 164, 'Max speed '+this.maxspeedcost, { font: '16px Arial', fill: '#fff' });
    this.menu.add(this.maxspeedlabel);

//pause
    this.pause_label = this.game.add.text(150, 20, 'Upgrade', { font: '24px Arial', fill: '#fff' });
    this.pause_label.inputEnabled = true;
    this.pause_label.events.onInputUp.add(function () {
        this.menu.visible=!this.menu.visible;
    },this);
//variables del weon
    this.stamina=100;
    this.hp=100;
    this.strength=1;
    this.dedia=true;
    this.staminabar = new Phaser.Rectangle(32,550,this.stamina*4,16);
    this.time.events.add(Phaser.Timer.SECOND * 120, this.cambiarnoche, this);
    this.time.events.add(5, this.crearestela, this);

//crear al weon
    this.bobby=this.add.sprite(400,240,'bobby');
    this.physics.arcade.enable(this.bobby);
    this.bobby.body.drag.x=100;
    this.bobby.body.drag.y=100;
    this.bobby.body.collideWorldBounds = true;
    this.bobby.body.bounce.set(0.75);
    this.bobby.body.maxVelocity.x=400;
    this.bobby.body.maxVelocity.y=400;
//crear carne(?)
    this.carne.create(400,150,'bobby');
    this.carne.create(600,150,'bobby');
    this.carne.forEach(function(item) {
        this.physics.arcade.enable(item);
    },this);
//crear enemigo
    this.enemy=this.add.sprite(300,300,'bobby');
    this.physics.arcade.enable(this.enemy);
    this.enemy.body.bounce.set(0.2);
    this.enemy.body.drag.x=200;
    this.enemy.body.drag.y=200;
    this.enemy.maxHealth=200;
    this.enemy.health=200;
    this.enemy.damagetimeout=0;
},
update:function(){
//update bars
    this.staminabar.width=this.stamina*4;
//enemytimeout

//movement
    if (this.input.activePointer.isDown){   
        Math.atan2(this.input.activePointer.y - this.bobby.y, this.input.activePointer.x - this.bobby.x ) * (180/Math.PI);
            item.rotation = this.physics.arcade.angleToPointer(item)+90;
    }    
    if (this.enemy.damagetimeout>0){
        this.enemy.damagetimeout-=1;
    }
    if (this.cursors.left.isDown){
        this.bobby.body.velocity.x-=5;
        this.stamina-0.03;
    }
    if (this.cursors.up.isDown){
        this.bobby.body.velocity.y-=5;
        this.stamina-0.03;
    }
    if (this.cursors.right.isDown){
        this.bobby.body.velocity.x+=5;
        this.stamina-0.03;
    }
    if (this.cursors.down.isDown){
        this.bobby.body.velocity.y+=5;
        this.stamina-0.03;
    }

//staminamanager
    this.stamina-=this.bobby.body.velocity;
    if (this.stamina>100){
        this.stamina=100;
    }
//comercarne
    this.game.physics.arcade.overlap(this.bobby, this.carne, this.comercarne, null, this);
//collision enemy
    this.game.physics.arcade.overlap(this.bobby, this.enemy, this.enemycollide, null, this);
//nublar estela
    this.grupoestela.forEach(function(item) {
        item.alpha-=0.05;
        if(item.alpha<0){
            item.kill();
        }
    },this);
},

render:function(){
    this.game.debug.inputInfo(16, 16);
    this.game.debug.text('Stamina: '+this.stamina,400,16);
    this.game.debug.text('De dia?'+this.dedia,400,32);
    this.game.debug.text('Enemyhealth'+this.enemy.health,400,64);
    this.game.debug.text('Strength: '+this.strength,400,80);
    this.game.debug.text('Velocidad'+Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2)),400,48);
    this.game.debug.geom(this.staminabar,'#0fffff');
},
crearestela:function(){
    if(Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2))>200){
        this.estela=this.add.image(this.bobby.x,this.bobby.y,'bobby');
        this.estela.tint=0xC71585;
        this.estela.alpha=0.75;
        this.grupoestela.add(this.estela);
    }
    this.time.events.add(5, this.crearestela, this);
},
comercarne:function(bobby,carne){
    this.stamina+=30;
    carne.kill();
},
enemycollide:function(bobby,enemy){
    if(enemy.damagetimeout==0&&Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2))>300){
        enemy.damage((0.8+this.strength*0.2) *((Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2)))-300));
        this.game.physics.arcade.collide(this.bobby, this.enemy, null, null, this);
        enemy.damagetimeout=100;
    }
},
cambiarnoche:function(){
    this.dedia=!this.dedia;
    this.time.events.add(Phaser.Timer.SECOND * 120, this.cambiarnoche, this);
},
pausemenu:function(){
    if(this.game.paused){
        this.game.paused=false;
    }
    else{
        this.game.paused=true;
    }
}

};