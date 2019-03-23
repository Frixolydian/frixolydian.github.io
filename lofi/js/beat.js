//beat.js

var kick
var hihat
var kick

function createBeat(){
	kick = 	[1,0,0,0,
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

	hihat = [1,0,1,0,
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
	}
}

createBeat();

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

	if (step == 256){
		createBeat();
		kickSound.volume(0.7)
		hihatSound = new Howl({src:['./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav'], volume: 0.25})
		console.log('change!!')
	}
}