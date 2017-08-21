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

  num_asteroids = 20;
  asteroids = [];
  for (var i = 0; i < num_asteroids; i++) {
    asteroids.push(new Asteroid(random(10, 50), createVector(random()*screen_dims[0],
                  random()*screen_dims[1]), createVector(random(-5, 5), random(-5, 5))));
  }

  var shipPosI = createVector(map(random(), 0, 1, 0.1*screen_dims[0], 0.9*screen_dims[0]),
    map(random(), 0, 1, 0.1*screen_dims[1], 0.9*screen_dims[1]));
  ship = new Ship(createVector(20.0, 10.0), shipPosI, dt);

}


function setup() {
  set_default_parameters();
  createCanvas(screen_dims[0], screen_dims[1]);
  frameRate(100*dt);
}


function draw() {
  if (!pause) {
    background(screen_color[0], screen_color[1], screen_color[2]);

    ship.show();
    ship.update(dt);
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

    for (var i = 0; i < num_asteroids; i++) {
      asteroids[i].show();
      asteroids[i].update(dt);
    }
  }
}


function keyReleased() {
  if (key.toLowerCase() == "p") {
    pause = !pause;
  }
  // Space32
  else if (key.charCodeAt() == 32) {
    ship.shoot();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screen_dims = [windowWidth, windowHeight];
}
