// The astroid class

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
	if (this.pos.x > 1.01*screen_dims[0]) {
		this.pos.x = -0.01*screen_dims[0];
	}
  if (this.pos.x < -0.01*screen_dims[0]) {
		this.pos.x = 1.01*screen_dims[0];
	}
	if (this.pos.y > 1.01*screen_dims[1]) {
		this.pos.y = -0.01*screen_dims[1];
	}
	if (this.pos.y < -0.01*screen_dims[1]) {
		this.pos.y = 1.01*screen_dims[1];
	}
}
