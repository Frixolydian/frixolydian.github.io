//melody.js


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

//var tonic = ['m1', 'n5', 'n10'];
//var subdominant = ['n3', 'm6'];
//var modal = ['n1', 'm2', 'm4', 'm9', 'n6', 'n8', 'n12'];
var scales = [];

scales['m1'] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
scales['n5'] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
scales['n10'] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
scales['n3'] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
scales['m6'] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
scales['n1'] = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];
scales['m2'] = [0,1,3,5,7,9,11,12,14,16,17,19,21,23,24];
scales['m4'] = [0,2,3,5,7,9,10,12,14,15,17,19,21,22,24];
scales['m9'] = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];
scales['n6'] = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];
scales['n8'] = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];
scales['n12'] = [0,2,4,6,7,9,11,12,14,16,18,19,21,23,24];

//all fucking dominant scales yay i accept defeat
scales['d0'] = [1,3,4,6,8,9,11,13,15,16,18,20,21,23,25];
scales['d1'] = [0,2,4,5,7,9,10,12,14,16,17,19,21,22,24];
scales['d2'] = [1,3,5,6,8,10,11,13,15,17,18,20,22,23,25];
scales['d3'] = [0,2,4,6,7,9,11,12,14,16,18,19,21,23,24];
scales['d4'] = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];
scales['d5'] = [1,2,4,6,8,9,11,13,14,16,18,20,21,23,25];
scales['d6'] = [0,2,3,5,7,9,10,12,14,15,17,19,21,22,24];
scales['d7'] = [1,3,4,6,8,10,11,13,15,16,18,20,22,23,25];
scales['d8'] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
scales['d9'] = [0,1,3,5,7,8,10,12,13,15,17,19,20,22,24];
scales['d10'] = [1,2,4,6,7,9,11,13,14,16,18,19,21,23,24];
scales['d11'] = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];
scales['d12'] = [1,3,4,6,8,9,11,13,15,16,18,20,21,23,25];


var mel = 7;

var melodyRhythm =	[0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0];

console.log(melodyRhythm.length)



function createMelodyRhythm(){
	melodyRhythm =	[0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0];
	var repeatGap = randomBetween(1,9);
	var melodyStep = -1;
	while (melodyStep < 32){
		if (Math.seededRandom() > 0.5){
			repeatGap = randomBetween(1,5);
			melodyStep += repeatGap;
		}
		else{
			melodyStep += repeatGap;
		}
		if (Math.seededRandom() > 0.85){
			melodyStep += randomBetween(6,12);
		}
		melodyRhythm[melodyStep] = 1;
	}
	console.log(melodyRhythm)
}
createMelodyRhythm();





function moveMelody(){
	//jump melody
	if (Math.seededRandom() < 0.3){
		if (Math.seededRandom() < 0.5){
			mel = mel + randomBetween(2,7);
		}
		else{
			mel = mel - randomBetween(2,7);
		}
	}

	//move melody
	else{
		if (Math.seededRandom() < 0.5){
			mel += 1;
		}
		else{
			mel -= 1;

		}
	}
	if (mel > 14){
		mel -= 7;
	}
	if (mel < 0){
		mel += 7;
	}
}





function melody(){
//	if (step % 1 == 0 && Math.seededRandom() < 0.12 + randomBetween(1,20) * 0.01){
	if (melodyRhythm[step % 32] == 1){
		moveMelody();
		var i = (progression[(Math.floor(step / 16)) % 8])
		var k = scales[i][mel]
		pianoSounds[getNote(4, (k + key - 5))].volume(0.9);
		pianoSounds[getNote(4, (k + key) - 5)].play();
		if (melodyKeys){
			keySounds[getNote(3, (k + key - 5))].volume(0.2);
			keySounds[getNote(3, (k + key) - 5)].play();
		}
		catMelody(mel);
	}
	if(step % 64 == 0){
		createMelodyRhythm();
	}
}