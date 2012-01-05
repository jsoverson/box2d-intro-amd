define(function(){
  function fn(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = 0;
  }

  fn.prototype.update = function(state) {
    this.x = state[0];
    this.y = state[1];
    this.angle = state[2];
  }

  fn.prototype.draw = function(ctx) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x * CONF.SCALE, this.y * CONF.SCALE, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
  return fn;
})


