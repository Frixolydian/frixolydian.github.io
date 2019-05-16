var playing = false;


window.onclick = function(){
	if (playing == false){
		play();
	}
};

var noise = new Wad({source: './sound/noise/noise' + randomBetween(1,2) +'.ogg', detune: randomBetween(-100, 100), volume: 0.5})


keySamples = [];

keySamples['piano'] = [];
keySamples['fmsynth'] = [];

for (var i = 1; i < 8; i++){
	for (var j = 0; j < 12; j++){
		keySamples['piano'][(i - 1) * 12 + j] = new Wad({
			source: './sound/piano/A' + i +'.ogg',
			detune: 100 * j,
			Chorus : {
			    intensity: 0.2,  //0 to 1
			    rate: 4,         //0.001 to 8
			    stereoPhase: 0,  //0 to 180
			    bypass: 0
			}
		})
	}
}

for (var i = 1; i < 8; i++){
	for (var j = 0; j < 12; j++){
		keySamples['fmsynth'][(i - 1) * 12 + j] = new Wad({
			source: './sound/fmsynth/A' + (i + 1) +'.ogg',
			detune: 100 * j,
			Chorus : {
			    intensity: 0.2,  //0 to 1
			    rate: 4,         //0.001 to 8
			    stereoPhase: 0,  //0 to 180
			    bypass: 0
			}
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
var chordsKeys = false;
if (Math.seededRandom() > 0.3){
	chordsKeys = true;
}




totalSounds += 1;
var kickSound = new Wad({source: './sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav', volume: 0.6})

var snareSound = new Wad({source: './sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav', volume: 0.7})

var hihatSound = new Wad({source: './sound/drum/closedhat/closedhat_' + randomBetween(1,6) + '.wav', volume: 0.17})

var openhihatSound = new Wad({source: './sound/drum/openhat/openhat_1.wav', volume: 0.17})
