//songtitle.js
var songTitle = '';

w.w = function(type){
	return (w[type][randomBetween(0, w[type].length - 1)])
}

//function for capitalized
function cap(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//function for vaporwave text

var charToFullWidth = char => {
	const c = char.charCodeAt( 0 )
	return c >= 33 && c <= 126
		? String.fromCharCode( ( c - 33 ) + 65281 )
		: char
}

var vap = string => string.split( '' ).map( charToFullWidth ).join( '' )

var coolStart = ['', '【', '〖', '〘', '〚', '﹝', '『'];
var coolEnd = ['', '】', '〗', '〙', '〛', '﹞', '』'];

var coolText = function(string){
	var i = string
	var j = randomBetween(0, coolStart.length - 1);
	if (Math.seededRandom() < 0.3){
		i = coolStart[j] + i + coolEnd[j];
	}
	if (Math.seededRandom() < 0.7 && i.length < 16){
		i = vap(i);
	}
	return i
}


w.phrase = function(a){
switch (a){
	case 0:
		return "I think you're pretty " + w.w('adj');
	case 1:
		return "Raining in " + w.w('place');
	case 2:
		return randomElement(["I'm", "You're", "It's"])+ " going to be " + w.w('adj') + '...';
	case 3:
		return w.w('adj') + '.';
	case 4:
		return 'The ' + cap(w.w('noun'));
	case 5:
		return cap(w.w('verb')) + randomElement([' your ', ' my ']) + w.w('noun');
	case 6:
		return "please " + w.w('verb');
	case 7:
		return cap(w.w('adj')) + ' ' + w.w('time');
	case 8:
		return cap(w.w('place'));
	case 9:
		return cap(w.w('noun')) + randomBetween(11, 99);
	case 10:
		return cap(w.w('noun')) + ' is ' + w.w('adj');
	case 11:
		return "we've never met but can we have " + w.w('noun') + " or something";
	case 12:
		return cap(w.w('noun')) + ' ' + w.w('noun');
	case 13:
		return "I'm " + w.w('adj');
	case 14:
		return cap(w.w('time')) + ' ' + w.w('noun');
	case 15:
		return cap(w.w('adj')) + ' ' + w.w('time') + ' ' + w.w('noun');
	case 16:
		return "But " + randomElement(["you're", "I'm"]) + " a " + w.w('noun');
	case 17:
		return cap(w.w('noun')) + ' head';
	case 18:
		return "Just " + w.w('verb');
	case 19:
		return cap(w.w('adj')) + " in " + w.w('place');
	case 20:
		return "It's " + w.w('adj');
	case 21:
		return randomElement(["My ", "Your "]) + w.w('noun') + " is " + w.w('adj');
	case 22:
		return "Go to " + w.w('place');
	}
}

function createTitle(){
	songTitle = coolText(w.phrase(randomBetween(0, 22)));
	document.getElementById('songTitle').innerHTML = songTitle;
}

createTitle();

/*
for (i = 0; i < 48; i++){
	console.log(coolText(w.phrase(randomBetween(0, 19))))
}

*/
