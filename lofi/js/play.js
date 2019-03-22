
var tempo = randomBetween(60, 80);

var noise = new Howl({
			src:['sound/noise/noise' + randomBetween(1,2) + '.ogg', 'sound/noise/noise' + randomBetween(1,2) + '.ogg'],
			loop: true,
			preload: true
	});

var volume = 0;
var startFadeOut = false;

setTimeout(function(){
	setInterval(function(){
		beat();
		chords();
		if(step > 64){
			melody();
		}
		step = step + 1;
	}, 15000/tempo)
	noise.volume(0.2 + Math.seededRandom() * 0.1);
	noise.play();
	setInterval(function(){
		fadeIn();
		fadeOut();
	}, 100)
},4000)

function fadeIn(){
	if (volume < 100 && startFadeOut == false){
		Howler.volume(volume/100);
		volume += 1;
	}
}

function fadeOut(){
	if (step > 512 && startFadeOut == false){
		startFadeOut = true;
	}
	if (startFadeOut){
		volume -= 1;
		Howler.volume(volume/100);
		if (volume < 0){
			setInterval(function(){
				window.location.reload(false);
			}, 1500)
		}
	}
}