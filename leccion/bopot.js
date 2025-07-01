var x = document.createElement("INPUT");
x.setAttribute("type", "text");

//CREAR INPUT

var inputBox = document.createElement("INPUT");
inputBox.setAttribute("type", "text");
inputBox.setAttribute("value", "");
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

var sumatoriaTemp = 0
function botFunction(){
	var a = inputBox.value
	sumatoria = 0
	sumatoriaTemp = 0
	sumatoriaDisplay = '   '
	for (let i = 0; i < a.length; i++) {
		sumatoria += Number(a.slice(i,i+1))
	}
	sumatoriaTemp = String(sumatoria)
	if (sumatoria > 9 && sumatoria != 11 && sumatoria != 22 && sumatoria != 33){
		sumatoria = 0
		for (let i = 0; i < sumatoriaDisplay.length; i++) {
			sumatoria += Number(sumatoriaTemp.slice(i,i+1))
		}
		sumatoriaTemp = String(sumatoria)
	}
	if (sumatoria > 9 && sumatoria != 11 && sumatoria != 22 && sumatoria != 33){
		sumatoria = 0
		for (let i = 0; i < sumatoriaDisplay.length; i++) {
			sumatoria += Number(sumatoriaTemp.slice(i,i+1))
		}
	}
	sumatoriaDisplay = sumatoriaDisplay.concat(' = ');
	sumatoriaDisplay = sumatoriaDisplay.concat(sumatoria)
	textNode.textContent = sumatoriaDisplay
};