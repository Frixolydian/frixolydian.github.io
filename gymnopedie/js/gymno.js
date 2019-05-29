var loopSong = false;

function toggleLoop(){
	loopSong = !loopSong;
	if (loopSong == true){
//		document.getElementById('melodyDisplay').src="./assets/ic-piano.png";
		document.getElementById('loopButton').className = 'buttonOff';
	}
	else{
//		document.getElementById('melodyDisplay').src="./assets/ic-nopiano.png";
		document.getElementById('loopButton').className = 'button';
	}
}

var pianoSounds = [];

for (var i = 1; i < 8; i++){
	for (var j = 0; j < 12; j++){
		pianoSounds[(i - 1) * 12 + j] = new Wad({
			source: './sound/piano/A' + i +'.ogg',
			detune: 100 * j,
		})
	}
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
//    console.log('Query variable %s not found', variable);
}

//initial seed
Math.seed = getQueryVariable('seed');
if (Math.seed == undefined){
	Math.seed = Math.floor(Math.random() * 1000000);
//	console.log('Seed set to ' + Math.seed)
}

var seedNumber = Math.seed;

document.getElementById('seed').innerHTML = 'Seed: ' + seedNumber
/*
//Create a Pixi Application
var app = new PIXI.Application({ 
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias: true,
    transparent: true,
    resolution: 1,
    zindex: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("pixi").appendChild(app.view);

app.renderer.view.style.pointerEvents = "none";
app.renderer.autoResize = true;
app.renderer.view.style.position = "fixed";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);



//load an image and run the `setup` function when it's done
PIXI.loader
  .add("assets/piano.png")
  .add("assets/gradient.png")
  .load(setup);

  var gradients = {}


function setup() {
	var image = new PIXI.Sprite(PIXI.loader.resources["assets/piano.png"].texture);
	image.x = window.innerWidth / 2;
	image.y = window.innerHeight;
	image.scale.x = window.innerWidth / 1282;
	image.scale.y = image.scale.x;
	image.anchor.x = 0.5;
	image.anchor.y = 1;
	app.stage.addChild(image);
	var text = new PIXI.Text(indications[randomBetween(0,2)],{fontFamily : 'Helvetica', fontSize: 24, fill : 0x250e3a, align : 'center', fontWeight: 'bold'});
	text.x = 30;
	text.y = 28;
	app.stage.addChild(text)

}

function gameLoop() {
	for (var i in gradients){
		gradients[i].alpha -= 0.01;
		if (gradients[i].alpha < 0){
		}
	}
	requestAnimationFrame(gameLoop);

}

gameLoop();
*/

// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function randomFromArray(list){
  return list[Math.floor((Math.seededRandom()*list.length))];
}

function randomBetween(min,max){
    return Math.floor(Math.seededRandom()*(max-min+1)+min);
}

var indications = ['Lent et douloureux', 'Lent et grave', 'Lent et triste'];
var songTitle = randomFromArray(indications);
document.getElementById('songTitle').innerHTML = songTitle

var key = Math.floor(Math.seededRandom() * 12);

var major_scale = [-3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 14, 16];
var minor_scale = [-4, -2, 0, 2, 3, 5, 7, 8, 10, 12, 14, 15];

var tonality = Math.round(Math.seededRandom()); //minor 0, major 1
//console.log(key, tonality)

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
	if (Math.seededRandom() > 0.5){ //Im Vm Im Vm
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
		if (Math.seededRandom() > 0.5){ //any tonal or modal
			chords_sequence.push(randomFromArray(min_mod));
		}
		else{
			chords_sequence.push(randomFromArray(min_ton));
		}
	}
}
else{ //if major
	for (var i = 0; i < 4; i++){ //any tonal or modal
		if (Math.seededRandom() > 0.5){
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
	if (Math.seededRandom() > 0.5){ //Im Vm Im Vm
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
	if (Math.seededRandom() > 0.5){ //Im Vm
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[2]);
		chords_sequence.push(min_ton[0]);
	}
	else{ //IVm Im
		chords_sequence.push(min_ton[1]);
		chords_sequence.push(min_ton[0]);
		chords_sequence.push(min_ton[1]);
	}
}
else{ //if major
	chords_sequence.push(maj_ton[1]);
	chords_sequence.push(maj_ton[0]);
	chords_sequence.push(maj_ton[1]);
}

//console.log(chords_sequence.length)

//////////////////////////////////

//console.log(chords_sequence);

console.log('AudioContext ' + Wad.audioContext.state + '.')