


Fury.Pupiletras = function(game){};

Fury.Pupiletras.prototype = {


create:function() {
  this.renderStyle = { font: "bold 22px Catamaran", fill: "#FFF", boundsAlignH: "center", boundsAlignV: "middle" };
  this.style = { font: "bold 25px Catamaran", fill: "#FFF", boundsAlignH: "center", boundsAlignV: "middle" };
  this.clockstyle = { font: "bold 36px Catamaran", fill: "#fbc02d", boundsAlignH: "center", boundsAlignV: "middle" };

  this.back_0 = this.add.graphics(0, 0);
  this.back_0.beginFill(0xc2185b, 1);
  this.back_0.drawRect(0, 0, 512, 78);
  this.back_0.beginFill(0xfbc02d, 1);
  this.back_0.drawRoundedRect(35, 94, 444, 537, 10);
  this.back_0.beginFill(0, 0);
  this.back_0.lineStyle(2, 0xfbc02d);
  this.back_0.drawRoundedRect(169, 652, 288, 101, 10);
  this.back_0.anchor.x = 0.5;
  this.back_0.anchor.y = 0.5;

  this.back_button = this.add.sprite(59, 30, 'home');
  this.back_button.inputEnabled = true
  this.back_button.events.onInputUp.add(function(){
    this.game.state.start('Menu');
  }, this);



  this.logo = this.game.add.sprite(59, 653, 'logo');
  this.clock = this.game.add.sprite(345, 38, 'clock'); 
  this.clockTimer = 0
  this.clocknumber = this.add.bitmapText(375, 31, 'gotham', clock(0));

  var seed = Date.now();
  this.random = new Phaser.RandomDataGenerator([seed]);
  this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


  this.tileGrid = [];


  this.rows = 11;
  this.columns = 9;
  this.lettersize = 45;

  this.bufferX = (512 - ((this.columns - 1) * this.lettersize)) * 0.5;
  this.bufferY = (512 - ((this.rows - 1) * this.lettersize)) * 0.5 + 107;

  this.columnDummy = []
  for (j = 0; j < this.rows; j++) {
    this.tileGrid.push(this.columnDummy);
    for (i = 0; i < this.columns; i++) {
      this.columnDummy.push(this.letters[this.random.integerInRange(0, this.letters.length - 1)]);
    } 
    this.columnDummy = []
  }


  this.wordList = [
//  'aaaaaaa'
  'FURYCAKE', 'JUEGOS', 'DISEÑO', 'MOVIL', 'APPS', 'WEB',
  ];

  this.numWords = this.wordList.length

  this.wordRender = []
  for (i = 0; i < this.wordList.length; i++){
    j = 204
    l = 14
    if (i % 2 == 1){
      j = 344
      l = 0
    }
    this.wordRender[i] = this.add.bitmapText(j, 673 + 14 * i + l - 14, 'catamaran', this.wordList[i]);
    this.wordRender[i].fontSize = 20
    this.wordRender[i].anchor.y = 0.5
    this.wordRender[i].tint = 0x000000
  }

  this.wordFound = [];
  this.wordPlaced = [];


  for (i = 0; i < this.wordList.length; i++){
    this.wordFound.push(false)
    this.wordPlaced.push(false)
  }


  this.words = [];

  this.boardUsed = [];


  for (l = 0; l < this.wordList.length; l++){

    while(this.wordPlaced[l] == false){
      switch(rand(1, 4)){
        case 1:
          this.createHorWord(rand(0, this.columns - this.wordList[l].length), rand(0, this.rows - 1), this.wordList[l], l);
          break;
        case 2:
          this.createVerWord(rand(0, this.columns - 1), rand(0, this.rows - this.wordList[l].length), this.wordList[l], l);
          break;
        case 3:
          this.createDiag1Word(rand(0, this.columns - this.wordList[l].length), rand(0, this.rows - this.wordList[l].length), this.wordList[l], l);
          break;
        case 4:
          this.createDiag2Word(rand(0, this.columns - this.wordList[l].length), rand(this.wordList[l].length, this.rows - 1), this.wordList[l], l);
          break;
      }
    }
  }


  //XSTART, XEND, WORD
//  this.createHorWord(0, 0, 'FURYCAKE')
//  this.createVerWord(7, 5, 'POTITO')
//  this.createVerWord(0, 3, 'POTOTE')
//  this.createDiag1Word(0, 1, 'EKISAK')
//  this.createDiag2Word(5, 5, 'JEJEJ')


//  this.boardWidth = this.tileGrid[0].length;
  this.boardHeight = this.tileGrid.length;


  for (i = 0; i < this.columns; i++){
    for (j = 0; j < this.rows; j++){
      this.createLetter(i, j, this.tileGrid[j][i]);
    }
  }

  this.clicking = false;


  bmd = this.game.add.bitmapData(600,600);
  var color = 'white';
  bmd.ctx.beginPath();
  bmd.ctx.lineWidth = "16";
  bmd.ctx.strokeStyle = "#c2185b";
  bmd.ctx.stroke();
  sprite = this.game.add.sprite(0, 0, bmd); 

  this.gameFinished = false

  this.game.time.events.loop(Phaser.Timer.SECOND, this.clockText, this);

},

clockText:function(){
  if (!this.gameFinished){
    this.clockTimer += 1
    this.clocknumber.text = clock(this.clockTimer)
  }
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

  this.popup_text_2 = this.game.add.bitmapText(256, 225, 'catamaran', 'Completaste el pupiletras con éxito.');
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

holding: function(){
  if (this.input.activePointer.isDown){
    if (this.clicking == false){
      this.startX = this.input.x
      this.startY = this.input.y
      this.tileX = Math.round((this.input.worldX - this.bufferX) / this.lettersize)
      this.tileY = Math.round((this.input.worldY - this.bufferY) / this.lettersize)
      this.clicking = true
    }
  

    bmd.clear();
    bmd.ctx.beginPath();
    bmd.ctx.beginPath();
    bmd.ctx.moveTo(this.startX, this.startY);
    bmd.ctx.lineTo(this.input.x , this.input.y);
    bmd.ctx.lineWidth = 6;
    bmd.ctx.stroke();
    bmd.ctx.closePath();
    bmd.render();
  }
  else{
    if (this.clicking){
      this.clicking = false
      bmd.clear();
      this.endX = Math.round((this.input.worldX - this.bufferX) / this.lettersize)
      this.endY = Math.round((this.input.worldY - this.bufferY) / this.lettersize)
      for (i = 0; i < this.words.length; i++){
        if (this.tileX == this.words[i][1] && this.tileY == this.words[i][2] && this.endX == this.words[i][3] && this.endY == this.words[i][4]) {
          if (!this.wordFound[i]){
            this.circleWord(i)
            this.wordFound[i] = true
            this.wordRender[i].tint = 0xc2185b
            this.tween = this.add.tween(this.wordRender[i].scale).to( {y: 2}, 200, "Cubic", true);
            this.tween.yoyo(true, 0)
            this.confettiToss(this.input.worldX, this.input.worldY)
            this.numWords -= 1
            if (this.numWords == 0){
              this.gameFinished = true
              this.popupScore()
            }
          }
        }
        else if (this.tileX == this.words[i][3] && this.tileY == this.words[i][4] && this.endX == this.words[i][1] && this.endY == this.words[i][2]) {
          if (!this.wordFound[i]){
            this.circleWord(i)
            this.wordFound[i] = true
            this.wordRender[i].tint = 0xc2185b
            this.confettiToss(this.input.worldX, this.input.worldY)
            this.numWords -= 1
            if (this.numWords == 0){
              this.gameFinished = true
              this.popupScore()
            }
          }
        }
      }
    }
  }
},

circleWord: function(index){
  this.width = Math.abs(this.words[index][1] - this.words[index][3]) + 1
  this.height = Math.abs(this.words[index][2] - this.words[index][4]) + 1
  this.middleX = (this.words[index][1] + this.words[index][3]) * 0.5
  this.middleY = (this.words[index][2] + this.words[index][4]) * 0.5

  if (this.height == 1){
    this.rect = this.add.graphics(this.middleX * this.lettersize + this.bufferX, this.middleY * this.lettersize + this.bufferY);
    this.rect.lineStyle(2, 0xc2185b);
    this.rect.drawRoundedRect(-this.width * 0.5 * this.lettersize, -this.height * 0.5 * this.lettersize + 3, this.width * this.lettersize, this.lettersize * 0.75, 300);
  }
  else if (this.width == 1){
    this.rect = this.add.graphics(this.middleX * this.lettersize + this.bufferX, this.middleY * this.lettersize + this.bufferY);
    this.rect.lineStyle(2, 0xc2185b);
    this.rect.drawRoundedRect(-this.width * 0.5 * this.lettersize + this.lettersize * 0.125, -this.height * 0.5 * this.lettersize + 3, this.lettersize * 0.75, this.height * this.lettersize, 300);
  }
  else if(this.words[index][2] < this.words[index][4]){
    this.rect = this.add.graphics(this.words[index][1] * this.lettersize + this.bufferX, this.words[index][2] * this.lettersize + this.bufferY - this.lettersize * 0.65 + 2);
    this.rect.lineStyle(2, 0xc2185b);
    this.rect.drawRoundedRect(0, 0, this.width * this.lettersize * root2 - this.lettersize * 0.5, this.lettersize * 0.75, 300);
    this.rect.rotation = Math.radians(45)
  }
  else if(this.words[index][2] > this.words[index][4]){
    this.rect = this.add.graphics(this.words[index][1] * this.lettersize + this.bufferX - this.lettersize * 0.5, this.words[index][2] * this.lettersize + this.bufferY - this.lettersize * 0.15 + 2);
    this.rect.lineStyle(2, 0xc2185b);
    this.rect.drawRoundedRect(0, 0, this.width * this.lettersize * root2 - this.lettersize * 0.5, this.lettersize * 0.75, 300);
    this.rect.rotation = Math.radians(-45)
  }

},



drag: function(){
  var graphics = this.add.graphics(100, 100);

    // set a fill and line style
  graphics.beginFill(0xFF3300);
  graphics.lineStyle(10, 0xffd900, 1);
    
    // draw a shape
  graphics.moveTo(50,50);
},


createLetter: function(_x, _y, letter){
  this.letter = this.game.add.bitmapText(_x * this.lettersize, _y * this.lettersize, 'catamaran', letter, 27);
  this.letter.x += this.bufferX;
  this.letter.y += this.bufferY;
  this.letter.anchor.x = 0.5;
  this.letter.anchor.y = 0.66;

//  this.letter = this.add.text(_x * this.lettersize, _y * this.lettersize, letter, this.style);
//  this.letter.setTextBounds(this.bufferX, this.bufferY, 0, 0);
  this.letter.tint = 0x000000
},

createHorWord: function(_x, _y, word, index){

  for (i = 0; i < word.length; i++){
    for (j = 0; j < this.boardUsed.length; j++){
      if (_y == this.boardUsed[j][0] && _x + i == this.boardUsed[j][1]){
        return false;
      }
    }
  }
  for (i = 0; i < word.length; i++){
    this.tileGrid[_y][_x + i] = word.substring(i, i + 1);
    this.boardUsed.push([_y, _x + i]);
  }
  this.words.push([word, _x, _y, _x + word.length - 1, _y]);
  this.wordPlaced[index] = true;
  return true

},
  
createVerWord: function(_x, _y, word, index){
  if(Math.random() > 0.7){
    word = reverse(word)
  }

  for (i = 0; i < word.length; i++){
    for (j = 0; j < this.boardUsed.length; j++){
      if (_y + i == this.boardUsed[j][0] && _x == this.boardUsed[j][1]){
        return false;
      }
    }
  }

  for (i = 0; i < word.length; i++){
    this.tileGrid[_y + i][_x] = word.substring(i, i + 1);
    this.boardUsed.push([_y + i, _x]);
  }
  this.words.push([word, _x, _y, _x, _y + word.length - 1]);
  this.wordPlaced[index] = true;
  return true
},

createDiag1Word: function(_x, _y, word, index){ //uptodown lefttoright
  if(Math.random() > 0.7){
    word = reverse(word)
  }

  for (i = 0; i < word.length; i++){
    for (j = 0; j < this.boardUsed.length; j++){
      if (_y + i == this.boardUsed[j][0] && _x + i == this.boardUsed[j][1]){
        return false;
      }
    }
  }

  for (i = 0; i < word.length; i++){
    this.tileGrid[_y + i][_x + i] = word.substring(i, i + 1);
    this.boardUsed.push([_y + i, _x + i]);
  }
  this.words.push([word, _x, _y, _x + word.length - 1, _y + word.length - 1]);
  this.wordPlaced[index] = true;
  return true
},

createDiag2Word: function(_x, _y, word, index){ //downtoup lefttoright
  if(Math.random() > 0.7){
    word = reverse(word)
  }

  for (i = 0; i < word.length; i++){
    for (j = 0; j < this.boardUsed.length; j++){
      if (_y - i == this.boardUsed[j][0] && _x + i == this.boardUsed[j][1]){
        return false;
      }
    }
  }

  for (i = 0; i < word.length; i++){
    this.tileGrid[_y - i][_x + i] = word.substring(i, i + 1);
    this.boardUsed.push([_y - i, _x + i]);
  }
  this.words.push([word, _x, _y, _x + word.length - 1, _y - word.length + 1]);
  this.wordPlaced[index] = true;
  return true;
},




confettiToss: function(_x, _y){
  for (i = 0; i < 30; i++){
    this.circ = this.add.graphics(_x, _y);
    this.circ.beginFill(0xc2185b, 1);
    j = Math.random ();
    if (j > 0.6){
      this.circ.beginFill(0xc49000, 1);
    }
    else if (j > 0.3){
      this.circ.beginFill(0xffffff, 1);
    }
    this.circ.drawRect(0, 0, 7, 7);
    this.circ.rotation = Math.random() * 360
    this.tween = this.add.tween(this.circ).to( {y: this.circ.y + Math.random() * 200 - 100, x: this.circ.x + Math.random() * 200 - 100, alpha: 0}, 2000, "Cubic", true);
  }
},


update:function() {
  this.holding();
},



render:function(){
//    this.game.debug.text("X: " + Math.round((this.input.worldX - this.bufferX) / this.lettersize), 32, 32);
//    this.game.debug.text("Y: " + Math.round((this.input.worldY - this.bufferY) / this.lettersize), 32, 64);
//    this.game.debug.text("X: " + this.input.worldX, 32, 90);
//    this.game.debug.text("Y: " + this.input.worldY, 32, 110);
}

};