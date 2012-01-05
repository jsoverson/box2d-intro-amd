define(['Entities/Entity'],function(Entity){
  function fn(id, x, y, radius) {
    Entity.call(this, id, x, y);
    this.radius = radius;
  }
  fn.prototype = new Entity();
  fn.prototype.constructor = fn;

  fn.prototype.draw = function(ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x * CONF.SCALE, this.y * CONF.SCALE, this.radius * CONF.SCALE, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    Entity.prototype.draw.call(this, ctx);
  }
  return fn;
})
