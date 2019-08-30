//beat.js

var kick
var hihat
var kick

function createBeat(){
	kick =	[1,0,0,0,
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

	snare = [0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			1,0,0,0,
			0,0,0,0,
			1,0,0,0];

	hihat = [];

	hihatType = randomBetween(0,2);
	if (hihatType == 2 && tempo > 70){
		hihatType = 1;
	}


	if (hihatType == 0){
		hihat = [0,0,1,0,
				0,0,1,0,
				0,0,1,0,
				0,0,1,0,
				0,0,1,0,
				0,0,1,0,
				0,0,1,0,
				0,0,1,0];
	}
	else if(hihatType == 1){
		hihat = [1,0,1,0,
				1,0,1,0,
				1,0,1,0,
				1,0,1,0,
				1,0,1,0,
				1,0,1,0,
				1,0,1,0,
				1,0,1,0];
	}
	else if(hihatType == 2){
		hihat = [1,1,1,1,
				1,1,1,1,
				1,1,1,1,
				1,1,1,1,
				1,1,1,1,
				1,1,1,1,
				1,1,1,1,
				1,1,1,1];		
	}
}
	var playOpenHat = false;
	if (Math.seededRandom() > 0.5){
		playOpenHat = true;
	}
	openhat = [0,0,0,0,
				0,0,0,0,
				0,0,1,0,
				0,0,0,0,
				0,0,0,0,
				0,0,0,0,
				0,0,1,0,
				0,0,0,0];

createBeat();

var kickIntro = 64 * randomBetween(0,2);
var snareIntro = 64 * randomBetween(0,2);
var hihatIntro = 64 * randomBetween(0,2);
var hihatDelay = randomBetween(2,5);
var snap = false;

if (Math.seededRandom() > 0.5){
	snap = true;
}


if (loadSpeech){
	kickIntro = 128;
	snareIntro = 128;
}

function beat(){
	if (kick[step % 32] == 1 && step >= kickIntro){
		kickSound.play();
		if (step % 32 == 0){
//			kickFoley[randomBetween(0,3)].play({volume: 0.3});
		}
	}
	if (snare[step % 32] == 1 && step >= snareIntro){
		snareSound.play();
		snareFoley[randomBetween(0,3)].play({volume: 0.3});
	}
	if (snare[step % 32] == 1 && snap){
		snapSound.play();
	}
	if (hihat[step % 32] == 1 && step >= hihatIntro){
		setTimeout(function(){
			hihatSound.setVolume(0.15 + Math.seededRandom() * 0.07);
			if (hihatType == 2){
				hihatSound.setVolume(0.05 + Math.seededRandom() * 0.035);
			}
			hihatSound.play();
		}, randomBetween(5,10))
	}
	if (openhat[step % 32] == 1 && step >= hihatIntro){
		setTimeout(function(){
			openhatSound.play({volume:0.4});
//			openhatFoley[randomBetween(0,3)].play({volume: 0.3});
		}, randomBetween(5,10))
	}
}