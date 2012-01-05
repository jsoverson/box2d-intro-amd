define(
['Entities/Entity','Entities/RectangleEntity','Entities/CircleEntity'],
function(Entity,Rectangle,Circle){
  return {
    Entity    : Entity,
    Rectangle : Rectangle,
    Circle    : Circle
  }
})