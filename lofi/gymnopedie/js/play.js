//LOAD ALL SOUNDS

var idle = [0,0,0,0,
			1,1,1,2,
			0,0,0,0,
			1,1,1,2,
			0,0,0,0,
			1,1,1,1,
			1,1,1,2,
			0,0,0,0]



function getNote(octave, note){
	return octave * 12 + note
}

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

var pianoSounds = [];

for (var i = 1; i < 8; i++){
	for (var j = 0; j < 12; j++){
		pianoSounds[(i - 1) * 12 + j] = new Wad({
			source: './sound/piano/A' + i +'.wav',
			detune: 100 * j,
		})
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
	for (var i = 0; i < pianoSounds.length; i++){
		pianoSounds[i].stop();
	}
	i = randomBetween(0,1);
	noteAppear(getNote(0, array[i] + key));
	pianoSounds[getNote(0, array[i] + key)].volume = 0.3 + Math.seededRandom() * 0.2;
	setTimeout(function(){
		pianoSounds[getNote(0, array[i] + key)].play();
	}, Math.seededRandom() * 20)
}

function playChord(array){
	for (var i = 0; i < array.length - randomBetween(0,1); i++){
		noteAppear(getNote(2, array[i] + key));
		pianoSounds[getNote(2, array[i] + key)].volume = 0.3 + Math.seededRandom() * 0.1;
		pianoSounds[getNote(2, array[i] + key)].play();
	}
}

var melody = randomBetween(2,6);

var melodyChance = 0.5;

function playMelody(){
	var i = 6;
	if (idle[chord] == 0){
		i = 18;
	}

	if (Math.seededRandom() > 0.1 && chord > 3 && chord < 28){
		if (tonality === 1){
			noteAppear(getNote(3, major_scale[melody] + key - i + 6));
			pianoSounds[getNote(3, major_scale[melody] + key - i + 6)].volume = 1;
			pianoSounds[getNote(3, major_scale[melody] + key - i + 6)].play();
		}
		else{
			noteAppear(getNote(3, minor_scale[melody] + key - i + 6));
			pianoSounds[getNote(3, minor_scale[melody] + key - i + 6)].volume = 1;		
			pianoSounds[getNote(3, minor_scale[melody] + key - i + 6)].play();		
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

var timeInterval = Math.seededRandom() * 1000 + 3000;


setTimeout(function(){
	setInterval(function(){
		if (chord < chords_sequence.length - 1){
			setTimeout(function(){
				chord += 1;
//				console.log(chords_sequence[chord])
				playBass(chords_sequence[chord])
				playMelody();
				setTimeout(function(){
					playChord(chords_sequence[chord]);
					if (idle[chord] > 0){
						playMelody();
					}
				}, timeInterval / 3 - 50 + Math.seededRandom() * 100)
				setTimeout(function(){
					if (idle[chord] > 0){
						playMelody();
					}
				}, timeInterval / 3 * 2 - 50 + Math.seededRandom() * 100)
			}, Math.seededRandom() * 200)
		}
		if (chord === 15){
			if (Math.seededRandom() > 0 ){
				if (Math.seededRandom() > 0.5){
					key = (key + 5) % 12;
//					console.log('mod down')
				}
				else{
					key = (key + 7) % 12;
//					console.log('mod up')
				}
			}
		}
		if (chord == chords_sequence.length - 1){
			console.log('RESET')
			setInterval(function(){
				window.location.reload(false);
			}, 3000)
		}
	}, timeInterval)
}, 3000);