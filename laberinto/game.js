var game;
var maze = [];
var mazeWidth = 28;
var mazeHeight = 28;
var tileSize = 18;
var mazeGraphics;
var bufferX = 0
var bufferY = 0
var left = false;
var right = false;
var up = false;
var down = false;
var timer = 80
var joystickX = 256
var joystickY = 600

window.onload = function() {
  game = new Phaser.Game(512, 800, Phaser.CANVAS, "");


  game.state.add("PlayGame",playGame);
  game.state.start("PlayGame");
}
	
var playGame = function(game){};

playGame.prototype = {

  preload: function() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.load.image('square', 'square.png');
    game.load.image('joystick', 'joystick.png');
  },

  create: function(){
    mazeGraphics = game.add.graphics(0, 0);
    var moves = [];
    for(var i = 0; i < mazeHeight; i ++){
      maze[i] = [];
      for(var j = 0; j < mazeWidth; j ++){
        maze[i][j] = 1;
      }
    }
    var posX = 1;
    var posY = 1;
    maze[posX][posY] = 0; 
    moves.push(posY + posY * mazeWidth);
    while(moves.length){
      var possibleDirections = "";
      if(posX+2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1){
        possibleDirections += "S";
      }
      if(posX-2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1){
        possibleDirections += "N";
      }
      if(posY-2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1){
        possibleDirections += "W";
      }
      if(posY+2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1){
        possibleDirections += "E";
      } 
      if(possibleDirections){
        var move = game.rnd.between(0, possibleDirections.length - 1);
        switch (possibleDirections[move]){
          case "N": 
            maze[posX - 2][posY] = 0;
            maze[posX - 1][posY] = 0;
            posX -= 2;
            break;
          case "S":
            maze[posX + 2][posY] = 0;
            maze[posX + 1][posY] = 0;
            posX += 2;
            break;
          case "W":
            maze[posX][posY - 2] = 0;
            maze[posX][posY - 1] = 0;
            posY -= 2;
            break;
          case "E":
            maze[posX][posY + 2]=0;
            maze[posX][posY + 1]=0;
            posY += 2;
            break;
        }
        moves.push(posY + posX * mazeWidth);     
      }
      else{
        var back = moves.pop();
        posX = Math.floor(back / mazeWidth);
        posY = back % mazeWidth;
      }
    drawMaze(posX, posY);
    }

  square = game.add.sprite(tileSize * (mazeWidth - 3), tileSize * (mazeHeight - 3), 'square');
  square.scale.x = tileSize / 8
  square.scale.y = tileSize / 8
  square.posX = mazeWidth - 3
  square.posY = mazeHeight - 3
  square.x = square.posX * tileSize;
  square.y = square.posY * tileSize;


  cursors = game.input.keyboard.createCursorKeys();

  if (!game.device.desktop){
    joystick = game.add.sprite(256, 600, 'joystick')
    joystick.anchor.x = 0.5
    joystick.anchor.y = 0.5
    joystick.scale.x = 3
    joystick.scale.y = 3
    joystick.pressed = false
    joystick.inputEnabled = true
    joystick.events.onInputOver.add(function(){joystick.pressed=true;});
    joystick.events.onInputOut.add(function(){joystick.pressed=false;});
    joystick.events.onInputDown.add(function(){joystick.pressed=true;});
    joystick.events.onInputUp.add(function(){joystick.pressed=false;});
  }
    game.time.events.loop(timer, this.move, this);


  },

  update: function(){
    if (!game.device.desktop){
      if (joystick.pressed){
        if (game.input.x > joystick.x + 25){
          left = false
          right = true
          up = false
          down = false
        }
        else if (game.input.x < joystick.x - 25){
          left = true
          right = false
          up = false
          down = false
        }
        else if (game.input.y < joystick.y - 25){
          left = false
          right = false
          up = true
          down = false
        }
        else if (game.input.y > joystick.y + 25){
          left = false
          right = false
          up = false
          down = true
        }
      }
      else{
        left = false
        right = false
        up = false
        down = false        
      }
    }


    if (cursors.left.isDown){
      left = true
      right = false
      up = false
      down = false
    }
    else if (cursors.right.isDown){
      left = false
      right = true
      up = false
      down = false
    }
    else if (cursors.down.isDown){
      left = false
      right = false
      up = false
      down = true
    }
    else if (cursors.up.isDown){
      left = false
      right = false
      up = true
      down = false
    }
    else{
      if (game.device.desktop){
        left = false
        right = false
        up = false
        down = false   
      }
    }

  },

  move:function(){
    if (left){
      if (maze[square.posY][square.posX - 1] == 0){
        square.posX -= 1
        game.add.tween(square).to( { x: square.posX * tileSize }, timer, "Linear", true);
      }
    }
    else if (right){
      if (maze[square.posY][square.posX + 1] == 0){
        square.posX += 1
        game.add.tween(square).to( { x: square.posX * tileSize }, timer, "Linear", true);
      }
    }
    else if (down){
      if (maze[square.posY + 1][square.posX] == 0){
        square.posY += 1
        game.add.tween(square).to( { y: square.posY * tileSize }, timer, "Linear", true);
      }
    }
    else if (up){
      if (maze[square.posY - 1][square.posX] == 0){
        square.posY -= 1
        game.add.tween(square).to( { y: square.posY * tileSize }, timer, "Linear", true);
      }
    }
  },

  render:function() {

    }

}



function drawMaze(posX, posY){
  mazeGraphics.clear();
  mazeGraphics.beginFill(0xcccccc);
  for(i = 0; i < mazeHeight; i ++){
    for(j = 0; j < mazeWidth; j ++){
      if(maze[i][j] == 1){
        mazeGraphics.drawRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
  }
  mazeGraphics.endFill();
  mazeGraphics.beginFill(0xff0000);
  mazeGraphics.drawRect(posY * tileSize, posX * tileSize, tileSize, tileSize);
  mazeGraphics.endFill();   
}
