var keyboard_sharp = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
var keyboard_flat = ['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab'];

var _chord = 5;
var _note = 2;

var dominant_chord = [1,2,2,2,3,null,4,5,6,6,7,null];

detectScaleDominantSeventh = function (chord, note) {
  if (note >= chord) {
    return dominant_chord[note - chord];
  }
  else {
    return dominant_chord[12 + note - chord];
  }
};

fourWayClose = function (chord, note) {
  var top = note;
  if (detectScaleDominantSeventh(chord, note) === 1 || detectScaleDominantSeventh(chord, note) === 2){
    var second = 10;
    var third = 7;
    var fourth = 4;
  }
  else if (detectScaleDominantSeventh(chord, note) === 3 || detectScaleDominantSeventh(chord, note) === 4){
    var second = 0;
    var third = 10;
    var fourth = 7;
  }
  else if (detectScaleDominantSeventh(chord, note) === 5 || detectScaleDominantSeventh(chord, note) === 6){
    var second = 4;
    var third = 0;
    var fourth = 10;
  }
  else if (detectScaleDominantSeventh(chord, note) === 7){
    var second = 7;
    var third = 4;
    var fourth = 0;
  }
//  console.log(second, third, fourth);
  return [keyboard_sharp[note], keyboard_sharp[(chord + second) % 12], keyboard_sharp[(chord + third) % 12], keyboard_sharp[(chord + fourth) % 12]];
};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

drops = function(game){};
drops.prototype = {
  init:function() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  },

  create:function(){
    this.game.stage.backgroundColor = "#00CC66"; //set the background color

    console.log(keyboard_sharp[_chord] + '7');
    console.log(fourWayClose(_chord, _note));

  },

  update:function(){

  },
  render:function(){
 
  }
};