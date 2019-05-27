

function playBar(){
	if (step <= 512){
		document.getElementById('playBarDisplay').style.width = ((step / 512) * 100) + '%'
	}
}

function endSong(){
	console.log('Next song.')
	if (loopSong == true){
		window.location.href = 'http://lofibot.com/?seed=' + (Number(seedNumber));
	}
	else{
		window.location.href = 'http://lofibot.com/?seed=' + (Number(seedNumber) + 1);
	}
}


function play(){
	document.getElementById('tapToPlay').style.opacity = 0;
	console.log('Started Playing.')
	playing = true;
	setTimeout(function(){
		intro.play();
		noise.play({loop: true});
		setTimeout(function(){
			setInterval(function(){
				if (step < 513){
					beat();
					chords();
					if (playMelody){
						melody();
					}
					step = step + 1;
					playBar();
				}
				if (step == 512){
					endSong();
				}
			}, 15000/tempo)
			if (loadSpeech){
				speech.play();
			}
		},3000)
	},1000)
}


function toggleMelody(){
	playMelody = !playMelody;
	if (playMelody == true){
		document.getElementById('melodyDisplay').src="./assets/ic-piano.png";
		document.getElementById('melodyButton').className = 'button';
	}
	else{
		document.getElementById('melodyDisplay').src="./assets/ic-nopiano.png";
		document.getElementById('melodyButton').className = 'buttonOff';
	}
}

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

document.addEventListener('keydown', function(event) {
	if (event.keyCode == 32){
		toggleMelody();
	}
});

window.onclick = function(){
	if (playing == false){
		play();
	}
};

setTimeout(function(){
	if (playing == false && Wad.audioContext.state == 'running'){
		play();
	}
	else if (playing == false){
		document.getElementById('tapToPlay').style.opacity = 0.6;
	}
}, 1500)




document.getElementById('melodyButton').onclick = function(){
	toggleMelody();
}
