define(['Entities/Entity'],function(Entity){
  function PolygonEntity(id, x, y, center, points) {
    Entity.call(this, id, x, y, center);
    this.points = points;
  }
  
  PolygonEntity.prototype = new Entity();
  PolygonEntity.prototype.constructor = PolygonEntity;

  PolygonEntity.prototype.draw = function(ctx) {
    var SCALE = CONF.SCALE;
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.moveTo((this.x + this.points[0].x) * SCALE, (this.y + this.points[0].y) * SCALE);
    for (var i = 1; i < this.points.length; i++) {
       ctx.lineTo((this.points[i].x + this.x) * SCALE, (this.points[i].y + this.y) * SCALE);
    }
    ctx.lineTo((this.x + this.points[0].x) * SCALE, (this.y + this.points[0].y) * SCALE);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
  }

  return PolygonEntity;
})
