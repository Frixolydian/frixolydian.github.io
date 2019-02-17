
var tempo = randomBetween(60, 80);


setTimeout(function(){
	setInterval(function(){
		beat();
		chords();
		melody();
		step = step + 1;
	}, 15000/tempo)
},4000)