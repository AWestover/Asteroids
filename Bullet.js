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
  var wrappedxys = wrapXYs(this.pos.x, this.pos.y);
  this.pos.x = wrappedxys[0];
  this.pos.y = wrappedxys[1];
}

Bullet.prototype.checkCollisions = function(all_asteroids) {
  var hit = false;
  var asteroidHit = hitAsteroid(all_asteroids, this.pos, this.dims);
  if  (asteroidHit != -1) {
    breakAsteroid(asteroidHit);
    hit = true;
  }
  return hit;
}
