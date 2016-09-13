tempo = 120;

tempoToMs = function (t) {
   return 60000 / t;
}

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

kuso = function(game){};
kuso.prototype = {
  init:function() {
    this.turn = 0;

  },

  create: function(){
    this.game.stage.backgroundColor = "#66CC66"; //set the background color


    this.sound_1 = this.add.audio('sound_1');

    this.pattern = [];

    this.figure = this.add.sprite(0, 0, null);

    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.key1.onDown.add(this.screenTap, this);
    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.key2.onDown.add(this.screenTap, this);
    this.game.input.onDown.add(this.screenTap, this);

    this.quarter = this.game.time.create(false);
    this.quarter.loop(tempoToMs(tempo), function(){
      this.sound_1.play();
    },this);
    this.quarter.start();

    this.phrase = this.game.time.create(false);
    this.phrase.loop(tempoToMs(tempo) * 8, function(){
      this.sound_1.play();
      this.createPattern();
    },this);
    this.phrase.start();

    this.current_render = [];


    this.errors = 0;
    this.correct = 0;
  },

  createPattern: function(){
    this.current_pattern = [];
    this.current_render_pattern = [];
    for (var i = 0; i < 8; i++) {
      j = Math.random();
      if (j > 0.7) {
        this.current_pattern.push(i * tempoToMs(tempo));//negra
        this.current_render_pattern.push(0);
      }
      else if(j > 0.3) {
        this.current_pattern.push(i * tempoToMs(tempo), i * tempoToMs(tempo) + tempoToMs(tempo) * 0.5);//corcheas
        this.current_render_pattern.push(1);
      }
      else if(j < 0.3) {
        this.current_pattern.push(i * tempoToMs(tempo), i * tempoToMs(tempo) + tempoToMs(tempo) * 0.25, i * tempoToMs(tempo) + tempoToMs(tempo) * 0.5, i * tempoToMs(tempo) + tempoToMs(tempo) * 0.75);//semicorcheas
        this.current_render_pattern.push(2);
      }
    }
    console.log(this.current_pattern);
    console.log(this.current_render_pattern);
    this.renderPattern();
  },

  screenTap: function(){
    tap = tempoToMs(tempo) * 8 - this.phrase.duration;
    tapped = false;
    correct_note = false;
    this.current_pattern.forEach(function(item){
      if (tap > item - 30 && tap < item + 100 && tapped === false) {
        console.log('jex');
        console.log(tap);
        correct_note = true;
        this.correct += 1;
      }
    },this);
    if (!correct_note) {
      console.log('ño');
      this.errors += 1;
    }
  },

  renderPattern: function(){
    this.current_render.forEach(function(item){
      item.destroy();
    }, this);
    this.current_render = [];
    for (var i = 0; i < 8; i++) {
      this.current_render[i] = this.add.image(i * 100, 300, 'figures', this.current_render_pattern[i]);
    }
  },

  update: function(){

  },
  render: function(){
    this.game.debug.text(this.quarter.duration, 30, 60);
    this.game.debug.text(this.phrase.duration, 30, 90);
    this.game.debug.text('Err' + this.errors, 30, 120);
    this.game.debug.text('Corr' + this.correct, 30, 150);
/*    this.game.debug.text('Timestamp: ' + this.music.currentTime, 30, 30);
    this.game.debug.text('Beat: ' + (Math.floor(this.music.currentTime / 150) % 16 + 1), 30, 60);
    this.game.debug.text('errors' + this.errors, 30, 90);
    this.game.debug.text('Turn' + this.turn, 30, 120);*/
  }
};