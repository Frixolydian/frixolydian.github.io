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


function playBass(array){
	i = randomBetween(0,1);
	pianoSounds[getNote(1, array[i] + key - 6)].volume(0.4 + Math.random() * 0.2);
	setTimeout(function(){
		pianoSounds[getNote(1, array[i] + key - 6)].play();
	}, Math.random() * 50)
}

function playChord(array){
	for (var i = 0; i < array.length; i++){
		pianoSounds[getNote(3, array[i] + key - 6)].volume(0.3 + Math.random() * 0.1);
		pianoSounds[getNote(3, array[i] + key - 6)].play();
	}
}

var melody = randomBetween(2,6);

function playMelody(){
	if (Math.random() > 0.1 && chord > 3 && chord < 28){
		if (tonality === 1){
			pianoSounds[getNote(4, major_scale[melody] + key - 6)].volume(1);
			setTimeout(function(){
				pianoSounds[getNote(4, major_scale[melody] + key - 6)].play();
			}, Math.random() * 50)
		}
		else{
			pianoSounds[getNote(4, minor_scale[melody] + key - 6)].volume(1);		
			setTimeout(function(){
				pianoSounds[getNote(4, minor_scale[melody] + key - 6)].play();		
			}, Math.random() * 50)
		}
		//next note
		if (Math.random() > 0.1){
			moveMelody();
		}
		else{
			jumpMelody();
		}
	}
}

function moveMelody(){
	if (Math.random() > 0.5){
		melody += 1;
		if (melody > 11){
			jumpMelody();
		}
	}
	else{
		melody -=1;
		if (melody < 0){
			jumpMelody();
		}
	}
}

function jumpMelody(){
	if (melody > 6){
		melody -= randomBetween(2, 5);
	}
	else{
		melody += randomBetween(2, 5);
	}
}

var chord = -1;

var timeInterval = Math.random() * 1000 + 4000;


setTimeout(function(){
	setInterval(function(){
		setTimeout(function(){
			chord += 1;
			console.log(chords_sequence[chord])
			playBass(chords_sequence[chord])
			playMelody();
			setTimeout(function(){
				playChord(chords_sequence[chord]);
				playMelody();
			}, timeInterval / 3 - 100 + Math.random() * 200)
			setTimeout(function(){
				playMelody();
			}, timeInterval / 3 * 2 - 100 + Math.random() * 200)
		}, Math.random() * 200)
	}, timeInterval)
}, 7000);