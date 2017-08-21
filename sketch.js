// Coded by Alek Westover

// Constants and imported stuff and global variables
var screen_dims;
var screen_color;
var dt;
var ship;
var num_asteroids;
var asteroids;
var pause = false;

// A function that resets all parameters to default values
// caled on start and restart of game
function set_default_parameters() {
  screen_dims = [windowWidth, windowHeight];
  screen_color = [0, 0, 0, 50];
  dt = 0.3;

  num_asteroids = 3;
  asteroids = [];
  for (var i = 0; i < num_asteroids; i++) {
    asteroids.push(new Asteroid(random(30, 60), createVector(random()*screen_dims[0],
                  random()*screen_dims[1]), createVector(random(-5, 5), random(-5, 5))));
  }

  var shipPosI = createVector(map(random(), 0, 1, 0.1*screen_dims[0], 0.9*screen_dims[0]),
    map(random(), 0, 1, 0.1*screen_dims[1], 0.9*screen_dims[1]));
  ship = new Ship(createVector(20.0, 10.0), shipPosI, dt);

}

// set variables
function setup() {
  set_default_parameters();
  createCanvas(screen_dims[0], screen_dims[1]);
  frameRate(100*dt);
}

// main loop
function draw() {
  if (!pause) {
    background(screen_color[0], screen_color[1], screen_color[2]);

    ship.show();
    ship.update(asteroids);
    // Left37, A65
    if (keyIsDown(37) || keyIsDown(65)) {
      ship.turn('LEFT');
    }
    // Right39, D68
    else if (keyIsDown(39) || keyIsDown(68)) {
      ship.turn('RIGHT');
    }
    // Up38, W87
    else if (keyIsDown(38) || keyIsDown(87)) {
      ship.accelerate();
    }

    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].show();
      asteroids[i].update(dt);
    }
  }
}

// checks for collision with an asteroid
function hitAsteroid(all_asteroids, otherObjectPos, otherObjectDims) {
  // this is currently very stupid collision detection
  // I think that we can somehow loop over the vertices
  // of the asteroids and look if the object hit any of the
  // segments connecting them or something
  // but for now ...
  var asteroidHit = -1;
  for (var i = 0; i < all_asteroids.length; i++) {
    if (p5.Vector.sub(all_asteroids[i].pos, otherObjectPos).mag() < all_asteroids[i].avgRadius) {
      asteroidHit = i;
      break;
    }
  }
  return asteroidHit;
}

// returns the same x, y values unless they need to be wrapped around the canvas
function wrapXYs(x, y) {
  outx = x;
  outy = y;
  if (x > 1.01*screen_dims[0]) {
		outx = -0.01*screen_dims[0];
	}
  if (x < -0.01*screen_dims[0]) {
		outx = 1.01*screen_dims[0];
	}
	if (y > 1.01*screen_dims[1]) {
		outy = -0.01*screen_dims[1];
	}
	if (y < -0.01*screen_dims[1]) {
		outy = 1.01*screen_dims[1];
	}
  return [outx, outy];
}

// checks if the key has been released (not just pressed)
function keyReleased() {
  if (key.toLowerCase() == "p") {
    pause = !pause;
  }
  // Space32
  else if (key.charCodeAt() == 32) {
    ship.shoot();
  }
}
