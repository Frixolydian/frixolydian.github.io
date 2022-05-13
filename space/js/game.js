var cursorX;
var cursorY;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
setInterval("checkCursor()", 1000);
function checkCursor(){
//    alert("Cursor at: " + cursorX + ", " + cursorY);
}



var score = 0;

function getDistance(mesh1, mesh2) { 
  var dx = mesh1.position.x - mesh2.position.x; 
  var dy = mesh1.position.y - mesh2.position.y; 
  var dz = mesh1.position.z - mesh2.position.z; 
  return Math.sqrt(dx*dx+dy*dy+dz*dz); 
}

var scoretext = document.createElement('div');
scoretext.style.position = 'absolute';
scoretext.style.width = 200;
scoretext.style.height = 200;
scoretext.style.color = "white";
scoretext.innerHTML = "Score: " + score;
scoretext.style.top = 30 + 'px';
scoretext.style.left = 200 + 'px';
document.getElementById("canvas").appendChild(scoretext);

var i;

var scene = new THREE.Scene;

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000 );
camera.position.z = -20;
camera.position.y = 5;
camera.rotation.y = Math.PI;

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize( window.innerWidth * 0.8, window.innerHeight * 0.8);
document.getElementById("canvas").appendChild( renderer.domElement );

var mouseX = window.innerWidth / 2;
var mouseY = 510 / 2;

renderer.domElement.addEventListener("mousemove", getPosition, false);

function getPosition(event){
  mouseX = event.x - window.innerWidth / 2;
  mouseY = event.y - 510 / 2;
}


var ambient = new THREE.AmbientLight( 0x404040, 50 ); // soft white light
scene.add( ambient );


function createStar(){
	var star_material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var star_geometry =	new THREE.BoxGeometry(3, 3, 3);
	var star = new THREE.Mesh(star_geometry, star_material);
	star.position.x = Math.random() * 2000 - 1000;
	star.position.y = Math.random() * 2000 - 1000;
	star.position.z = Math.random() * 2000 - 1000;
	star.rotation.x = Math.random() * Math.PI;
	star.rotation.y = Math.random() * Math.PI;
	star.rotation.z = Math.random() * Math.PI;
	scene.add(star);
}

for (i = 0; i < 1000; i++) { 
	createStar();
}


function createAsteroid(_x, _y, _z, size){
	var asteroid_material = new THREE.MeshNormalMaterial();
	var asteroid_geometry =	new THREE.BoxGeometry(size, size, size);
	var asteroid = new THREE.Mesh(asteroid_geometry, asteroid_material);
	asteroid.size = size;
	asteroid.position.x = _x;
	asteroid.position.y = _y;
	asteroid.position.z = _z;
	asteroid.castShadow = true;
	scene.add(asteroid);
	ascend(asteroid);
	asteroid.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
	asteroid.cube = true;
	asteroid.asteroid = true;
	asteroid.speed.x = (Math.random() - 0.5) / size * 50;
	asteroid.speed.y = (Math.random() - 0.5) / size * 50;
	asteroid.speed.z = (Math.random() - 0.5) / size * 50;
	asteroid.rotationspeed.x = (Math.random() - 0.5) / size * 1.5;
	asteroid.rotationspeed.y = (Math.random() - 0.5) / size * 1.5;
	asteroid.rotationspeed.z = (Math.random() - 0.5) / size * 1.5;
}

for (i = 0; i < 50; i++) {
	createAsteroid(Math.random() * 1500 - 750, Math.random() * 1500 - 750, Math.random() * 1500 - 750, Math.random() * 80 + 20);
}


var cube = null

var loader = new THREE.JSONLoader();
loader.load("models/spaceship.json", function(geometry, mat) {
  var material = new THREE.MeshNormalMaterial();
  cube = new THREE.Mesh(geometry, material);
	cube.castShadow = true;
	cube.cube = true
	cube.player = true
	ascend(cube);
	cube.position.y = 0;
	cube.position.z = 5;
	cube.scale.set(0.1, 0.1, 0.1)
	cube.rotation.z = Math.PI
	cube.rotation.y = Math.PI / 2
	cube.add(camera);
	scene.add(cube);
  }
);

var shootTimer = 50;

var xAcceleration = 0.005;
var yAcceleration = 0.005;
var gravity = 0.01;

var keys = [];
keys.up = false;
keys.left = false;
keys.right = false;
keys.down = false;
keys.jump = false;
keys.q = false;
keys.e = false;

function ascend(self){
	self.speed = [];
	self.speed.x = 0;
	self.speed.y = 0;
	self.speed.z = 0;
	self.rotationspeed = [];
	self.rotationspeed.x = 0;
	self.rotationspeed.y = 0;
	self.rotationspeed.z = 0;
}




//movement
function movement(){
	scene.traverse(function(node) {
		if (node instanceof THREE.Mesh){
			if (node.cube){
				node.position.x += node.speed.x;
				node.position.y += node.speed.y;
				node.position.z += node.speed.z;
				node.rotation.x += node.rotationspeed.x;
				node.rotation.y += node.rotationspeed.y;
				node.rotation.z += node.rotationspeed.z;
			}
		} 
	});
}

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
  var keyCode = event.which;
  if (keyCode == 38) {
  	keys.up = false;
  }
  if (keyCode == 40) {
  	keys.down = false;
  }
  if (keyCode == 37) {
  	keys.left = false;
  }
  if (keyCode == 39) {
  	keys.right = false;
  }
  if (keyCode == 90) {
  	keys.accelerate = false;
   	low.fade(0.5, 0.3, 200, id)
   	low.volume(0.3, id)
  }
  if (keyCode == 81) {
  	keys.q = false;
  }
  if (keyCode == 69) {
  	keys.e = false;
  }
};

var bullets = [];

var zap = new Howl({
  src: ['sound/laser.ogg'],
  volume: 0.02
});

var low = new Howl({
  src: ['sound/low.ogg'],
  volume: 0.3,
  loop: true,
});

var asteroid_destroy = new Howl({
  src: ['sound/asteroid.ogg'],
  volume: 0.5,
});

id = low.play();

function createBullet(){
	zap.play();
	bullet = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshLambertMaterial({color: 0x999900}))
	bullet.position.set(cube.position.x, cube.position.y, cube.position.z);
	bullet.rotation.set(cube.rotation.x, cube.rotation.y, cube.rotation.z);
	bullet.bullet = true;
	bullet.translateZ(-3);
	bullet.distance = 0;
	bullet.alive = true;
	scene.add(bullet);
	bullets.push(bullet);
}


function shoot(){
	createBullet();
}


document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 38) {
  	keys.up = true;
  }
  if (keyCode == 40) {
  	keys.down = true;
  }
  if (keyCode == 37) {
  	keys.left = true;
  }
  if (keyCode == 39) {
  	keys.right = true;
  }
  if (keyCode == 90) {
  	keys.accelerate = true;
   	low.fade(0.3, 0.5, 200, id)
    low.volume(0.5, id)
  }
  if (keyCode == 81) {
  	keys.q = true;
  }
  if (keyCode == 69) {
  	keys.e = true;
  }
};



var axis = new THREE.Vector3(1,0,0);
var axis2 = new THREE.Vector3(0,1,0);

accelY = 0;
accelX = 0;
accelZ = 0;
accel = 0;

var deletos = false;

function update(){
	if (!cube){
		return
	}

	for (var index = 0; index < bullets.length; index += 1){
		if (bullets[index] === undefined) continue;
		if (bullets[index].distance < 200){
			bullets[index].distance += 1;
		}
		else{
			bullets[index].alive = false;
			scene.remove(bullets[index])
		}
		if (bullets[index].alive == false){
			bullets.splice(index, 1);
			continue;
		}
	}

	camera.position.z = -20 - accel / 20
	camera.rotation.z = accelZ / 500 - accelY / 400;
	camera.rotation.y = Math.PI - accelY / 1000;
	camera.rotation.x = accelX / 1000;

	cube.translateZ(1 + 6 * accel / 100);

	if (keys.accelerate){
		accel = Math.min(accel + 4, 100)
	}
	if (accel > 0){
		accel = Math.max(accel - 2, 0)
	}

	cube.rotation.z += 0.03 * accelZ / 100
	cube.rotateOnAxis(axis2, 0.03 * accelY / 100);
	cube.rotateOnAxis(axis, 0.03 * accelX / 100);

	if (keys.q){
		accelZ = Math.max(accelZ - 4, -100)
	}
	if (keys.e){
		accelZ = Math.min(accelZ + 4, 100)
	}
	if (accelZ > 0){
		accelZ = Math.max(accelZ - 2, 0)
	}
	if (accelZ < 0){
		accelZ = Math.min(accelZ + 2, 0)
	}

	if (keys.left){
		accelY = Math.min(accelY + 4, 100)
	}
	if (keys.right){
		accelY = Math.max(accelY - 4, -100)
	}

	if (accelY > 0){
		accelY = Math.max(accelY - 2, 0)
	}
	if (accelY < 0){
		accelY = Math.min(accelY + 2, 0)
	}
/*
	if (mouseX < -25){
		accelY = Math.min(accelY - (mouseX + 25)/ 40, 50);
	}
	if (mouseX > 25){
		accelY = Math.max(accelY - (mouseX - 25)/ 40, -50);
	}
	if (mouseY < -25){
		accelX = Math.max(accelX + (mouseY + 25)/ 20, -50);
	}
	if (mouseY > 25){
		accelX = Math.min(accelX + (mouseY - 25)/ 20, 50);
	}
*/

	if (keys.up){
		accelX = Math.max(accelX - 4, -100)
	}
	if (keys.down){
		accelX = Math.min(accelX + 4, 100)
	}

	if (accelX > 0){
		accelX = Math.max(accelX - 2, 0)
	}
	if (accelX < 0){
		accelX = Math.min(accelX + 2, 0)
	}


	if (cube.position.x > 750){
		cube.position.x = -749
	}
	if (cube.position.x < -750){
		cube.position.x = 749
	}
	if (cube.position.y > 750){
		cube.position.y = -749
	}
	if (cube.position.y < -750){
		cube.position.y = 749
	}
	if (cube.position.z > 750){
		cube.position.z = -749
	}
	if (cube.position.z < -750){
		cube.position.z = 749
	}




	scene.traverse(function(node) {


		if (node instanceof THREE.Mesh){
			if (node.bullet){
				node.translateZ(15);
				scene.traverse(function(nodo){
					if (nodo.asteroid){
						if (getDistance(node, nodo) < nodo.size / 1.5){
							if (nodo.size > 15){
								createAsteroid(nodo.position.x, nodo.position.y, nodo.position.z, nodo.size / 2)
								createAsteroid(nodo.position.x, nodo.position.y, nodo.position.z, nodo.size / 2)
							}
							asteroid_destroy.play();
							setTimeout(function(){
								scene.remove(node);
								node.alive = false;
								scene.remove(nodo);
								nodo = null;
							}, 0)
							score += 1;
							scoretext.innerHTML = "Score: " + score;
							deletos = true;
							return
						}
					}
				})
			}

			if (node.asteroid){
				if (node.position.x > 750){
					node.position.x = -749
				}
				if (node.position.x < -750){
					node.position.x = 749
				}
				if (node.position.y > 750){
					node.position.y = -749
				}
				if (node.position.y < -750){
					node.position.y = 749
				}
				if (node.position.z > 750){
					node.position.z = -749
				}
				if (node.position.z < -750){
					node.position.z = 749
				}
			}

			if (node.asteroid){
				if (getDistance(node, cube) < node.size / 1.5){
					scene.remove(cube)
					cube = null;
					scoretext.innerHTML = "x.x Score: " + score;
				}
			}
		}
	});


}



function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

//				camera.lookAt(cube.position );
	shootTimer -= 1;
	if (shootTimer < 0){
		shootTimer = 20;
		shoot();
	}

	movement();
	update();
};
animate();