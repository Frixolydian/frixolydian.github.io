var filter_1 = [
	{type : 'lowpass', frequency : randomBetween(1500, 2500), q : 2},
	{type : 'highpass', frequency : randomBetween(500, 800), q : 2},
]

var filter_2 = [
	{type : 'lowpass', frequency : 1500, q : 4},
	{type : 'highpass', frequency : 500, q : 4}
]

var noise = new Wad({
	source: './sound/noise/noise_' + randomBetween(1,3) + audioType,
	volume: 0.2
})

var intro = new Wad({
	source: './sound/intro/intro_' + randomBetween(1,3) + audioType,
	volume: 0.7
})

var loadSpeech = false;
if (Math.seededRandom() > 0){
	loadSpeech = true;
	var speech = new Wad({
		source: './sound/speech/speech_' + randomBetween(1,15) + audioType,
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
			source: './sound/piano/A' + i + audioType,
			detune: 100 * j,
			filter: [
				{type : 'lowpass', frequency : 1500, q : 2},
				{type : 'highpass', frequency : 500, q : 1}
			]
		})
	}
}

for (var i = 1; i < 7; i++){
	for (var j = 0; j < 12; j++){
		keySamples['fmsynth'][(i - 1) * 12 + j] = new Wad({
			source: './sound/fmsynth/A' + (i + 1) + audioType,
			detune: 100 * j,
			filter: [
				{type : 'lowpass', frequency : 1500, q : 3},
				{type : 'highpass', frequency : 1000, q : 3}
			]
		})
	}
}

for (var i = 2; i < 7; i++){
	for (var j = 0; j < 12; j++){
		keySamples['nylon'][(i - 2) * 12 + j] = new Wad({
			source: './sound/nylon/A' + i + audioType,
			detune: 100 * j,
			filter: [
				{type : 'lowpass', frequency : 1500, q : 3},
				{type : 'highpass', frequency : 1000, q : 3}
			]
		})
	}
}

for (var i = 1; i < 6; i++){
	for (var j = 0; j < 12; j++){
		keySamples['rhodes'][(i - 2) * 12 + j] = new Wad({
			source: './sound/rhodes/A' + i + audioType,
			detune: 100 * j,
		})
	}
}


function playNote(octave, note, instrument, volume = 1){
    keySamples[instrument][octave * 12 + note].play({volume:volume});
}

//check if keys are to be loaded or not
var melodyKeys = false;
var chordsPiano = false;
var chordsKeys = false;
var useArpeggio = false;

if (Math.seededRandom() > 0.5){
	melodyKeys = true;
}

if (Math.seededRandom() > 0.2){
	chordsPiano = true;
}

if (Math.seededRandom() > 0.5 && chordsPiano == true){
	chordsKeys = true;
}

if (Math.seededRandom() > 0.7 || chordsPiano == false){
	useArpeggio = true;
}


totalSounds += 1;
var kickSound = new Wad({
	source: './sound/drum/kick/kick_' + randomBetween(1, 12) + audioType,
	volume: 0.6,
	filter: [
		{type : 'lowpass', frequency : randomBetween(1500, 2500), q : 2},

	],
})

var snareSound = new Wad({
	source: './sound/drum/snare/snare_' + randomBetween(1, 19) + audioType,
	volume: 0.7,
	filter: filter_2
})

var hihatSound = new Wad({
	source: './sound/drum/closedhat/closedhat_' + randomBetween(1,6) + audioType,
	volume: 0.17,
	filter: [
		{type : 'lowpass', frequency : randomBetween(4000, 5000), q : 1},
	],
})

var openhatSound = new Wad({
	source: './sound/drum/openhat/openhat_1' + audioType,
	volume: 0.17
})

var snapSound = new Wad({
	source: './sound/drum/snap/snap_' + randomBetween(1,4) + audioType,
	volume: 0.2
})

var snareFoley = new Wad({
	source: './sound/drum/foley/foley_snare_' + randomBetween(3,3) + audioType,
	sprite: {
		[0]: [0,0.9],
		[1]: [1,1.9],
		[2]: [2,2.9],
		[3]: [3,3.9],
	}
})

var kickFoley = new Wad({
	source: './sound/drum/foley/foley_kick_' + randomBetween(1,1) + audioType,
	sprite: {
		[0]: [0,0.9],
		[1]: [1,1.9],
		[2]: [2,2.9],
		[3]: [3,3.9],
	}
})

var openhatFoley = new Wad({
	source: './sound/drum/foley/foley_openhat_' + randomBetween(1,1) + audioType,
	sprite: {
		[0]: [0,0.9],
		[1]: [1,1.9],
		[2]: [2,2.9],
		[3]: [3,3.9],
	}
})