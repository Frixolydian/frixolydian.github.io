var multipiso=4;
Doge.Husky = function(game){};

var matriz1 = new Array(10);
var matriz2 = new Array(10);
var matriz3 = new Array(10);
var matriz4 = new Array(10);
var matriz5 = new Array(10);
var matriz6 = new Array(10);
var matriz7 = new Array(10);
var matriz8 = new Array(10);
var matriz9 = new Array(10);
var matriz10 = new Array(10);

matriz1[0]=[0,1,0,0,0,0,0,1,0,0];
matriz1[1]=[0,1,0,1,0,0,0,0,0,0];
matriz1[2]=[0,1,0,1,1,1,1,1,1,0];
matriz1[3]=[0,1,0,0,0,0,1,0,0,0];
matriz1[4]=[0,1,0,0,0,0,1,0,1,0];
matriz1[5]=[0,1,1,0,0,1,1,0,1,0];
matriz1[6]=[0,0,0,0,0,1,1,0,0,0];
matriz1[7]=[0,0,0,1,0,0,1,0,0,0];
matriz1[8]=[0,0,1,1,0,0,0,0,0,1];
matriz1[9]=[0,0,0,1,0,1,0,0,1,1];

matriz2[0]=[1,1,1,1,0,0,1,0,0,0];
matriz2[1]=[0,0,0,0,0,0,1,0,0,0];
matriz2[2]=[0,0,0,0,0,0,0,0,1,1];
matriz2[3]=[0,0,1,0,0,0,1,0,1,1];
matriz2[4]=[0,0,1,0,0,1,1,0,0,1];
matriz2[5]=[1,0,1,1,1,1,0,0,0,0];
matriz2[6]=[1,0,1,0,0,0,0,0,0,0];
matriz2[7]=[1,0,0,0,0,0,0,1,0,0];
matriz2[8]=[1,0,1,1,0,0,0,0,1,0];
matriz2[9]=[0,0,1,1,0,0,0,0,0,0];

matriz3[0]=[0,0,0,0,0,0,0,0,0,0];
matriz3[1]=[0,0,0,0,1,1,0,0,1,1];
matriz3[2]=[0,0,0,0,1,0,0,0,0,1];
matriz3[3]=[0,0,0,0,1,0,0,0,0,0];
matriz3[4]=[0,1,1,1,1,1,1,1,0,0];
matriz3[5]=[0,0,0,1,0,0,0,0,0,1];
matriz3[6]=[0,0,0,1,0,0,0,0,0,0];
matriz3[7]=[0,0,0,0,1,0,0,1,1,0];
matriz3[8]=[0,0,0,0,0,0,0,1,1,0];
matriz3[9]=[0,0,0,0,0,0,0,0,0,1];

matriz4[0]=[0,0,0,0,0,0,0,0,1,0];
matriz4[1]=[0,0,0,0,0,0,0,0,1,0];
matriz4[2]=[0,0,1,0,1,1,1,0,0,0];
matriz4[3]=[0,0,1,0,0,0,0,1,0,0];
matriz4[4]=[1,0,1,0,0,0,1,1,0,0];
matriz4[5]=[1,0,0,0,0,0,1,0,1,0];
matriz4[6]=[1,0,0,0,1,0,0,0,0,0];
matriz4[7]=[1,1,1,1,1,0,0,0,0,0];
matriz4[8]=[1,1,1,1,1,0,0,1,0,0];
matriz4[9]=[0,0,0,0,0,1,1,1,0,0];

matriz5[0]=[0,1,0,0,0,0,0,1,1,1];
matriz5[1]=[0,1,1,0,0,0,0,0,0,1];
matriz5[2]=[0,1,0,0,1,0,0,0,0,1];
matriz5[3]=[0,0,0,1,1,1,0,0,0,0];
matriz5[4]=[1,1,0,1,1,1,1,0,0,0];
matriz5[5]=[0,0,0,1,0,0,1,1,1,0];
matriz5[6]=[0,0,1,1,1,0,1,1,1,0];
matriz5[7]=[0,0,0,0,0,0,0,0,0,0];
matriz5[8]=[0,1,1,0,0,1,0,1,0,0];
matriz5[9]=[0,0,0,0,0,1,0,0,0,1];

matriz6[0]=[0,0,0,1,1,0,0,1,0,0];
matriz6[1]=[0,0,0,0,0,0,0,1,0,0];
matriz6[2]=[0,1,0,0,0,1,0,1,0,1];
matriz6[3]=[0,1,0,0,1,1,0,0,1,1];
matriz6[4]=[0,1,0,0,0,1,0,0,0,0];
matriz6[5]=[0,1,0,0,0,1,1,0,0,0];
matriz6[6]=[0,1,0,1,0,1,0,0,0,0];
matriz6[7]=[0,0,0,1,0,0,1,0,1,1];
matriz6[8]=[0,0,0,0,0,0,0,0,0,0];
matriz6[9]=[1,0,0,1,0,0,1,1,0,0];

matriz7[0]=[0,0,0,0,1,0,0,0,0,0];
matriz7[1]=[0,1,1,0,1,1,0,1,1,1];
matriz7[2]=[0,1,1,0,0,0,0,0,1,1];
matriz7[3]=[0,0,0,0,0,0,0,0,0,0];
matriz7[4]=[1,1,0,0,0,0,0,0,0,1];
matriz7[5]=[0,1,1,0,0,0,0,0,0,1];
matriz7[6]=[0,0,0,0,0,0,0,0,0,0];
matriz7[7]=[0,1,1,0,0,0,1,0,1,0];
matriz7[8]=[0,0,1,0,0,0,1,1,1,0];
matriz7[9]=[0,0,1,0,0,0,1,0,0,0];

matriz8[0]=[0,0,1,0,1,0,0,0,0,0];
matriz8[1]=[1,0,1,0,1,0,0,0,1,0];
matriz8[2]=[0,0,0,0,0,0,0,0,1,0];
matriz8[3]=[0,0,0,0,0,0,0,0,1,0];
matriz8[4]=[1,1,1,1,1,1,1,0,1,0];
matriz8[5]=[0,0,0,0,0,0,0,0,1,0];
matriz8[6]=[0,0,1,0,0,1,1,1,1,0];
matriz8[7]=[1,1,0,0,0,1,0,0,1,0];
matriz8[8]=[1,1,0,0,1,1,0,0,1,0];
matriz8[9]=[0,1,0,0,0,0,0,0,1,0];

matriz9[0]=[0,0,0,0,0,0,1,0,1,0];
matriz9[1]=[0,0,1,0,0,0,1,0,1,0];
matriz9[2]=[0,1,1,0,0,1,1,0,0,0];
matriz9[3]=[0,0,1,0,1,0,1,0,0,0];
matriz9[4]=[1,0,1,0,1,0,1,0,0,1];
matriz9[5]=[1,0,0,0,0,0,0,0,0,1];
matriz9[6]=[1,0,1,0,1,1,1,0,0,1];
matriz9[7]=[0,0,0,0,0,0,1,0,0,1];
matriz9[8]=[0,1,1,0,0,0,0,0,0,0];
matriz9[9]=[0,0,0,1,0,0,0,1,0,0];

matriz10[0]=[0,0,0,0,0,0,0,0,0,1];
matriz10[1]=[1,0,0,0,0,0,0,0,0,1];
matriz10[2]=[1,0,1,0,1,1,1,1,0,0];
matriz10[3]=[0,0,1,0,0,0,1,0,0,0];
matriz10[4]=[0,0,1,0,0,0,1,0,0,0];
matriz10[5]=[1,1,0,0,0,0,0,0,0,1];
matriz10[6]=[0,0,0,0,0,1,0,1,1,1];
matriz10[7]=[0,0,1,1,0,0,0,1,0,0];
matriz10[8]=[1,0,1,1,0,1,1,1,0,0];
matriz10[9]=[1,0,0,0,0,0,0,1,0,0];

var highscore =localStorage.getItem('bestscore');
var mundo = new Array(multipiso*10);
var iterador_y, iterador_x, iterador_mapa, posicion_inicial_minimapa_y, posicion_inicial_minimapa_x;
var mapa;
var layer;


for (iterador_y=0; iterador_y<multipiso*10; iterador_y++)
{
mundo[iterador_y] = new Array(multipiso*10);
}

for (iterador_mapa=0; iterador_mapa<multipiso*10; iterador_mapa++)
{
//losculpables
posicion_inicial_minimapa_y = (Math.floor(iterador_mapa/10))*10;
posicion_inicial_minimapa_x = (iterador_mapa%10)*10;

switch(Math.floor(Math.random()*10+1))
{
case 1:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz1[iterador_y][iterador_x];
}
}
break;

case 2:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz2[iterador_y][iterador_x];
}
}
break;

case 3:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz3[iterador_y][iterador_x];
}
}
break;

case 4:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz4[iterador_y][iterador_x];
}
}
break;

case 5:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz5[iterador_y][iterador_x];
}
}
break;

case 6:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz6[iterador_y][iterador_x];
}
}
break;

case 7:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz7[iterador_y][iterador_x];
}
}
break;

case 8:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz8[iterador_y][iterador_x];
}
}
break;

case 9:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz9[iterador_y][iterador_x];
}
}
break;

default:
for (iterador_y=0; iterador_y<10; iterador_y++)
{
for (iterador_x=0; iterador_x<10; iterador_x++)
{
mundo[iterador_y+posicion_inicial_minimapa_y][iterador_x+posicion_inicial_minimapa_x]=matriz10[iterador_y][iterador_x];
}
}
break;
}
}




Doge.Husky.prototype = {
preload: function() {

    },
damageClick: function() {
    if(this.money>=this.velocost){
        this.velofactor+=0.3;
        this.money-=this.velocost;
        this.velocost=Math.floor(this.velocost*1.5);
        this.velolabel.setText('Acceleration '+this.velocost);
        this.moneylabel.setText('Orbs: '+this.money);
    }
    },
healthClick: function() {
    if(this.money>=this.healthcost&&this.playerhealth<5){
        this.playerhealth+=1;
        this.money-=this.healthcost;
        this.healthcost+=10;
        this.healthlabel.setText('Heal '+this.healthcost);
        this.moneylabel.setText('Orbs: '+this.money);
    }
    },
maxspeedClick: function() {
    if(this.money>=this.maxspeedcost){
        this.bobby.body.maxVelocity.x+=15;
        this.bobby.body.maxVelocity.y+=15;
        this.money-=this.maxspeedcost;
        this.maxspeedcost=Math.floor(this.maxspeedcost*1.5);
        this.maxspeedlabel.setText('Max Speed '+this.maxspeedcost);
        this.moneylabel.setText('Orbs: '+this.money);
    }
    },
create:function(){

this.audio=this.add.audio('gamejam2');
this.audio2=this.add.audio('sfx3');
this.audio3=this.add.audio('sfx5');
this.audio.loopFull();

this.enemigo1=0;
this.enemigo2=0;
this.enemigo3=0;

this.pisoso=this.game.add.group();
    this.pisorososo=this.add.tileSprite(0,0,960*multipiso,960*multipiso,'piso');
    this.pisoso.add(this.pisorososo);

this.tiling = this.game.add.group();


    mapa = this.game.add.tilemap();

    mapa.addTilesetImage('tiles', null, 96, 96);

    layer = mapa.create('nivel', 10*multipiso, 10*multipiso, 96, 96, this.tiling);



    var doritos_y, doritos_x;

    for (doritos_y = 0; doritos_y<multipiso*10; doritos_y++)
    {
        for (doritos_x = 0; doritos_x<multipiso*10; doritos_x++)
        {
            if (mundo[doritos_y][doritos_x]==1)
            {
                mapa.putTile(0, doritos_x, doritos_y, layer);
            }
        }
    }

    this.game.world.setBounds(0, 0, multipiso*960, multipiso*960);
    mapa.setCollision(0);

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors=this.game.input.keyboard.createCursorKeys();
//añadir grupos
    this.enemigouno = this.game.add.group();
    this.enemigodos = this.game.add.group();
    this.enemigotres = this.game.add.group();
    this.menu = this.game.add.group();
    this.grupoestela = this.game.add.group();
    this.grupoorbestela=this.game.add.group();
    this.orbgroup = this.game.add.group();
    this.enemygroup=this.game.add.group();
    this.damagetext=this.game.add.group();
//menu
    this.money=100;
    this.moneylabel=this.game.add.text(300,20,'Orbs: '+this.money,{ font: '16px Arial', fill: '#00FFFF' });
    this.score=0;
    this.moneylabel.fixedToCamera=true;
    this.scorelabel=this.game.add.text(360,600,'Score: '+this.score,{ font: '16px Arial', fill: '#00FFFF' });
    this.scorelabel.fixedToCamera=true;
    this.velocost=35;
    this.healthcost=20;
    this.maxspeedcost=10;
    this.playerhealth=5;
    this.velofactor=1;

    this.velolabel = this.game.add.text(90, 100, 'Acceleration '+this.velocost, { font: '24px Arial', fill: '#00FFFF' });
    this.velolabel.fixedToCamera=true;
    this.velolabel.inputEnabled = true;
    this.velolabel.events.onInputUp.add(this.damageClick,this);
    this.menu.add(this.velolabel);

    this.healthlabel = this.game.add.text(90, 164, 'Heal '+this.healthcost, { font: '24px Arial', fill: '#00FFFF' });
    this.healthlabel.fixedToCamera=true;
    this.healthlabel.inputEnabled = true;
    this.healthlabel.events.onInputUp.add(this.healthClick,this);
    this.menu.add(this.healthlabel);

    this.maxspeedlabel = this.game.add.text(90, 132, 'Max speed '+this.maxspeedcost, { font: '24px Arial', fill: '#00FFFF' });
    this.maxspeedlabel.fixedToCamera=true;
    this.maxspeedlabel.inputEnabled = true;
    this.maxspeedlabel.events.onInputUp.add(this.maxspeedClick,this);
    this.menu.add(this.maxspeedlabel);

//variables del weon
    this.stamina=100;
    this.hp=100;
    this.strength=1;
    this.dedia=true;
    this.staminabar = this.add.image(150,530,'bluebar');
    this.staminabar.fixedToCamera=true;
    this.healthbar = this.add.image(150,580,'redbar');
    this.healthbar.fixedToCamera=true;
    this.time.events.add(Phaser.Timer.SECOND * 120, this.cambiarnoche, this);
    this.time.events.add(5, this.crearestela, this);

    this.orbrepeater=0;

//crear al weon
    this.bobby=this.add.sprite(Math.random()*960*multipiso,Math.random()*960*multipiso,'bobbo');
//    this.bobby.scale.set(0.3);
    this.bobby.damagetimeout=0;
    this.bobby.anchor.x=0.5;
    this.bobby.anchor.y=0.75;

    this.physics.arcade.enable(this.bobby);
    this.bobby.body.setSize(16, 16, 0, 4);
    this.bobby.body.drag.x=200;
    this.bobby.body.drag.y=200;
    this.bobby.body.collideWorldBounds = true;
    this.bobby.body.bounce.set(0.75);
    this.bobby.body.maxVelocity.x=300;
    this.bobby.body.maxVelocity.y=300;
    this.bobby.animations.add('runright', [0,1,2,3,4,5,6,7],null,true);
    this.bobby.animations.add('runleft', [8,9,10,11,12,13,14,15],null,true);
    this.bobby.animations.play('runright',null,true);
    this.game.camera.follow(this.bobby);
//crear enemigo
    this.createenemies();
},
spidermove:function(aaa){
if(aaa.hitpoints>=0){
    this.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, 200, aaa.body.velocity);
    this.time.events.add(Math.random()*2000+2000, this.spidermove,this,aaa);
}
},
enemyreset:function(enemy,wall){

    enemy.x=Math.random()*960*multipiso;
    enemy.y=Math.random()*960*multipiso;

},
createenemies:function(){
for (this.enemigo1; this.enemigo1<6*Math.pow(multipiso,2); this.enemigo1++)
{
        this.enemy=this.add.sprite(Math.random()*960*multipiso,Math.random()*960*multipiso,'enemigo');
        this.enemy.tint=0xFF0000;
        this.enemy.animations.add('runl', [3,2,1,0],6,true);
        this.enemy.animations.add('runr', [4,5,6,7],6,true);
        if(Math.random()>0.5){
            this.enemy.frame=4;
        }
        this.physics.arcade.enable(this.enemy);
    
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.bounce.set(0.8);
        this.enemy.anchor.set(0.5);
        this.enemy.body.drag.x=200;
        this.enemy.body.drag.y=200;
        this.enemy.hitpoints=200;
        this.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, 100,this.enemy.body.velocity);
        this.enemy.damagetimeout=0;

        this.time.events.add(Math.random()*2000+2000, this.spidermove,this,this.enemy);
        this.enemigouno.add(this.enemy);
}

for (this.enemigo2; this.enemigo2<4*Math.pow(multipiso,2); this.enemigo2++)
{
        this.enemy=this.add.sprite(Math.random()*960*multipiso,Math.random()*960*multipiso,'button');
        this.physics.arcade.enable(this.enemy);
        this.enemy.anchor.set(0.5);    
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.bounce.set(1);
        this.enemy.hitpoints=1;
        this.physics.arcade.velocityFromRotation(Math.floor((Math.random() * 4) + 1)*Math.PI/2+Math.PI/4, 125,this.enemy.body.velocity);
        this.enemy.damagetimeout=0;
        this.enemigodos.add(this.enemy);
}

},
update:function(){

//MANAGE ANIMATIONS
    this.bobby.animations.currentAnim.speed=Math.floor(Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2))/7);
    if(this.bobby.body.velocity.x>0&&this.bobby.animations.currentAnim.name!='runright'){
        this.bobby.animations.play('runright',null,true);
    }
    else if(this.bobby.body.velocity.x<0&&this.bobby.animations.currentAnim.name!='runleft'){
        this.bobby.animations.play('runleft',null,true);
    }


    this.enemigouno.forEach(function(item){
        if(item.body.velocity.x>1){
            item.animations.play('runr');
        }
        else if(item.body.velocity.x<-1){
            item.animations.play('runl');
        }
    },this);
//bobby timeout
    if (this.bobby.damagetimeout>0){
       this.bobby.damagetimeout-=1;
        }
    if (this.bobby.damagetimeout==0){
        this.bobby.alpha=1;
        this.bobby.tint=0xFFFFFF;
    }

//REVIVE ENEMIES
    this.enemigouno.forEach(function(item){
        if (item.damagetimeout>0){
            item.damagetimeout-=1;
        }
        if (item.damagetimeout==0){
            if (item.hitpoints<=0&&item.alive){
                for (this.orbrepeater; this.orbrepeater<4; this.orbrepeater++)
                    {
                    this.orb=this.add.sprite(item.x,item.y,'orb');
                    this.orb.anchor.set(0.5);
                    this.game.physics.arcade.enable(this.orb);
                    this.orb.body.drag.x=1500;
                    this.orb.body.drag.y=1500;
                    this.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, 250,this.orb.body.velocity);
                    this.orbgroup.add(this.orb);
                    }
                this.orbrepeater=0;
                item.destroy();
            }
            item.alpha=1;
            item.tint=0xFF0000;
        }
        if(item.x+32>this.camera.x&&item.y+32>this.camera.y&&item.x<this.camera.x+490&&item.y<this.camera.y+650){
            if(item.hitpoints>0){
//                item.exists=true;
                item.body.enable=true;

//                this.time.events.add(Math.random()*300+2000, this.spidermove,this,item);
            }
        }
        else{
//            item.exists=false;
            item.body.enable=false;
        }
    },this);

    this.enemigodos.forEach(function(item){
        if (item.damagetimeout>0){
            item.damagetimeout-=1;
        }
        if (item.damagetimeout==0){
            if (item.hitpoints<=0&&item.alive){
                for (this.orbrepeater; this.orbrepeater<2; this.orbrepeater++)
                    {
                    this.orb=this.add.sprite(item.x,item.y,'orb');
                    this.orb.anchor.set(0.5);
                    this.game.physics.arcade.enable(this.orb);
                    this.orb.body.drag.x=1500;
                    this.orb.body.drag.y=1500;
                    this.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, 250,this.orb.body.velocity);
                    this.orbgroup.add(this.orb);
                    }
                this.orbrepeater=0;
                item.destroy();
            }
            item.alpha=1;
            item.tint=0xFFFFFF;
        }
    },this);

//update bars
    this.staminabar.scale.set(this.stamina,1);
    this.healthbar.scale.set(this.playerhealth*20,1);
    this.stamina-=0.05;
//mouse movement
    if (this.input.activePointer.isDown){   
        this.bobby.body.drag.x=this.velofactor*100;
        this.bobby.body.drag.y=this.velofactor*100;
        this.bobby.body.velocity.y+=this.velofactor*5*(Math.sin(Math.atan2(this.input.activePointer.y+this.camera.y - this.bobby.y, this.input.activePointer.x+this.camera.x  - this.bobby.x )));
        this.bobby.body.velocity.x+=this.velofactor*5*(Math.cos(Math.atan2(this.input.activePointer.y+this.camera.y - this.bobby.y, this.input.activePointer.x+this.camera.x  - this.bobby.x )));

    }
    if (!this.input.activePointer.isDown){
        this.bobby.body.drag.x=200;
        this.bobby.body.drag.y=200;
    }

//cursors movement
    if (this.cursors.right.isDown&&!this.input.activePointer.isDown){
        this.bobby.body.velocity.x+=this.velofactor*5;
        this.bobby.body.drag.x=this.velofactor*100;
        this.bobby.body.drag.y=this.velofactor*100;
    }
    if (this.cursors.down.isDown&&!this.input.activePointer.isDown){
        this.bobby.body.velocity.y+=this.velofactor*5;
        this.bobby.body.drag.x=this.velofactor*100;
        this.bobby.body.drag.y=this.velofactor*100;
    }
    if (this.cursors.left.isDown&&!this.input.activePointer.isDown){
        this.bobby.body.velocity.x-=this.velofactor*5;
        this.bobby.body.drag.x=this.velofactor*100;
        this.bobby.body.drag.y=this.velofactor*100;
    }
    if (this.cursors.up.isDown&&!this.input.activePointer.isDown){
        this.bobby.body.velocity.y-=this.velofactor*5;
        this.bobby.body.drag.x=this.velofactor*100;
        this.bobby.body.drag.y=this.velofactor*100;
    }

//staminamanager
    if (this.stamina>100){
        this.stamina=100;
    }
    if (this.stamina<=0||this.playerhealth<=0){
        if(this.score>highscore){
            highscore=this.score;
            localStorage.setItem('bestscore', JSON.stringify(highscore));
        }
        this.audio3.play();
        this.audio.destroy();
        this.state.start('Gameover');
    }
//collision enemy
    this.game.physics.arcade.overlap(this.bobby, this.enemigouno, this.enemycollide, null, this);
    this.game.physics.arcade.overlap(this.bobby, this.enemigodos, this.enemycollide, null, this);
    this.game.physics.arcade.overlap(this.bobby, this.orbgroup, this.getorb, null, this);
//collision walls
    this.game.physics.arcade.collide(this.bobby, layer);
    this.game.physics.arcade.collide(this.enemigouno, layer);
//orbesbehaviour
    this.orbgroup.forEach(function(item) {
        item.body.velocity.y+=40*(Math.sin(Math.atan2(this.bobby.y+8 - item.y, this.bobby.x - item.x )));
        item.body.velocity.x+=40*(Math.cos(Math.atan2(this.bobby.y+8 - item.y, this.bobby.x - item.x )));
    },this);
//nublar estela
    this.grupoestela.forEach(function(item) {
        item.alpha-=0.05;
        if(item.alpha<0){
            item.destroy();
        }
    },this);
    
    this.grupoorbestela.forEach(function(item) {
        item.alpha-=0.05;
        item.scale.set(item.scale.x-0.05);
        if(item.alpha<0){
            item.destroy();
        }
    },this);    
    
    this.damagetext.forEach(function(item) {
        item.alpha-=0.01;
        item.y-=1;
        if(item.alpha<0){
            item.destroy();
        }
    },this);
//RESETEAR POSICION ENEMIGOS
    this.enemigouno.forEach(function(item) {
        if (mapa.getTile(Math.floor((item.x)/96),Math.floor(item.y/96))!=null){
            item.x=Math.random()*960*multipiso;
            item.y=Math.random()*960*multipiso;
        }
    },this);

},

render:function(){
//    this.game.debug.text(mapa.getTile(Math.floor(this.bobby.x/96),Math.floor(this.bobby.y/96)),16,16);
//    this.game.debug.inputInfo(16, 16);
//    this.game.debug.text('Velocidad'+Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2)),16,32);

},
crearestela:function(){
    if(Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2))>150){
        this.estela=this.add.image(this.bobby.x,this.bobby.y,'bobbo');
        this.estela.anchor.x=0.5;
        this.estela.anchor.y=0.75;
        this.estela.frame=this.bobby.frame;
        this.estela.tint=0xC71585;
        this.estela.alpha=0.75;
        this.grupoestela.add(this.estela);
    }
    this.orbgroup.forEach(function(item) {
        if(item.alive){
        this.orbestela=this.add.image(item.x,item.y,'orb');
        this.orbestela.anchor.set(0.5);
        this.grupoorbestela.add(this.orbestela);}
    },this);    
    
    this.time.events.add(3, this.crearestela, this);
},


enemycollide:function(bobby,enemy,bamash){
    bamash=Math.sqrt(Math.pow(this.bobby.body.velocity.x,2)+Math.pow(this.bobby.body.velocity.y,2));
    if(enemy.damagetimeout==0&&bamash>150){
        enemy.hitpoints-=(0.5 *bamash);
        this.audio2.play();
        this.game.physics.arcade.collide(this.bobby, enemy, null, null, this);
        enemy.damagetimeout=30;
        enemy.alpha=0.6;
        enemy.tint=0xFFFFFF;
        if(enemy.hitpoints<=0){
            if(this.stamina<75){
                this.stamina+=25;
            }
            else{
                this.stamina=100;
            }
            this.moneylabel.setText('Orbs: '+this.money);
        }
        this.displaybamash(Math.floor(0.5 *bamash),enemy.x,enemy.y);
        this.score+=Math.floor(0.5 *bamash);
        this.scorelabel.setText('Score: '+this.score);
    }
    else if (enemy.damagetimeout==0&&bobby.damagetimeout==0){
        this.playerhealth-=1;
        bobby.damagetimeout=50;
        bobby.alpha=0.6;
        bobby.tint=0xFF0000;
    }
    console.log(enemy.health);
},
getorb:function(a,b){
    this.money+=5;
    this.moneylabel.setText('Orbs: '+this.money);
    b.destroy();
},
damageenemy:function(bobby,enemy,bamash){

},
displaybamash:function(bamash,equis,ye){
    this.damagedisplay = this.game.add.text(equis, ye,bamash, { font: '16px Arial', fill: '#fff' });
    this.damagedisplay.anchor.set(0.5);
    this.damagetext.add(this.damagedisplay);
},
cambiarnoche:function(){
    this.dedia=!this.dedia;
    this.time.events.add(Phaser.Timer.SECOND * 120, this.cambiarnoche, this);
}

};
