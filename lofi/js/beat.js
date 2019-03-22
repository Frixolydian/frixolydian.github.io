//beat.js

/*
var kickSound = new Pizzicato.Sound('./sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav');
var snareSound = new Pizzicato.Sound('./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav');
var hihatSound = new Pizzicato.Sound('./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav');
*/
var kickSound = new Howl({src:['./sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav'], volume: 0.6})
var snareSound = new Howl({src:['./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav'], volume: 0.7})
var snareSound2 = new Pizzicato.Sound('./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav');
var reverb = new Pizzicato.Effects.Reverb({
    time: 0.5,
    decay: 2,
    reverse: false,
    mix: 0.3
});

snareSound2.addEffect(reverb);
var delay = new Pizzicato.Effects.Delay({
    feedback: 0.1,
    time: 0.125,
    mix: 0.1
});



var hihatSound = new Howl({src:['./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav'], volume: 0.2})

var kick = 	[1,0,0,0,
			0,0,0,0,
			0,0,0,0,
			0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			0,0,0,0,
			0,0,0,0];

//add second beat kick
if (Math.seededRandom() > 0.1){
	kick[8] = 1;
}

//add three more hits
for(var i = 0; i < 3; i++){
	if (Math.seededRandom() > 0.5){
		kick[randomBetween(1, 15)] = 1;
	}
}


//duplicate first or create a new

kick.twoPhrase = false;
if (Math.seededRandom() > 0.8){
	kick.twoPhrase = true;
}

if (kick.twoPhrase == true){
	for(var i = 0; i < 16; i++){
		kick[i + 16] = kick[i];
	}
}
else{
	//add second beat kick
	if (Math.seededRandom() > 0.1){
		kick[24] = 1;
	}
	//add three more hits
	for(var i = 0; i < 3; i++){
		if (Math.seededRandom() > 0.5){
			kick[randomBetween(17, 31)] = 1;
		}
	}
}


var snare = [0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			1,0,0,0];


var hihat = [1,0,1,0,
			1,0,1,0,
			1,0,1,0,
			1,0,1,0,
			1,0,1,0,
			1,0,1,0,
			1,0,1,0,
			1,0,1,0];

if (Math.seededRandom() < 0.7){
	hihat = [0,0,1,0,
			0,0,1,0,
			0,0,1,0,
			0,0,1,0,
			0,0,1,0,
			0,0,1,0,
			0,0,1,0,
			0,0,1,0];
	hihatSound.volume(0.17)
}

	kickSound.volume(0.7);

kickIntro = 64 * randomBetween(0,2)
snareIntro = 64 * randomBetween(0,2)
hihatIntro = 64 * randomBetween(0,2)

function beat(){
	if (kick[step % 32] == 1 && step >= kickIntro){
		kickSound.play();
	}
	if (snare[step % 32] == 1 && step >= snareIntro){
		snareSound.play();
	}
	if (hihat[step % 32] == 1 && step >= hihatIntro){
		hihatSound.play();
	}
}