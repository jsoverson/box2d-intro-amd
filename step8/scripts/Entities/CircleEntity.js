define(['Entities/Entity'],function(Entity){
  function CircleEntity(id, x, y, center, color, radius) {
    color = color || 'blue'
    Entity.call(this, id, x, y, center, color);
    this.radius = radius;
  }
  
  CircleEntity.prototype = new Entity();
  CircleEntity.prototype.constructor = CircleEntity;

  CircleEntity.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x * CONF.SCALE, this.y * CONF.SCALE, this.radius * CONF.SCALE, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    Entity.prototype.draw.call(this, ctx);
  }
  return CircleEntity;
})
