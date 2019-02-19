var step = 0;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
//    console.log('Query variable %s not found', variable);
}

//initial seed
Math.seed = getQueryVariable('seed');
if (Math.seed == undefined){
	Math.seed = Math.floor(Math.random() * 1000000);
	console.log('Seed set to ' + Math.seed)
}

var seedNumber = Math.seed;

//Create a Pixi Application
var app = new PIXI.Application({ 
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias: true,
    transparent: true,
    resolution: 1,
    zindex: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("pixi").appendChild(app.view);

app.renderer.view.style.pointerEvents = "none";
app.renderer.autoResize = true;
app.renderer.view.style.position = "fixed";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);



//load an image and run the `setup` function when it's done
PIXI.loader
  .add("assets/piano.png")
  .add("assets/gradient.png")
  .load(setup);

  var gradients = {}

var indications = [''];

var text = new PIXI.Text('',{fontFamily : 'Helvetica', fontSize: 24, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});


function setup() {
	var image = new PIXI.Sprite(PIXI.loader.resources["assets/piano.png"].texture);
	image.x = window.innerWidth / 2;
	image.y = window.innerHeight;
	image.scale.x = window.innerWidth / 1282;
	image.scale.y = image.scale.x;
	image.anchor.x = 0.5;
	image.anchor.y = 1;
	app.stage.addChild(image);
	text.x = 30;
	text.y = 28;
	app.stage.addChild(text)

}

function gameLoop() {
	for (var i in gradients){
		gradients[i].alpha -= 0.01;
		if (gradients[i].alpha < 0){
		}
	}
	requestAnimationFrame(gameLoop);

}

gameLoop();


// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function randomFromArray(list){
  return list[Math.floor((Math.seededRandom()*list.length))];
}

function randomBetween(min,max){
    return Math.floor(Math.seededRandom()*(max-min+1)+min);
}


var key = Math.floor(Math.seededRandom() * 12);

