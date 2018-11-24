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
			src:['sound/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3']
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
//7 = F#
//8 = G
//9 = Ab
//10 = A
//11 = Bb
//12 = B

var tonic = ['m1', 'n5', 'n10'];
var subdominant = ['n2', 'm6'];
var modal = ['n1', 'm2', 'm4', 'm9', 'm12', 'n6', 'n8', 'n12'];

var progression = [null, null, null, null, null, null, null, null];

//add strong beats
for (var i = 0; i < 4; i++){
	if (Math.seededRandom() > 0.3){
		progression[i * 2] = tonic[randomBetween(0, 2)];	//add tonic
	}
	else{
		progression[i * 2] = subdominant[randomBetween(0,1)];	//add subdominant
	}
}

//add weak beats
for (var i = 0; i < 4; i++){
	if (Math.seededRandom() > 0.4){
		progression[i * 2 + 1] = subdominant[randomBetween(0,1)];	//add subdominant
	}
	else if (Math.seededRandom() > 0.5){
		progression[i * 2 + 1] = modal[randomBetween(0, 7)]
	}
	else{
		if (Math.seededRandom > 0.4){
			progression[i * 2 + 1] = 'd' + ((Number(progression[(i * 2 + 2) % 8].substring(1,1)) + 7) % 12);
		}
		else{
			progression[i * 2 + 1] = 'd' + ((Number(progression[(i * 2 + 2) % 8].substring(1,1)) + 1) % 12);
		}
	}
}

console.log(progression)

function playBass(array){
	i = randomBetween(0,1);
	pianoSounds[getNote(1, array[i] + key - 6)].volume(0.3 + Math.seededRandom() * 0.2);
	setTimeout(function(){
		pianoSounds[getNote(1, array[i] + key - 6)].play();
	}, Math.seededRandom() * 20)
}

var maj = [0, 4, 7, 11, 2]; //9th optional :)
var min = [0, 3, 7, 10, 2, 5]; //9th optional :)
var dom = [0, 7, 10, 2, 5]; //someday ill get to extensions lol

function playChord(chord){
	var bass = Number(chord.substring(1,2));
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
		pianoSounds[getNote(3, tones[i] % 12 + bass + key - 6)].play();
	}
}

function chords(){
	if (step % 16 == 0){
		playChord(progression[(step / 16) % 8]);
		console.log(progression[(step / 16) % 8])
	}
}