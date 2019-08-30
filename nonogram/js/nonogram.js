//nonogram.js
var mouseDown = false;
document.body.onmousedown = function() { 
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}


var row = 8;
var col = 16;

var n = []; //create ñoñogram

document.getElementById("nonogram").style.width = (document.getElementById("nonogram").offsetHeight * 2) + "px"
document.getElementById("pieces").style.width = window.innerWidth - (document.getElementById("nonogram").offsetHeight * 2) + "px"


for (var i = 0; i < col; i++){
	n[i] = document.createElement("div");   // Create a <button> element	
	document.getElementById("nonogram").appendChild(n[i])
	n[i].style.width = (100 / col) + "%";
	n[i].classList.add('colDiv');
	for (var j = 0; j < row; j++){
		n[i][j] = document.createElement("BUTTON");   // Create a <button> element
		n[i][j].state = 0;
		n[i][j].id = "sq" + String(i) + String(j);
		n[i][j].innerHTML = ""; //String(i) + String(j);// Insert text
		n[i].appendChild(n[i][j]);
		n[i][j].onclick = function() {
			switch (this.state){
				case 0:
					this.style.backgroundImage = "url('assets/b_p.png')"; break
				case 1:
					this.style.backgroundImage = "url('assets/b_k.png')"; break
				case 2:
					this.style.backgroundImage = "url('assets/b_b.png')"; break
				case 3:
					this.style.backgroundImage = "url('assets/b_r.png')"; break
				case 4:
					this.style.backgroundImage = "url('assets/b_q.png')"; break
				case 5:
					this.style.backgroundImage = "url('assets/b_k.png')"; break
				case 6:
					this.style.backgroundImage = "url('assets/w_p.png')"; break
				case 7:
					this.style.backgroundImage = "url('assets/w_k.png')"; break
				case 8:
					this.style.backgroundImage = "url('assets/w_b.png')"; break
				case 9:
					this.style.backgroundImage = "url('assets/w_r.png')"; break
				case 10:
					this.style.backgroundImage = "url('assets/w_q.png')"; break
				case 11:
					this.style.backgroundImage = "url('assets/w_k.png')"; break
				case 12:
					this.style.background = "white"; break

			}
			this.style.backgroundSize = "100% 100%"
			this.state += 1;
			if (this.state > 12){
				this.state = 0;
			}

		}
		n[i][j].ondragover = function() {
			allowDrop(event)

		}
		n[i][j].ondrop = function() {
			drop(event)
		}
//	<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
//	<img id="drag1" src="assets/b_k.png" draggable="true" ondragstart="drag(event)">





		n[i][j].style.background = "white";
		n[i][j].classList.add('square');
	}
}