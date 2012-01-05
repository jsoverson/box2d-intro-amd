define(['Entities/Entity'],function(Entity){
  function fn(id, x, y, halfWidth, halfHeight) {
    Entity.call(this, id, x, y);
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }
  fn.prototype = new Entity();
  fn.prototype.constructor = fn;

  fn.prototype.draw = function(ctx) {
    var SCALE = CONF.SCALE;
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = 'red';
    ctx.fillRect((this.x-this.halfWidth) * SCALE,
                 (this.y-this.halfHeight) * SCALE,
                 (this.halfWidth*2) * SCALE,
                 (this.halfHeight*2) * SCALE);
    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
  }

  return fn;
})
