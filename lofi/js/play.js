function play(){
	playing = true;
	setTimeout(function(){
		intro.play();
		noise.play({loop: true});
		setTimeout(function(){
			setInterval(function(){
				beat();
				chords();
				catFunction();
				if (playMelody){
					melody();
				}
				step = step + 1;
			}, 15000/tempo)
			if (loadSpeech){
				speech.play();
			}
			setInterval(function(){
				fadeIn();
				fadeOut();
			}, 50 + randomBetween(0,30))
		},3000)
	},1000)

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


document.addEventListener('keydown', function(event) {
	if (event.keyCode == 32){
		playMelody = !playMelody;
	}
});
