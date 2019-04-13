//cat.js

//Create a Pixi Application
var app = new PIXI.Application({ 
    width: 1400, 
    height: 800,
    antialias: true,
    transparent: true,
    resolution: 1,
    zindex: 1,
	}
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("pixi").appendChild(app.view);

app.renderer.view.style.pointerEvents = "none";
app.renderer.autoResize = true;
app.renderer.view.style.position = "fixed";
app.renderer.view.style.float = "left";
app.renderer.view.style.display = "inline-block";

function resize(){
    var w = window.innerWidth;
    var h = window.innerHeight * 1.2;
	if (w / 1400 * 800 > h) {
		app.renderer.view.style.width = h * 1400 / 800 + "px";
		app.renderer.view.style.height = h + "px";
		app.renderer.view.style.marginLeft = (window.innerWidth - h * 1400 / 800) / 2 + "px";
		app.renderer.view.style.marginTop = (window.innerHeight - h) / 2 + 50 + "px";
		console.log(app.renderer.view.style.marginTop)
	}
	else{
		app.renderer.view.style.width = w + "px";
		app.renderer.view.style.height = w * 800 / 1400 + "px";
		app.renderer.view.style.marginLeft = (window.innerWidth - w) / 2 + "px";
		app.renderer.view.style.marginTop = (window.innerHeight - w * 800 / 1400) / 2 + 30 + "px";
		console.log(app.renderer.view.style.marginTop)
	}
}

window.onresize = function (event){
	resize();
}

resize();


//load an image and run the `setup` function when it's done
PIXI.loader
	.add("assets/l_hand_up.png")
	.add("assets/l_hand_down.png")
	.add("assets/r_hand_up.png")
	.add("assets/r_hand_down.png")
	.add("assets/head.png")
	.add("assets/cat.png")
	.add("assets/piano.png")
	.load(setup);

var l_hand_up = PIXI.Texture.fromImage('assets/l_hand_up.png');
var l_hand_down = PIXI.Texture.fromImage('assets/l_hand_down.png');
var r_hand_up = PIXI.Texture.fromImage('assets/r_hand_up.png');
var r_hand_down = PIXI.Texture.fromImage('assets/r_hand_down.png');


var l_hand, r_hand, head, cat;


function setup() {


	l_hand = new PIXI.Sprite(PIXI.loader.resources["assets/l_hand_up.png"].texture);
	r_hand = new PIXI.Sprite(PIXI.loader.resources["assets/r_hand_up.png"].texture);
	cat = new PIXI.Sprite(PIXI.loader.resources["assets/cat.png"].texture);
	piano = new PIXI.Sprite(PIXI.loader.resources["assets/piano.png"].texture);

	cat.x = 683;
	cat.y = 327;
	cat.anchor.x = 0.5;
	cat.anchor.y = 0.5;
	app.stage.addChild(cat);

	piano.x = cat.x;
	piano.y = cat.y;
	piano.anchor.x = 0.5;
	piano.anchor.y = 0.5;
	app.stage.addChild(piano);

	l_hand.x = 870;
	l_hand.y = 326;
	l_hand.anchor.x = 0.5;
	l_hand.anchor.y = 0.5;
	l_hand.scale = cat.scale;
	r_hand.x = 474;
	r_hand.y = 229;
	r_hand.anchor.x = 0.5;
	r_hand.anchor.y = 0.5;
	app.stage.addChild(l_hand);
	app.stage.addChild(r_hand);

}

function gameLoop() {

}

gameLoop();

function catChord(){
	if (step % 16 == 0){
		l_hand.y = 422;
		l_hand.texture = PIXI.loader.resources["assets/l_hand_down.png"].texture;
	}
	if ((step + 1) % 16 == 0){
		l_hand.y = 350;
		l_hand.x = 870;
		l_hand.y = 326;
		l_hand.texture = PIXI.loader.resources["assets/l_hand_up.png"].texture;
	}
}

function catBeat(){
	if (step % 4 == 0){
		cat.y += 7;
	}
	if ((step - 2) % 4 == 0){
		cat.y -= 7;
	}
}

function catMelody(mel){
	r_hand.texture = PIXI.loader.resources["assets/l_hand_down.png"].texture;
	r_hand.x = 550 - mel * 4;
	r_hand.y = 330;

	setTimeout(function(){
		r_hand.texture = PIXI.loader.resources["assets/r_hand_up.png"].texture;
		r_hand.x = 474;
		r_hand.y = 229;
	}, 165)

}

function catFunction(){
	catChord();
	catBeat();
}