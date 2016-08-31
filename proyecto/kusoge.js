tempo = 110;

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

kusoge = function(game){};
kusoge.prototype = {
  init:function() {
    this.turn = 0;

  },

  create: function(){
    this.game.stage.backgroundColor = "#00CC66"; //set the background color

    this.music = this.add.audio('track_1');
    this.music.addMarker('a', 0, 2.181);
    this.music.addMarker('b', 2.181, 2.181);
    this.music.play('a', null, 0.5, false, true);
    this.music.onStop.add(this.createNotation,this);

    this.sound_1 = this.add.audio('sound_1');

    this.pattern = [];

    this.figure = this.add.sprite(0, 0, null);

    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.key1.onDown.add(this.screenTap, this);
    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.key2.onDown.add(this.screenTap, this);
    this.game.input.onDown.add(this.screenTap, this);

    this.errors = 0;
  },

  createNotation: function(){
    this.notation = [];
    this.pattern = this.next_pattern;
    this.next_pattern = [];
    this.music.play('a', null, 0.5);

    if (this.turn === 0) {
      for (var i = 0; i < 4; i++){
        j = Math.random();
        if (j > 0.5){
          this.notation.push(0); //push negra
        }
        else if (j > 0.4){
          this.notation.push(1);//push corcheas
        }
        else if (j > 0.3){
          this.notation.push(2);//push corcheas
        }
        else if (j > 0.2){
          this.notation.push(3);//push corcheas
        }
        else if (j > 0.0){
          this.notation.push(4);//push corcheas
        }
      }
    }
    else {
      for (var i = 0; i < 4; i++){
        this.notation.push(100);
      }
    }
    this.createPattern();
    this.renderPattern();
  },

  createPattern: function(){
    this.next_pattern = [];

    if (this.turn === 0) {
      for (var i = 0; i < 4; i++) {
        if (this.notation[i] === 0){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(0);
          this.next_pattern.push(0);
        }
        else if(this.notation[i] === 1){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(1);
          this.next_pattern.push(0);
        }
        else if(this.notation[i] === 2){
          this.next_pattern.push(1);
          this.next_pattern.push(1);
          this.next_pattern.push(1);
          this.next_pattern.push(1);
        }
        else if(this.notation[i] === 3){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(0);
          this.next_pattern.push(1);
        }
        else if(this.notation[i] === 4){
          this.next_pattern.push(1);
          this.next_pattern.push(0);
          this.next_pattern.push(1);
          this.next_pattern.push(1);
        }
      }
    }
    else{
      for (var i = 0; i < 16; i++) {
        this.next_pattern.push(0);
      }
    }
  },

  screenTap: function(){
    if(this.pattern[Math.floor(this.music.currentTime / 136 - 50) % 16] === 0){
      console.log("non");
      this.errors ++;
    }
    else{
      this.sound_1.play();
    }
  },

  renderPattern: function(){

    if (this.next_pattern !== []) {
      for (var i = 0; i < 4; i++) {
        this.figure[i] = this.add.sprite(40 + i * 100, 250, 'figures', this.notation[i]);
        this.figure.addChildAt(this.figure[i], i);
        this.add.tween(this.figure.getChildAt(i)).to( { y: this.figure.getChildAt(i).y - 100 }, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
      }
    }
    if (this.pattern !== undefined && this.figure.children.length > 8){
      for (var i = 4; i < 8; i++) {
        this.add.tween(this.figure.getChildAt(i + 4)).to( {alpha: 0}, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
        this.add.tween(this.figure.getChildAt(i + 4)).to( {y: this.figure.getChildAt(i + 4).y - 100}, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
        this.add.tween(this.figure.getChildAt(i)).to( {y: this.figure.getChildAt(i).y - 100}, 250, Phaser.Easing.Exponential.Out, true, 0, 0, false);
      }
    }
    if (this.figure.children.length > 12){
      for (var i = 4; i < 8; i++) {
        this.figure.getChildAt(i + 4).destroy();
      }
    }
  },

  update: function(){

  },
  render: function(){
/*    this.game.debug.text('Timestamp: ' + this.music.currentTime, 30, 30);
    this.game.debug.text('Beat: ' + (Math.floor(this.music.currentTime / 150) % 16 + 1), 30, 60);
    this.game.debug.text('errors' + this.errors, 30, 90);
    this.game.debug.text('Turn' + this.turn, 30, 120);*/
  }
};