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
		j = notes[(Number(progression[i].substring(1,3)) + key) % 12];
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
	playNote(1, (bass + key) % 12, 'piano', 0.5);
}

var maj = [0, 4, 7, 11, 14]; //9th optional :)
var min = [0, 3, 7, 10, 12]; //9th optional :)
var dom = [0, 5, 7, 10, 14]; //someday ill get to extensions lol

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
	for (var i = 0; i < 5; i++){
		if (chordsPiano == true){
			playNote(1, tones[i] + bass + key, 'piano', 0.7);
		}
		if (chordsKeys == true){
			playNote(0, tones[i] + bass + key, 'fmsynth', 0.3);
		}
	}
}

if (halfRhythm == 32){
	useArpeggio = true;
}

var arpeggios = [[0,1,2,3],
				[0,2,1,4],
				[0,1,3,2],
				[0,3,2,1],
				[0,2,4,1],
				[0,1,0,2],
]

var currentArp = arpeggios[randomBetween(0, arpeggios.length - 1)];

function arpeggio(chord){
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
	var arp = (step % 8) / 2;
	playNote(0, tones[currentArp[arp]] + bass + key, 'nylon', 0.3);
}


function chords(){
	if (step % halfRhythm == 0){
		playChord(progression[(step / halfRhythm) % 8]);
		playBass(progression[(step / halfRhythm) % 8]);
	}
	if (step % 8 == 0){
		currentArp = arpeggios[randomBetween(0, arpeggios.length - 1)];
	}
	if (step % 2 == 0 && useArpeggio){
		arpeggio(progression[(Math.floor(step / halfRhythm)) % 8]);
	}
}