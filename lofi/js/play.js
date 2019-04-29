var tempo = randomBetween(60, 85);
var step = 0;
var volume = 0;
Howler.volume(0.2);
var startFadeOut = false;

function play(){
	playing = true;
	setTimeout(function(){
		setInterval(function(){
			beat();
			chords();
			catFunction();
			melody();
			step = step + 1;
		}, 15000/tempo)
		noise.play();
		setInterval(function(){
			fadeIn();
			fadeOut();
		}, 50 + randomBetween(0,30))
	},2000)

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
			if (volume == 0){
				setInterval(function(){
					window.location.reload(false);
				}, 1500)
			}
		}
	}
}