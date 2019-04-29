
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


var key = Math.floor(Math.seededRandom() * 12 - 7);
var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function getNote(octave, note){
	return octave * 12 + note;
}