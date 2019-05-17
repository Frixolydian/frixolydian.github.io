var playing = false;


window.onclick = function(){
	if (playing == false){
		play();
	}
};

var noise = new Wad({
	source: './sound/noise/noise_' + randomBetween(1,3) +'.ogg',
	volume: 0.2
})

var loadSpeech = false;
if (Math.seededRandom() > 0){
	loadSpeech = true;
	var speech = new Wad({
		source: './sound/speech/speech_' + randomBetween(7,7) +'.ogg',
		detune: randomBetween(-100, 100), volume: 1,
		filter: [
			{type : 'lowpass', frequency : 1500, q : 3},
			{type : 'highpass', frequency : 1000, q : 3}
		]
	})
}


keySamples = [];

keySamples['piano'] = [];
keySamples['fmsynth'] = [];
keySamples['nylon'] = [];
keySamples['rhodes'] = [];

for (var i = 1; i < 8; i++){
	for (var j = 0; j < 12; j++){
		keySamples['piano'][(i - 1) * 12 + j] = new Wad({
			source: './sound/piano/A' + i +'.ogg',
			detune: 100 * j,
			filter: [
				{type : 'lowpass', frequency : 1500, q : 1},
				{type : 'highpass', frequency : 500, q : 1}
			]
		})
	}
}

for (var i = 1; i < 7; i++){
	for (var j = 0; j < 12; j++){
		keySamples['fmsynth'][(i - 1) * 12 + j] = new Wad({
			source: './sound/fmsynth/A' + (i + 1) +'.ogg',
			detune: 100 * j,
			filter: [
				{type : 'lowpass', frequency : 1500, q : 3},
				{type : 'highpass', frequency : 1000, q : 3}
			]
		})
	}
}

for (var i = 2; i < 6; i++){
	for (var j = 0; j < 12; j++){
		keySamples['nylon'][(i - 2) * 12 + j] = new Wad({
			source: './sound/nylon/A' + i +'.ogg',
			detune: 100 * j,
		})
	}
}

for (var i = 1; i < 6; i++){
	for (var j = 0; j < 12; j++){
		keySamples['rhodes'][(i - 2) * 12 + j] = new Wad({
			source: './sound/rhodes/A' + i +'.ogg',
			detune: 100 * j,
		})
	}
}


function playNote(octave, note, instrument, volume = 1){
    keySamples[instrument][octave * 12 + note].play({volume:volume});
}

//check if keys are to be loaded or not
var melodyKeys = false;
if (Math.seededRandom() > 0.5){
	melodyKeys = true;
}
var chordsPiano = false;
if (Math.seededRandom() > 0.5){
	chordsPiano = true;
}

var chordsKeys = false;
if (Math.seededRandom() > 0.5 || chordsPiano == false){
	chordsKeys = true;
}




totalSounds += 1;
var kickSound = new Wad({
	source: './sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav',
	volume: 0.6,
})

var snareSound = new Wad({
	source: './sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav',
	volume: 0.7,
})

var hihatSound = new Wad({source: './sound/drum/closedhat/closedhat_' + randomBetween(1,6) + '.wav', volume: 0.17})

var openhihatSound = new Wad({source: './sound/drum/openhat/openhat_1.wav', volume: 0.17})
