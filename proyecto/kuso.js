tempoToMs = function (t) {
   return 60000 / t;
}

kuso = function(game){};
kuso.prototype = {
  init:function() {
    this.game.stage.backgroundColor = "#0000FF"; //set the background color

    this.metro_high = this.add.audio('metro_high');
    this.metro_low = this.add.audio('metro_low');
    this.tap_sound = this.add.audio('sound_1', 0.3);

    this.current_render = [];
    this.next_render = [];
    this.next_pattern = [];
    this.next_render_pattern = [];

    this.count = 1;

    this.errors = 0;
    this.correct = 0;
  },

  create: function(){
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.key1.onDown.add(this.screenTap, this);
    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.key2.onDown.add(this.screenTap, this);
    this.game.input.onDown.add(this.screenTap, this);

    this.metro_high.play();
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
      this.checkUntapped();
    },this);
    this.quarter.start();

    this.phrase = this.game.time.create(false);
    this.phrase.loop(tempoToMs(tempo) * 8, function(){
      this.checkUntapped();
      this.createPattern();
    },this);
    this.phrase.start();

    this.createPattern();
//texts
    this.errors_text = this.add.text(30, 60, 'Errors: 0');
    this.accurracy_text = this.add.text(30, 30, 'Accurracy: 100%');

//back
    this.back = this.add.text(590, 30, 'Back');
    this.back.inputEnabled = true;
    this.back.events.onInputDown.add(function(){
      this.game.state.start('Tempo_select');
    }, this);
  },

  createPattern: function(){
    this.current_pattern = this.next_pattern;
    this.current_render_pattern = this.next_render_pattern;

    this.next_pattern = [];
    this.next_render_pattern = [];

    for (var i = 0; i < 8; i++) {
      j = Math.random();
      if (j > 0.7) {
        this.next_pattern.push(i * tempoToMs(tempo));//negra
        this.next_render_pattern.push(0);
      }
      else if(j > 0.3) {
        this.next_pattern.push(i * tempoToMs(tempo), i * tempoToMs(tempo) + tempoToMs(tempo) * 0.5);//corcheas
        this.next_render_pattern.push(1);
      }
      else if(j > 0.1) {
        this.next_pattern.push(i * tempoToMs(tempo), i * tempoToMs(tempo) + tempoToMs(tempo) * 0.25, i * tempoToMs(tempo) + tempoToMs(tempo) * 0.5, i * tempoToMs(tempo) + tempoToMs(tempo) * 0.75);//semicorcheas
        this.next_render_pattern.push(2);
      }
      else if(j < 0.1) {
        this.next_pattern.push(i * tempoToMs(tempo), i * tempoToMs(tempo) + tempoToMs(tempo) * 0.75);//saltillo
        this.next_render_pattern.push(3);
      }
    }
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
        this.current_pattern.splice(this.current_pattern.indexOf(item), 1);
        tapped = true;
      }
    },this);
    if (!correct_note) {
      this.errors += 1;
      this.errors_text.text = 'Errors: ' + this.errors;
    }
    this.accurracy_text.text = 'Accurracy: ' + Math.round(this.correct / (this.correct + this.errors) * 100) + '%';
  },

  renderPattern: function(){
    this.current_render.forEach(function(item){
      item.destroy();
    }, this);
    this.current_render = [];
    for (var i = 0; i < 8; i++) {
      this.current_render[i] = this.add.image(100 + i * 75, 200, 'figures', this.current_render_pattern[i]);
      this.current_render[i].scale.set(0.75);
    }

    this.next_render.forEach(function(item){
      item.destroy();
    }, this);
    this.next_render = [];
    for (var i = 0; i < 8; i++) {
      this.next_render[i] = this.add.image(100 + i * 75, 300, 'figures', this.next_render_pattern[i]);
      this.next_render[i].scale.set(0.75);
    }
  },

  checkUntapped: function(){
    t = tempoToMs(tempo) * 8 - this.phrase.duration;
    this.current_pattern.forEach(function(item){
      if (t > item + tempoToMs(tempo) * 0.2) {
        correct_note = true;
        this.errors += 1;
        this.current_pattern.splice(this.current_pattern.indexOf(item), 1);
      }
    },this);
    this.errors_text.text = 'Errors: ' + this.errors;    
    this.accurracy_text.text = 'Accurracy: ' + Math.round(this.correct / (this.correct + this.errors) * 100) + '%';
  },

  update: function(){

  },
  render: function(){
/*    this.game.debug.text(this.quarter.duration, 30, 60);
    this.game.debug.text(this.phrase.duration, 30, 90);
    this.game.debug.text('Err' + this.errors, 30, 120);
    this.game.debug.text('Corr' + this.correct, 30, 150);*/
  }
};