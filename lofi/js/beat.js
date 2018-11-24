//beat.js

/*
var kickSound = new Pizzicato.Sound('./sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav');
var snareSound = new Pizzicato.Sound('./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav');
var hihatSound = new Pizzicato.Sound('./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav');
*/
var kickSound = new Howl({src:['./sound/drum/kick/kick_' + randomBetween(1, 12) + '.wav']})
var snareSound = new Howl({src:['./sound/drum/snare/snare_' + randomBetween(1, 19) + '.wav']})
var hihatSound = new Howl({src:['./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav'], volume: 0.5})




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

function beat(){
	if (kick[step % 32] == 1){
		kickSound.play();
	}
	if (snare[step % 32] == 1){
		snareSound.play();
	}
	if (hihat[step % 32] == 1){
		hihatSound.play();
	}
}