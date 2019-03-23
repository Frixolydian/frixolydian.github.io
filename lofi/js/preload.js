//PRELOAD ALL SOUNDS

//preload noise
var noise = new Howl({src:['./sound/noise/noise' + randomBetween(1,2) + '.ogg'], volume: 0.2 + Math.seededRandom() * 0.1, loop:true})

//preload piano & keys
var pianoSounds = [];
for (var i = 1; i < 7; i++){
	for (var j = 0; j < 12; j++){
		pianoSounds.push(new Howl({
			src:['sound/piano/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3'],
			preload: true
		}));
	}
}

//check if keys are to be loaded or not
var melodyKeys = false;
if (Math.seededRandom() > 0.5){
	melodyKeys = true;
}
var chordsKeys = false;
if (Math.seededRandom() > 0.3){
	chordsKeys = true;
}

if(melodyKeys || chordsKeys){
	var keySounds = [];
	for (var i = 2; i < 7; i++){
		for (var j = 0; j < 12; j++){
			keySounds.push(new Howl({
				src:['sound/fmsynth/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3'],
				preload: true
			}));
		}
	}
}

//preload drums
var kickSound = new Howl({src:['./sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav'], volume: 0.6})
var snareSound = new Howl({src:['./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav'], volume: 0.7})
var hihatSound = new Howl({src:['./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav'], volume: 0.17})