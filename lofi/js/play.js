function playBar(){
	if (step <= 512){
		document.getElementById('playBarDisplay').style.width = ((step / 512) * 100) + '%'
	}
}

function endSong(){
	setInterval(function(){
		if (loopSong == true){
			window.location.href = window.location.href.split('/')[0] + '/?seed=' + (Number(seedNumber));
		}
		else{
			window.location.href = window.location.href.split('/')[0] + '/?seed=' + (Number(seedNumber) + 1);
		}
	}, 1500)
}


function play(){
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
					if (step == 512){
						endSong();
					}
					playBar();
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
	if (playing == false){
		play();
	}
}, 1500)


document.getElementById('previousButton').onclick = function(){
	window.location.href = window.location.href.split('/')[0] + '/?seed=' + (Number(seedNumber) - 1);
}

document.getElementById('nextButton').onclick = function(){
	window.location.href = window.location.href.split('/')[0] + '/?seed=' + (Number(seedNumber) + 1);
}

document.getElementById('shuffleButton').onclick = function(){
	window.location.href = window.location.href.split('/')[0] + '/?seed=' + Math.floor(Math.random() * 1000000);
}

document.getElementById('melodyButton').onclick = function(){
	toggleMelody();
}

document.getElementById('loopButton').onclick = function(){
	toggleLoop();
}

document.getElementById('loopButton').onclick = function(){
	toggleLoop();
}

document.getElementById('copyButton').onclick = function(){
   // Create new element
	var el = document.createElement('textarea');
	// Set value (string to be copied)
	el.value = window.location.href.split('/')[0] + '/?seed=' + (Number(seedNumber));
	// Set non-editable to avoid focus and move outside of view
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	// Select text inside element
	el.select();
	// Copy text to clipboard
	document.execCommand('copy');
	// Remove temporary element
	document.body.removeChild(el);
}