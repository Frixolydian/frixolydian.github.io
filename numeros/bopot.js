var x = document.createElement("INPUT");
x.setAttribute("type", "text");

//CREAR INPUT

var inputBox = document.createElement("INPUT");
inputBox.setAttribute("type", "text");
inputBox.setAttribute("value", "Escribe tu texto");
document.body.appendChild(inputBox);
console.log(inputBox.value)

//CREAR BOTÓN
var inputButton = document.createElement("BUTTON");
inputButton.innerHTML = "ENTER";
inputButton.addEventListener("click", botFunction);
document.body.appendChild(inputButton);

//CREAR TEXTO
const textNode = document.createTextNode("");
document.body.appendChild(textNode);
var textResult = document.createTextNode("");
document.body.appendChild(textResult)

var sumatoria = 0

var sumatoriaDisplay = String();

function addtoSumatoria (add){
	sumatoria += add;
	sumatoriaDisplay = sumatoriaDisplay.concat(add);
	sumatoriaDisplay = sumatoriaDisplay.concat(' + ');
}

document.body.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		botFunction();
    }
});


function botFunction(){
	var a = inputBox.value
	sumatoria = 0
	sumatoriaDisplay = '   '
	for (let i = 0; i < a.length; i++) {
		switch (a.slice(i,i+1)){
			case 'a':
			case 'j':
			case 's':
			case 'A':
			case 'J':
			case 'S':
			case 'á':
			case 'Á':
				addtoSumatoria(1);
				break;
			case 'b':
			case 'k':
			case 't':
			case 'B':
			case 'K':
			case 'T':
				addtoSumatoria(2);
				break;
			case 'c':
			case 'l':
			case 'u':
			case 'C':
			case 'L':
			case 'U':
			case 'ú':
			case 'Ú':
			case 'Ü':
			case 'ü':
				addtoSumatoria(3);
				break;
			case 'd':
			case 'm':
			case 'v':
			case 'D':
			case 'M':
			case 'V':
				addtoSumatoria(4);
				break;
			case 'e':
			case 'n':
			case '\u00f1':
			case 'w':
			case 'E':
			case 'N':
			case '\u00d1':
			case 'W':
			case 'é':
			case 'É':
				addtoSumatoria(5);
				break;
			case 'f':
			case 'o':
			case 'x':
			case 'F':
			case 'O':
			case 'X':
			case 'ó':
			case 'Ó':
				addtoSumatoria(6);
				break;
			case 'g':
			case 'p':
			case 'y':
			case 'G':
			case 'P':
			case 'Y':
				addtoSumatoria(7);
				break;
			case 'h':
			case 'q':
			case 'z':
			case 'H':
			case 'Q':
			case 'Z':
				addtoSumatoria(8);
				break;
			case 'i':
			case 'r':
			case 'I':
			case 'R':
			case 'í':
			case 'Í':
				addtoSumatoria(9);
				break;
			}
		}
		sumatoriaDisplay = sumatoriaDisplay.concat(' = ');
		sumatoriaDisplay = sumatoriaDisplay.concat(sumatoria)
		textNode.textContent = sumatoriaDisplay
};
