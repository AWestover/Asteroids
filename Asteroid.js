// The astroid class

// Any asteroid with avgRadius less than this wil not split
var criticalRadius = 25;

function Asteroid(avgRadius, pos, vel) {
	this.avgRadius = avgRadius;
	this.pos = pos;
	this.vel = vel;
	this.th = 0;
	this.generateRandomVertices();
}

Asteroid.prototype.generateRandomVertices = function() {
	var num_vertices = round(6 + 10*random());
	this.vertexCenterDeltas = [];
	for (var i = 0; i < num_vertices; i++) {
		var cur_edge_th = i*(TWO_PI/num_vertices);  // Checks radians vs degrees...
		var nextX = this.avgRadius*cos(cur_edge_th) + 0.6*this.avgRadius*random();
		var nextY = this.avgRadius*sin(cur_edge_th) + 0.6*this.avgRadius*random();
		this.vertexCenterDeltas.push([nextX, nextY]);
	}
}

Asteroid.prototype.show = function() {
	fill(255, 255, 255, 200);
	beginShape();
	for (var i = 0; i < this.vertexCenterDeltas.length; i++) {
		vertex(this.vertexCenterDeltas[i][0] + this.pos.x, this.vertexCenterDeltas[i][1] + this.pos.y);
	}
	endShape(CLOSE);
}

Asteroid.prototype.update = function(dt) {
	this.pos.add(p5.Vector.mult(this.vel, dt));
	var wrappedxys = wrapXYs(this.pos.x, this.pos.y);
  this.pos.x = wrappedxys[0];
  this.pos.y = wrappedxys[1];
}

Asteroid.prototype.halfs = function(bullet) {
	// Later make it split along the line the bullet is traveling in!

	var ast1 = new Asteroid(this.avgRadius/2, this.pos, this.vel);
	var ast2 = new Asteroid(this.avgRadius/2, this.pos, this.vel);
	return [ast1, ast2];
}

function breakAsteroid(index) {
	if (asteroids[index].avgRadius > criticalRadius) {
		var twoNewHalfs =  asteroids[index].halfs();
		asteroids[index] = twoNewHalfs[0];
		asteroids.push(twoNewHalfs[1]);
	}
	else {
		asteroids.pop(index);
	}
}
