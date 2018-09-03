Fury.Laberinto = function(game){};

Fury.Laberinto.prototype = {


  create: function(){

    this.back_0 = this.add.graphics(0, 0);
    this.back_0.beginFill(0xc2185b, 1);
    this.back_0.drawRect(0, 0, 512, 78);

    this.back_button = this.add.sprite(59, 30, 'home');
    this.back_button.inputEnabled = true
    this.back_button.events.onInputUp.add(function(){
      this.game.state.start('Menu');
    }, this);

    this.clockstyle = { font: "bold 36px Calibri", fill: "#fbc02d", boundsAlignH: "center", boundsAlignV: "middle" };

    this.clock = this.game.add.sprite(345, 38, 'clock'); 
    this.clockTimer = 0
    this.clocknumber = this.add.bitmapText(375, 31, 'gotham', clock(0));

    this.maze = [];

    this.mazeWidth = 25;
    this.mazeHeight = 35;
    this.tileSize = 19.7;
    if (!this.game.device.desktop){
      this.mazeWidth = 35;
      this.mazeHeight = 25;
      this.tileSize = 14.5;
    }

    this.mazeGraphics;
    this.bufferX = this.tileSize * 0.5;
    this.bufferY = 100;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.timer = 80;
    this.joystickX = 256;
    this.joystickY = 600;
    this.gameFinished = false;

    this.mazeGraphics = this.add.graphics(0, 0);
    this.moves = [];
    for(i = 0; i < this.mazeHeight; i ++){
      this.maze[i] = [];
      for(j = 0; j < this.mazeWidth; j ++){
        this.maze[i][j] = 1;
      }
    }
    this.posX = 1;
    this.posY = 1;
    this.maze[this.posX][this.posY] = 0; 
    this.moves.push(this.posY + this.posY * this.mazeWidth);
    while(this.moves.length){
      this.possibleDirections = "";
      if(this.posX+2 > 0 && this.posX + 2 < this.mazeHeight - 1 && this.maze[this.posX + 2][this.posY] == 1){
        this.possibleDirections += "S";
      }
      if(this.posX-2 > 0 && this.posX - 2 < this.mazeHeight - 1 && this.maze[this.posX - 2][this.posY] == 1){
        this.possibleDirections += "N";
      }
      if(this.posY-2 > 0 && this.posY - 2 < this.mazeWidth - 1 && this.maze[this.posX][this.posY - 2] == 1){
        this.possibleDirections += "W";
      }
      if(this.posY+2 > 0 && this.posY + 2 < this.mazeWidth - 1 && this.maze[this.posX][this.posY + 2] == 1){
        this.possibleDirections += "E";
      } 
      if(this.possibleDirections){
        this.move = this.game.rnd.between(0, this.possibleDirections.length - 1);
        switch (this.possibleDirections[this.move]){
          case "N": 
            this.maze[this.posX - 2][this.posY] = 0;
            this.maze[this.posX - 1][this.posY] = 0;
            this.posX -= 2;
            break;
          case "S":
            this.maze[this.posX + 2][this.posY] = 0;
            this.maze[this.posX + 1][this.posY] = 0;
            this.posX += 2;
            break;
          case "W":
            this.maze[this.posX][this.posY - 2] = 0;
            this.maze[this.posX][this.posY - 1] = 0;
            this.posY -= 2;
            break;
          case "E":
            this.maze[this.posX][this.posY + 2]=0;
            this.maze[this.posX][this.posY + 1]=0;
            this.posY += 2;
            break;
        }
        this.moves.push(this.posY + this.posX * this.mazeWidth);     
      }
      else{
        this.back = this.moves.pop();
        this.posX = Math.floor(this.back / this.mazeWidth);
        this.posY = this.back % this.mazeWidth;
      }
    this.drawMaze(this.posX, this.posY);
    }

    this.square = this.game.add.graphics(0, 0);
    this.square.beginFill(0xc2185b);
    this.square.drawCircle(this.tileSize / 2, this.tileSize / 2, this.tileSize);
    this.square.posX = this.mazeWidth - 2;
    this.square.posY = this.mazeHeight - 2;
    this.square.x = this.square.posX * this.tileSize + this.bufferX;
    this.square.y = this.square.posY * this.tileSize + this.bufferY;


    this.cursors = this.game.input.keyboard.createCursorKeys();

    if (!this.game.device.desktop){
     this.up_arrow = this.game.add.sprite(226, 505, 'arrow_u')
      this.up_arrow.pressed = false
      this.up_arrow.inputEnabled = true
      this.up_arrow.events.onInputOver.add(function(){this.up=true;}, this);
      this.up_arrow.events.onInputOut.add(function(){this.up=false;}, this);
      this.up_arrow.events.onInputDown.add(function(){this.up=true;}, this);
      this.up_arrow.events.onInputUp.add(function(){this.up=false;}, this);

      this.down_arrow = this.game.add.sprite(228, 601, 'arrow_d')
      this.down_arrow.inputEnabled = true
      this.down_arrow.events.onInputOver.add(function(){this.down=true;}, this);
      this.down_arrow.events.onInputOut.add(function(){this.down=false;}, this);
      this.down_arrow.events.onInputDown.add(function(){this.down=true;}, this);
      this.down_arrow.events.onInputUp.add(function(){this.down=false;}, this);

      this.left_arrow = this.game.add.sprite(164, 553, 'arrow_l')
      this.left_arrow.pressed = false
      this.left_arrow.inputEnabled = true
      this.left_arrow.events.onInputOver.add(function(){this.left=true;}, this);
      this.left_arrow.events.onInputOut.add(function(){this.left=false;}, this);
      this.left_arrow.events.onInputDown.add(function(){this.left=true;}, this);
      this.left_arrow.events.onInputUp.add(function(){this.left=false;}, this);

      this.right_arrow = this.game.add.sprite(288, 553, 'arrow_r')
      this.right_arrow.pressed = false
      this.right_arrow.inputEnabled = true
      this.right_arrow.events.onInputOver.add(function(){this.right=true;}, this);
      this.right_arrow.events.onInputOut.add(function(){this.right=false;}, this);
      this.right_arrow.events.onInputDown.add(function(){this.right=true;}, this);
      this.right_arrow.events.onInputUp.add(function(){this.right=false;}, this);

    }
    this.game.time.events.loop(100, this.movement, this);
    this.game.time.events.loop(Phaser.Timer.SECOND, this.clockText, this);



  },

  clockText:function(){
    if (!this.gameFinished){
      this.clockTimer += 1
      this.clocknumber.text = clock(this.clockTimer)
    }
  },


  update: function(){
/*    if (!this.game.device.desktop){
      if (this.joystick.pressed){
        if (this.game.input.x > this.joystick.x + 25){
          this.left = false
          this.right = true
          this.up = false
          this.down = false
        }
        else if (this.game.input.x < this.joystick.x - 25){
          this.left = true
          this.right = false
          this.up = false
          this.down = false
        }
        else if (this.game.input.y < this.joystick.y - 25){
          this.left = false
          this.right = false
          this.up = true
          this.down = false
        }
        else if (this.game.input.y > this.joystick.y + 25){
          this.left = false
          this.right = false
          this.up = false
          this.down = true
        }
      }
      else{
        this.left = false
        this.right = false
        this.up = false
        this.down = false        
      }
    }
*/

    if (this.cursors.left.isDown){
      this.left = true
      this.right = false
      this.up = false
      this.down = false
    }
    else if (this.cursors.right.isDown){
      this.left = false
      this.right = true
      this.up = false
      this.down = false
    }
    else if (this.cursors.down.isDown){
      this.left = false
      this.right = false
      this.up = false
      this.down = true
    }
    else if (this.cursors.up.isDown){
      this.left = false
      this.right = false
      this.up = true
      this.down = false
    }
    else{
      if (this.game.device.desktop){
        this.left = false
        this.right = false
        this.up = false
        this.down = false   
      }
    }

  },

  movement: function(){
    if (this.left){
      if (this.maze[this.square.posY][this.square.posX - 1] == 0){
        this.square.posX -= 1;
        this.game.add.tween(this.square).to( { x: this.square.posX * this.tileSize + this.bufferX }, this.timer, "Linear", true);
      }
    }
    else if (this.right){
      if (this.maze[this.square.posY][this.square.posX + 1] == 0){
        this.square.posX += 1;
        this.game.add.tween(this.square).to( { x: this.square.posX * this.tileSize + this.bufferX}, this.timer, "Linear", true);
      }
    }
    else if (this.down){
      if (this.maze[this.square.posY + 1][this.square.posX] == 0){
        this.square.posY += 1;
        this.game.add.tween(this.square).to( { y: this.square.posY * this.tileSize + this.bufferY}, this.timer, "Linear", true);
      }
    }
    else if (this.up){
      if (this.maze[this.square.posY - 1][this.square.posX] == 0){
        this.square.posY -= 1;
        this.game.add.tween(this.square).to( { y: this.square.posY * this.tileSize + this.bufferY}, this.timer, "Linear", true);
      }
    }
    if (this.square.posX == 1 && this.square.posY == 1 && !this.gameFinished){
      this.gameFinished = true;
      this.popupScore();
    }
  },


  drawMaze: function(posX, posY){
    this.mazeGraphics.clear();
    this.mazeGraphics.beginFill(0xfbc02d);
    for(i = 0; i < this.mazeHeight; i ++){
      for(j = 0; j < this.mazeWidth; j ++){
        if(this.maze[i][j] == 1 && (j != this.mazeWidth - 1 || this.mazeWidth % 2 == 1)){
          this.mazeGraphics.drawRect(j * this.tileSize + this.bufferX, i * this.tileSize + this.bufferY, Math.ceil(this.tileSize), Math.ceil(this.tileSize));
        }
      }
    }
    this.mazeGraphics.endFill();
    this.mazeGraphics.beginFill(0xff0000);
    this.mazeGraphics.drawRect(this.posY * this.tileSize + this.bufferX, this.posX * this.tileSize + this.bufferY, this.tileSize, this.tileSize);
    this.mazeGraphics.endFill();   
  },

  popupScore: function(){
  this.back_1 = this.game.add.graphics(0, 0);
  this.back_1.alpha = 0
  this.back_1.beginFill(0x000, 0.3);
  this.back_1.drawRect(0, 0, 512, 800);
  this.back_1.beginFill(0xFFFFFF, 1);
  this.back_1.drawRect(56, 144, 400, 457);
  this.back_1.beginFill(0xfbc02d, 1);
  this.back_1.drawRect(56, 144, 400, 134);
  this.back_1.anchor.x = 0.5;
  this.back_1.anchor.y = 0.5;

  this.texto = ''
  this.popup_text_1 = this.game.add.bitmapText(256, 150, 'catamaran', '¡BIEN!');
  this.popup_text_1.fontSize = 50;
  this.popup_text_1.anchor.x = 0.5;
  this.popup_text_1.alpha = 0;
  this.popup_text_1.tint = 0xc2185b;

  this.popup_text_2 = this.game.add.bitmapText(256, 225, 'catamaran', 'Completaste el laberinto con éxito.');
  this.popup_text_2.fontSize = 24;
  this.popup_text_2.anchor.x = 0.5;
  this.popup_text_2.alpha = 0;

  this.popup_text_3 = this.game.add.bitmapText(256, 290, 'catamaran', 'Tu puntuación:');
  this.popup_text_3.fontSize = 24;
  this.popup_text_3.anchor.x = 0.5;
  this.popup_text_3.alpha = 0;
  this.popup_text_3.tint = 0xc49000;

  this.star_1 = this.game.add.sprite(148, 390, 'star');
  this.star_1.anchor.x = 0.5;
  this.star_1.anchor.y = 0.5;
  this.star_1.scale.x = 2;
  this.star_1.scale.y = 2;
  this.star_1.alpha = 0
  this.star_2 = this.game.add.sprite(256, 390, 'star0');
  this.star_2.anchor.x = 0.5;
  this.star_2.anchor.y = 0.5;
  this.star_2.scale.x = 2;
  this.star_2.scale.y = 2;
  this.star_2.alpha = 0
  this.star_3 = this.game.add.sprite(364, 390, 'star0');
  this.star_3.anchor.x = 0.5;
  this.star_3.anchor.y = 0.5;
  this.star_3.scale.x = 2;
  this.star_3.scale.y = 2;
  this.star_3.alpha = 0
  if(this.clockTimer < 60){
    this.star_2.loadTexture('star');
    this.star_3.loadTexture('star');
    this.popup_text_1.text = '¡EXCELENTE!'
  }
  else if(this.clockTimer < 120){
    this.star_2.loadTexture('star');
    this.popup_text_1.text = '¡GENIAL!'
  }

  this.button_1 = this.game.add.graphics(0, 0);
  this.button_1.beginFill(0xc2185b, 1);
  this.button_1.drawRoundedRect(85, 487, 164, 78, 300);
  this.button_1.inputEnabled = true;
  this.button_1.events.onInputUp.add(function(){
    this.game.state.start('Menu');
  }, this);
  this.button_1.alpha = 0;
  this.buttontext_1 = this.game.add.bitmapText(167, 520, 'catamaran', 'Volver\nal inicio');
  this.buttontext_1.align = 'center';
  this.buttontext_1.fontSize = 20;
  this.buttontext_1.anchor.x = 0.5;
  this.buttontext_1.anchor.y = 0.5;
  this.buttontext_1.alpha = 0;

  this.button_2 = this.game.add.graphics(0, 0);
  this.button_2.beginFill(0xc2185b, 1);
  this.button_2.drawRoundedRect(275, 487, 164, 78, 300);
  this.button_2.inputEnabled = true;
  this.button_2.events.onInputUp.add(function(){
    this.game.state.restart();
  }, this);
  this.button_2.alpha = 0;
  this.buttontext_2 = this.game.add.bitmapText(357, 520, 'catamaran', 'Jugar\nde nuevo');
  this.buttontext_2.align = 'center';
  this.buttontext_2.fontSize = 20;
  this.buttontext_2.anchor.x = 0.5;
  this.buttontext_2.anchor.y = 0.5;
  this.buttontext_2.alpha = 0;


  this.game.add.tween(this.back_1).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.popup_text_1).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.popup_text_2).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.popup_text_3).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.button_1).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.button_2).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.buttontext_1).to( { alpha: 1 }, 500, "Linear", true, 0);
  this.game.add.tween(this.buttontext_2).to( { alpha: 1 }, 500, "Linear", true, 0);

  this.game.add.tween(this.star_1).to( { alpha: 1 }, 500, "Linear", true, 500);
  this.game.add.tween(this.star_2).to( { alpha: 1 }, 500, "Linear", true, 750);
  this.game.add.tween(this.star_3).to( { alpha: 1 }, 500, "Linear", true, 1000);
  this.game.add.tween(this.star_1.scale).to( { x: 1, y:1 }, 500, "Linear", true, 500);
  this.game.add.tween(this.star_2.scale).to( { x: 1, y:1 }, 500, "Linear", true, 750);
  this.game.add.tween(this.star_3.scale).to( { x: 1, y:1 }, 500, "Linear", true, 1000);


},


}




