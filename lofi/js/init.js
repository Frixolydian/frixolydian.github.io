function iOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }
  return false;
}

var audioType = '.ogg';

if (iOS()){
    audioType = '.mp3';
}



var playing = false;
var loopSong = false;
var tempo = randomBetween(55, 85);
var step = 0;
var volume = 0;
var startFadeOut = false;
var playMelody = true;
var halfRhythm = 16;
var mixSpace = 1;


totalSounds = 0;
loadedSounds = 0;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

//initial seed
Math.seed = getQueryVariable('seed');
if (Math.seed == undefined){
	Math.seed = Math.floor(Math.random() * 1000000);
}

var seedNumber = Math.seed;


// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function randomFromArray(list){
  return list[Math.floor((Math.seededRandom()*list.length))];
}

function randomBetween(min,max){
    return Math.floor(Math.seededRandom()*(max-min+1)+min);
}

function randomElement(array) {
    return array[Math.floor(Math.seededRandom() * array.length)]
}

var key = randomBetween(0, 11) + 3;
var notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

function getNote(octave, note){
	return octave * 12 + note;
}

document.getElementById('seed').innerHTML = 'Seed: ' + seedNumber


console.log('AudioContext ' + Wad.audioContext.state + '.')
