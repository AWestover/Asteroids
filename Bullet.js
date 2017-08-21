// The bullet class
// describes how the bullets fly, look, die, and kill

function Bullet(pos, vel, th, dims) {
  this.pos = pos;
  this.vel = vel;
  this.th  = th;
  this.dims = dims;
};

Bullet.prototype.show = function() {
  fill(225, 0, 0);
  applyMatrix();
  translate(this.pos.x, this.pos.y);
  rotate(this.th+PI/2);
  ellipse(0, 0, this.dims.x, this.dims.y);
  resetMatrix();
}

Bullet.prototype.update = function(dt) {
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

Bullet.prototype.checkCollisions = function(all_astroids) {

}
