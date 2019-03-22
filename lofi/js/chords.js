//chords.js

//LOAD ALL SOUNDS

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function getNote(octave, note){
	return octave * 12 + note;
}

var pianoSounds = [];

for (var i = 1; i < 7; i++){
	for (var j = 0; j < 12; j++){
		pianoSounds.push(new Howl({
			src:['sound/piano/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3'],
			preload: true
		}));
	}
}

var keySounds = [];

for (var i = 2; i < 7; i++){
	for (var j = 0; j < 12; j++){
		keySounds.push(new Howl({
			src:['sound/fmsynth/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3'],
			preload: true
		}));
	}
}



//m = major
//n = minor
//d = dominant

//1 = C
//2 = Db
//3 = D
//4 = Eb
//5 = E
//6 = F
//7 = Gb
//8 = G
//9 = Ab
//10 = A
//11 = Bb
//12 = B

var tonic = ['m1', 'n5', 'n10'];
var subdominant = ['n3', 'm6'];
var modal = ['n1', 'm2', 'm4', 'm9', 'n6', 'n8', 'n12'];

var progression = [null, null, null, null, null, null, null, null];

function addStrong(i){
	if (Math.seededRandom() > 0.3){
		progression[i * 2] = tonic[randomBetween(0, 2)];	//add tonic
	}
	else{
		progression[i * 2] = subdominant[randomBetween(0,1)];	//add subdominant
	}
	//avoid repeat
	if (progression[i * 2] === progression[i * 2 - 2]){
		addStrong(i);
	}
}

function addWeak(i){
	if (Math.seededRandom() > 0.3){
		progression[i * 2 + 1] = subdominant[randomBetween(0,1)];	//add subdominant
	}
	else if (Math.seededRandom() > 0.8){
		progression[i * 2 + 1] = modal[randomBetween(0, 7)]	//add modal
	}
	else{	//add dominant
		if (Math.seededRandom() > 0.3){
			progression[i * 2 + 1] = 'd' + ((Number(progression[(i * 2 + 2) % 8].substring(1,3)) + 7) % 12);
		}
		else{
			progression[i * 2 + 1] = 'd' + ((Number(progression[(i * 2 + 2) % 8].substring(1,3)) + 1) % 12);
		}
	}
	//avoid repeat
	if (progression[i * 2 + 1] === progression[i * 2] || progression[i * 2 + 1] === progression[i * 2 + 2]){
		addWeak(i);
	}
}




//add strong beats
for (var i = 0; i < 4; i++){
	addStrong(i);
}

//add weak beats
for (var i = 0; i < 4; i++){
	addWeak(i);
}

var progressionLog = [];

function progLog(array){
	for (var i = 0; i < 8; i++){
		var j;
		var k;
		j = notes[(Number(progression[i].substring(1,3)) + key + 6) % 12];
		switch(progression[i].substring(0, 1)){
			case 'm':
				k = 'maj7';
				break;
			case 'n':
				k = 'm7';
				break;
			case 'd':
				k = '7';
				break;
		}
		progressionLog.push(j + k);
	}
	console.log(progressionLog);
}

progLog(progression)

function playBass(chord){
	var bass = Number(chord.substring(1,3));
	pianoSounds[getNote(1, (bass + key - 6) % 12)].volume(0.5);	
	pianoSounds[getNote(1, (bass + key - 6) % 12)].play();
}

var maj = [0, 4, 7, 11, 2]; //9th optional :)
var min = [0, 3, 7, 10]; //9th optional :)
var dom = [0, 7, 10, 2, 5]; //someday ill get to extensions lol

var chordsKeys = false;
if (Math.seededRandom() > 0.5){
	chordsKeys = true;
}

function playChord(chord){
	var bass = Number(chord.substring(1,3));
	var tones
	switch(chord.substring(0, 1)){
		case 'm':
			tones = maj;
			break;
		case 'n':
			tones = min;
			break;
		case 'd':
			tones = dom;
			break;
	}
	for (var i in tones){
		pianoSounds[getNote(3, (tones[i] + bass + key - 6) % 12)].volume(0.5);
		pianoSounds[getNote(3, (tones[i] + bass + key - 6) % 12)].play();
		if (chordsKeys){
			keySounds[getNote(3, (tones[i] + bass + key - 6) % 12)].volume(0.15);
			keySounds[getNote(3, (tones[i] + bass + key - 6) % 12)].play();
		}
	}
}


function chords(){
	if (step % 16 == 0){
		for (var i = 0; i < pianoSounds.length; i++){
			pianoSounds[i].stop();
		}
		playChord(progression[(step / 16) % 8]);
		playBass(progression[(step / 16) % 8]);
		text.text = progressionLog[(step / 16) % 8];
	}
}