//LOAD ALL SOUNDS

function getNote(octave, note){
	return octave * 12 + note
}

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

var pianoSounds = [];

for (var i = 1; i < 7; i++){
	for (var j = 0; j < 12; j++){
		pianoSounds.push(new Howl({
			src:['sound/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3']
		}));
	}
}

var colors = [0xfffd3a, 0xfffd3a, 0xfffd3a];
var selectedColor = colors[randomBetween(0,2)]

function noteAppear(note){
	gradients[Object.keys(gradients).length] = new PIXI.Sprite(PIXI.loader.resources["assets/gradient.png"].texture);
	gradients[Object.keys(gradients).length - 1].y = window.innerHeight - 560;
	gradients[Object.keys(gradients).length - 1].x = window.innerWidth / 85 * note;
	gradients[Object.keys(gradients).length - 1].tint = selectedColor;
	gradients[Object.keys(gradients).length - 1].alpha = 1.5;
	gradients[Object.keys(gradients).length - 1].blendMode = PIXI.BLEND_MODES.SCREEN;
	app.stage.addChild(gradients[Object.keys(gradients).length - 1]);
}

function playBass(array){
	i = randomBetween(0,1);
	noteAppear(getNote(1, array[i] + key - 6));
	pianoSounds[getNote(1, array[i] + key - 6)].volume(0.3 + Math.seededRandom() * 0.2);
	setTimeout(function(){
		pianoSounds[getNote(1, array[i] + key - 6)].play();
	}, Math.seededRandom() * 20)
}

function playChord(array){
	for (var i = 0; i < array.length - randomBetween(0,1); i++){
		noteAppear(getNote(3, array[i] + key - 6));
		pianoSounds[getNote(3, array[i] + key - 6)].volume(0.3 + Math.seededRandom() * 0.1);
		pianoSounds[getNote(3, array[i] + key - 6)].play();
	}
}

var melody = randomBetween(2,6);

var melodyChance = 0.5;

function playMelody(){
	if (Math.seededRandom() > 0.15 && chord > 3 && chord < 28){
		if (tonality === 1){
			noteAppear(getNote(4, major_scale[melody] + key - 6));
			pianoSounds[getNote(4, major_scale[melody] + key - 6)].volume(1);
			pianoSounds[getNote(4, major_scale[melody] + key - 6)].play();
		}
		else{
			noteAppear(getNote(4, minor_scale[melody] + key - 6));
			pianoSounds[getNote(4, minor_scale[melody] + key - 6)].volume(1);		
			pianoSounds[getNote(4, minor_scale[melody] + key - 6)].play();		
		}
		//next note
		if (Math.seededRandom() > 0.15){
			moveMelody();
		}
		else{
			jumpMelody();
		}
	}
}

//if melodychance is > 0.5 then it's more probable that it goes up again

function moveMelody(){
	if (Math.seededRandom() > melodyChance){
		melody += 1;
		melodyChance = 0.4;
		if (melody > 11){
			jumpMelody();
		}
	}
	else{
		melody -=1;
		melodyChance = 0.6;
		if (melody < 0){
			jumpMelody();
		}
	}
}

function jumpMelody(){
	melodyChance = 0.5;
	if (melody > 6){
		melody -= randomBetween(2, 5);
	}
	else{
		melody += randomBetween(2, 5);
	}
}

var chord = -1;

var timeInterval = Math.seededRandom() * 1500 + 2750;


setTimeout(function(){
	setInterval(function(){
		if (chord < 30){
			setTimeout(function(){
				chord += 1;
				console.log(chords_sequence[chord])
				playBass(chords_sequence[chord])
				playMelody();
				setTimeout(function(){
					playChord(chords_sequence[chord]);
					playMelody();
				}, timeInterval / 3 - 50 + Math.seededRandom() * 100)
				setTimeout(function(){
					playMelody();
				}, timeInterval / 3 * 2 - 50 + Math.seededRandom() * 100)
			}, Math.seededRandom() * 200)
		}
	}, timeInterval)
}, 3000);