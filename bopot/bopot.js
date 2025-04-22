var sentence = String(prompt("epescripibapa apalgopo epen mipinupuscupulapas"));

function bopotFunction(a){
	var result = "";
	for (let i = 0; i < a.length; i++) {
		result = result.concat(a.slice(i,i+1))
		switch (a.slice(i,i+1)){
			case 'a':
				result = result.concat('pa');
				break;
			case 'e':
				result = result.concat('pe');
				break;
			case 'i':
				result = result.concat('pi');
				break;
			case 'y':
				result = result.concat('pi');
				break;
			case 'o':
				result = result.concat('po');
				break;
			case 'u':
				result = result.concat('pu');
				break;
			}
		}
	alert(result)
}

bopotFunction(sentence);
