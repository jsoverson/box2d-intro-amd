define(['Entities/Entity'],function(Entity){
  function CircleEntity(id, x, y, center, radius) {
    Entity.call(this, id, x, y, center);
    this.radius = radius;
  }
  
  CircleEntity.prototype = new Entity();
  CircleEntity.prototype.constructor = CircleEntity;

  CircleEntity.prototype.draw = function(ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x * CONF.SCALE, this.y * CONF.SCALE, this.radius * CONF.SCALE, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    Entity.prototype.draw.call(this, ctx);
  }
  return CircleEntity;
})
