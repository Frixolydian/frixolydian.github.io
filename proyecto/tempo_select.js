tempo = 100;

tempoToMs = function (t) {
   return 60000 / t;
}

tempo_select = function(game){};
tempo_select.prototype = {
  init:function() {
  },

  create: function(){
    this.game.stage.backgroundColor = "#5555FF"; //set the background color
    this.tempo_indicator = this.add.text(150, 150, 'Tempo ' + tempo);
    this.game.input.onUp.add(function(){
      if (this.game.input.x > 360) {
        tempo += 1;
      }
      else {
        tempo -=1;
      }
      this.tempo_indicator.text = 'Tempo ' + tempo;
    }, this);

    this.start = this.add.text(400, 300, 'Start');
    this.start.inputEnabled = true;
    this.start.events.onInputDown.add(function(){
      this.game.state.start('Kuso');
    }, this);

  },

  update: function(){

  },

};