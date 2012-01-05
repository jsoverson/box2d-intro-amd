define(['Entities/Entity'],function(Entity){
  function RectangleEntity(id, x, y, center, color, halfWidth, halfHeight) {
    color = color || 'magenta';
    Entity.call(this, id, x, y, center, color);
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }
  RectangleEntity.prototype = new Entity();
  RectangleEntity.prototype.constructor = RectangleEntity;

  RectangleEntity.prototype.draw = function(ctx) {
    var SCALE = CONF.SCALE;
    
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.color;
    ctx.fillRect((this.x-this.halfWidth) * SCALE,
                 (this.y-this.halfHeight) * SCALE,
                 (this.halfWidth*2) * SCALE,
                 (this.halfHeight*2) * SCALE);
    ctx.strokeRect((this.x-this.halfWidth) * SCALE,
                 (this.y-this.halfHeight) * SCALE,
                 (this.halfWidth*2) * SCALE,
                 (this.halfHeight*2) * SCALE);
    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
  }

  return RectangleEntity;
})
