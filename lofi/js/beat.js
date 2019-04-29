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

//	hihatType = 2;
	hihatType = randomBetween(0,2);

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
	openhihat = [0,0,0,0,
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

kickIntro = 0
snareIntro = 0
hihatIntro = 0


function beat(){
	if (kick[step % 32] == 1 && step >= kickIntro){
		kickSound.play();
	}
	if (snare[step % 32] == 1 && step >= snareIntro){
		snareSound.play();
	}
	if (hihat[step % 32] == 1 && step >= hihatIntro){
		setTimeout(function(){
			hihatSound.volume(0.15 + Math.seededRandom() * 0.1)
			hihatSound.play();
		}, randomBetween(5,10))
	}
	if (openhihat[step % 32] == 1 && step >= hihatIntro){
		setTimeout(function(){
			openhihatSound.volume(0.4)
			openhihatSound.play();
		}, randomBetween(5,10))
	}
	if (step == 256){
//		createBeat();
//		kickSound.volume(0.7)
//		hihatSound = new Howl({src:['./sound/drum/hats/hat_' + randomBetween(1,10) + '.wav'], volume: 0.25})
//		console.log('change!!')
	}
}