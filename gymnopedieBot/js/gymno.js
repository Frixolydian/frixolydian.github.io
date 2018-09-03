function randomFromArray(list){
  return list[Math.floor((Math.random()*list.length))];
}

function randomBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


var key = Math.floor(Math.random() * 12);

var major_scale = [-3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 14, 16];
var minor_scale = [-4, -2, 0, 2, 3, 5, 7, 8, 10, 12, 14, 15];

var tonality = Math.round(Math.random()); //minor 0, major 1
console.log(key, tonality)

//ZERO EQUALS TO ROOT IN KEY

var min_ton = [[0, 3, 7, 10], [5, 8, 0, 3], [7, 10, 2, 5]]; // Im / IVm / Vm
var min_mod = [[3, 7, 10, 2], [8, 0, 3, 7], [10, 2, 5, 9]]; //bIII / bVI / bVII
var min_ex = [[10, 1, 5, 8]]; //well fuck someday i will add something

var maj_ton = [[0, 4, 7, 11], [5, 9, 0, 4]]; // I / IV / NO USE OF V
var maj_mod = [[2, 5, 9, 0], [4, 7, 11, 2], [9, 0, 4, 7]]; // IIm / IIIm / VIm
var maj_ex = [[5, 8, 0, 3], [7, 10, 2, 5]]; //well fuck someday i will add something

var chords_sequence = [];

//////////////////////////////////first phase

if (tonality === 0){ //if minor
	if (Math.random() > 0.5){ //Im Vm Im Vm
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[2]);
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[2]);
	}
	else{ //IVm Im IVm Im
		chords_sequence.push(min_ton[1]);
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[1]);
		chords_sequence.push(min_ton[0]);
	}
}
else{ //if major
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);	
}

//////////////////////////////////second phase

var j = randomBetween(0,2); //exchange chord placing

if (tonality === 0){ //if minor
	chords_sequence.push(min_ton[0]); //Im + two tonal + one exchange
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(min_ex));
		}
		else{
			chords_sequence.push(randomFromArray(min_ton));
		}
	}
}
else{//if major
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);
}

//////////////////////////////////third phase

j = randomBetween(0,2); //modal chord placing

if (tonality === 0){ //if minor
	chords_sequence.push(min_ton[0]); //Im + two tonal + one modal
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(min_mod));
		}
		else{
			chords_sequence.push(randomFromArray(min_ton));
		}
	}
}
else{ //if major
	chords_sequence.push(maj_ton[0]); //I + two tonal + one modal
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(maj_mod));
		}
		else{
			chords_sequence.push(randomFromArray(maj_ton));
		}
	}
}

//////////////////////////////////fourth phase

if (tonality === 0){ //if minor
	for (var i = 0; i < 4; i++){
		if (Math.random() > 0.5){ //any tonal or modal
			chords_sequence.push(randomFromArray(min_mod));
		}
		else{
			chords_sequence.push(randomFromArray(min_ton));
		}
	}
}
else{ //if major
	for (var i = 0; i < 4; i++){ //any tonal or modal
		if (Math.random() > 0.5){
			chords_sequence.push(randomFromArray(maj_mod));
		}
		else{
			chords_sequence.push(randomFromArray(maj_ton));
		}
	}
}

//////////////////////////////////fifth phase

if (tonality === 0){ //if minor
	chords_sequence.push(min_ton[0]); //Im + two modal + one tonal
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(min_ton));
		}
		else{
			chords_sequence.push(randomFromArray(min_mod));
		}
	}
}
else{ //if major
	chords_sequence.push(maj_ton[0]); //I + two modal + one tonal
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(maj_ton));
		}
		else{
			chords_sequence.push(randomFromArray(maj_mod));
		}
	}
}

//////////////////////////////////sixth phase

if (tonality === 0){ //if minor
	if (Math.random() > 0.5){ //Im Vm Im Vm
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[2]);
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[2]);
	}
	else{ //IVm Im IVm Im
		chords_sequence.push(min_ton[1]);
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[1]);
		chords_sequence.push(min_ton[0]);
	}
}
else{ //if major
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);	
}

//////////////////////////////////seventh phase

j = randomBetween(0,2); //modal chord placing

if (tonality === 0){ //if minor
	chords_sequence.push(min_ton[0]); //Im + two tonal + one modal
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(min_mod));
		}
		else{
			chords_sequence.push(randomFromArray(min_ton));
		}
	}
}
else{ //if major
	chords_sequence.push(maj_ton[0]); //I + two tonal + one modal
	for (var i = 0; i < 3; i++){
		if (i == j){
			chords_sequence.push(randomFromArray(maj_mod));
		}
		else{
			chords_sequence.push(randomFromArray(maj_ton));
		}
	}
}

//////////////////////////////////final phase

if (tonality === 0){ //if minor
	if (Math.random() > 0.5){ //Im Vm
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[2]);
	}
	else{ //IVm Im
		chords_sequence.push(min_ton[1]);
		chords_sequence.push(min_ton[0]);
	}
}
else{ //if major
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);
}

//////////////////////////////////

console.log(chords_sequence);

