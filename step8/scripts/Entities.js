define(
[
  'Entities/Entity',
  'Entities/PolygonEntity',
  'Entities/RectangleEntity',
  'Entities/CircleEntity'
],
function(Entity,Polygon,Rectangle,Circle){
  var NULL_CENTER = {x:null, y:null};
  return {
    build : function(def) {
      var rv;
      if (def.radius) {
        rv = new Circle(def.id, def.x, def.y, NULL_CENTER, def.color, def.radius);
      } else if (def.polys) {
        rv = new Polygon(def.id, def.x, def.y, NULL_CENTER, def.color, def.polys);
      } else {
        rv = new Rectangle(def.id, def.x, def.y, NULL_CENTER, def.color, def.halfWidth, def.halfHeight);
      }
      return rv;
    },
    Entity    : Entity,
    Polygon   : Polygon,
    Rectangle : Rectangle,
    Circle    : Circle
  }
})