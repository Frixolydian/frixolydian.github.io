document.getElementById('previousButton').onclick = function(){
    document.getElementById('previousButton').className = 'buttonOff';
    window.location.href = 'http://lofibot.com/?seed=' + (Number(seedNumber) - 1);
}

document.getElementById('nextButton').onclick = function(){
    document.getElementById('nextButton').className = 'buttonOff';
    window.location.href = 'http://lofibot.com/?seed=' + (Number(seedNumber) + 1);
}

document.getElementById('shuffleButton').onclick = function(){
    document.getElementById('shuffleButton').className = 'buttonOff';
    window.location.href = 'http://lofibot.com/?seed=' + Math.floor(Math.random() * 1000000);
}

document.getElementById('loopButton').onclick = function(){
    toggleLoop();
}

document.getElementById('loopButton').onclick = function(){
    toggleLoop();
}

document.getElementById('copyButton').onclick = function(){
   // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = 'http://lofibot.com/?seed=' + (Number(seedNumber));
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}


document.getElementById('info').style.visibility = 'hidden';

//info button
document.getElementById('infoButton').onclick = function(){
    if (document.getElementById('info').style.visibility == 'hidden'){
        document.getElementById('info').style.visibility = 'visible';
    }
    else{
        document.getElementById('info').style.visibility = 'hidden';
    }
}

//info button
document.getElementById('info').onclick = function(){
    document.getElementById('info').style.visibility = 'hidden';
}

var playing = false;
var loopSong = false;
var tempo = randomBetween(60, 85);
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

var key = randomBetween(0, 11) + 3;
var notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

function getNote(octave, note){
	return octave * 12 + note;
}

document.getElementById('seed').innerHTML = 'Seed: ' + seedNumber


console.log('AudioContext ' + Wad.audioContext.state + '.')

if (Wad.audioContext.state == 'running'){
    document.getElementById('tapToPlay').style.opacity = 0;
}