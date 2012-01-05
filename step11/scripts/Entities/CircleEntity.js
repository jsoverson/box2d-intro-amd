define(['Entities/Entity'],function(Entity){
  function CircleEntity(id, x, y, angle, center, color, radius) {
    color = color || 'aqua'
    Entity.call(this, id, x, y, angle, center, color);
    this.radius = radius;
  }
  
  CircleEntity.prototype = new Entity();
  CircleEntity.prototype.constructor = CircleEntity;

  CircleEntity.prototype.draw = function(ctx) {
    var SCALE = CONF.SCALE;

    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-this.x * SCALE, -this.y * SCALE)

    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE, 0, Math.PI * 2, true);
    ctx.moveTo(this.x * SCALE, this.y * SCALE);
    ctx.lineTo(this.x * SCALE, (this.y + this.radius) * SCALE);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.restore();
    
    Entity.prototype.draw.call(this, ctx);
  }
  return CircleEntity;
})
