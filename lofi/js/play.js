
var tempo = 80;


setTimeout(function(){
	setInterval(function(){
		beat();
		chords();
		step = step + 1;
	}, 15000/tempo)
},4000)