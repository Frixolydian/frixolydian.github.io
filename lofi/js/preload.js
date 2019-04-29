var playing = false;

//PRELOAD ALL SOUNDS

//
function soundLoaded(){
	loadedSounds += 1;
	document.getElementById('display').innerHTML = 'Loading audio files: ' + loadedSounds + ' / ' + totalSounds;
	if (loadedSounds == totalSounds){
		document.getElementById('display').innerHTML = 'Loaded!';
		if (Howler.ctx.state !== "suspended" && playing == false){
			play();
		}
	}
}

window.onclick = function(){
	if (playing == false && loadedSounds == totalSounds){
		play();
	}
};

//preload noise
totalSounds += 1;
var noise = new Howl({
	src:['./sound/noise/noise' + randomBetween(1,2) + '.ogg'], volume: 0.2 + Math.seededRandom() * 0.1,
	loop:true,
	preload: true,
	onload: soundLoaded
})

//preload piano & keys
var pianoSounds = [];
for (var i = 1; i < 7; i++){
	for (var j = 0; j < 12; j++){
		totalSounds += 1;
		pianoSounds.push(new Howl({
			src:['sound/piano/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3'],
			preload: true,
			onload: soundLoaded
		}));
	}
}

//check if keys are to be loaded or not
var melodyKeys = false;
if (Math.seededRandom() > 0.5){
	melodyKeys = true;
}
var chordsKeys = false;
if (Math.seededRandom() > 0.3){
	chordsKeys = true;
}

if(melodyKeys || chordsKeys){
	var keySounds = [];
	for (var i = 2; i < 7; i++){
		for (var j = 0; j < 12; j++){
			totalSounds += 1;
			keySounds.push(new Howl({
				src:['sound/fmsynth/' + notes[j] + String(i) + '.ogg', 'sound/' + notes[j] + String(i) + '.mp3'],
				preload: true,
				onload: soundLoaded
			}));
		}
	}
}

//preload drums
totalSounds += 1;
var kickSound = new Howl({
	src:['./sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav'],
	volume: 0.6,
	preload: true,
	onload: soundLoaded
})
totalSounds += 1;
var snareSound = new Howl({
	src:['./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav'],
	volume: 0.7,
	preload: true,
	onload: soundLoaded
})
totalSounds += 1;
var hihatSound = new Howl({
	src:['./sound/drum/closedhat/closedhat_' + randomBetween(1,6) + '.wav'],
	volume: 0.17,
	preload: true,
	onload: soundLoaded
})
totalSounds += 1;
var openhihatSound = new Howl({
	src:['./sound/drum/openhat/openhat_1.wav'],
	volume: 0.17,
	preload: true,
	onload: soundLoaded
})