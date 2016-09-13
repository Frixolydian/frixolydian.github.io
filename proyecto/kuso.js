tempo = 120;

tempoToMs = function (t) {
   return 60000 / t;
}

kuso = function(game){};
kuso.prototype = {
  init:function() {
    this.metro_high = this.add.audio('metro_high');
    this.metro_low = this.add.audio('metro_low');
    this.tap_sound = this.add.audio('sound_1', 0.3);
  },

  create: function(){
    this.game.stage.backgroundColor = "#0000FF"; //set the background color

    this.pattern = [];

    this.figure = this.add.sprite(0, 0, null);

    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.key1.onDown.add(this.screenTap, this);
    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.key2.onDown.add(this.screenTap, this);
    this.game.input.onDown.add(this.screenTap, this);

    this.count = 1;

    this.quarter = this.game.time.create(false);
    this.quarter.loop(tempoToMs(tempo), function(){
      if (this.count === 0) {
        this.metro_high.play();
      }
      else {
        this.metro_low.play();
      }
      this.count += 1
      if (this.count === 4) {
        this.count = 0;
      }
    },this);
    this.quarter.start();

    this.phrase = this.game.time.create(false);
    this.phrase.loop(tempoToMs(tempo) * 8, function(){
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
      if (tap > item - tempoToMs(tempo) * 0.1 && tap < item + tempoToMs(tempo) * 0.2 && tapped === false) {
        this.tap_sound.play();
        correct_note = true;
        this.correct += 1;
//        this.current_pattern.splice(this.current_pattern.indexOf(tap), 1);
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
      this.current_render[i] = this.add.image(100 + i * 75, 300, 'figures', this.current_render_pattern[i]);
      this.current_render[i].scale.set(0.75);
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