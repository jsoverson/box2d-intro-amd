define(function(){
  function Entity(id, x, y, center) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.center = center;
    this.angle = 0;
  }

  Entity.prototype.update = function(state) {
    this.x = state[0];
    this.y = state[1];
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

  Entity.build = function(def) {
    if (def.radius) {
      return new CircleEntity(def.id, def.x, def.y, NULL_CENTER, def.radius);
    } else if (def.points) {
      return new PolygonEntity(def.id, def.x, def.y, NULL_CENTER, def.points);
    } else {
      return new RectangleEntity(def.id, def.x, def.y, NULL_CENTER, def.halfWidth, def.halfHeight);
    }
  }

  return Entity;
})


