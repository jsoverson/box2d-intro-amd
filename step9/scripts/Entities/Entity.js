define(function(){
  function Entity(id, x, y, angle, center, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.center = center;
    this.color = color || 'red';
    this.angle = angle || 0;

  }

  Entity.prototype.update = function(state) {
    this.x      = state[0];
    this.y      = state[1];
    this.angle  = state[2];
    this.center = state[3];
  }

  Entity.prototype.draw = function(ctx) {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x * CONF.SCALE, this.y * CONF.SCALE, 4, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(this.center.x * CONF.SCALE, this.center.y * CONF.SCALE, 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
  }

  return Entity;
})


