'use strict';
require(['requestAnimationFrame','box2d'],function(requestAnimationFrame) {
  var canvas = document.getElementById('playingField');
  var SCALE = 10;
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  console.log(canvas);

  var world = new Box2D.Dynamics.b2World (new Box2D.Common.Math.b2Vec2(0,10),true);

  var fixDef = new Box2D.Dynamics.b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;

  var bodyDef = new Box2D.Dynamics.b2BodyDef;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
  bodyDef.position.x = WIDTH / 2 / SCALE;
  bodyDef.position.y = HEIGHT / SCALE;

  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixDef.shape.SetAsBox(600 / SCALE / 2, 10 / SCALE / 2)

  world.CreateBody(bodyDef).CreateFixture(fixDef);

  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  for (var i = 0; i < 100; ++i) {
    var middle = WIDTH / 2 / SCALE;
    bodyDef.position.y = Math.random() * 10;
    bodyDef.position.x = Math.random() > 0.5 ? middle + Math.random() * 15 : middle - Math.random() * 15;

    if (Math.random() > 0.5) {
      fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
      fixDef.shape.SetAsBox(Math.random() + .1, Math.random() + 0.1)
    } else {
      fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(Math.random() + 0.1)
    }

    world.CreateBody(bodyDef).CreateFixture(fixDef);
  }

  var debugDraw = new Box2D.Dynamics.b2DebugDraw();
  debugDraw.SetSprite(canvas.getContext("2d"));
  debugDraw.SetDrawScale(SCALE);
  debugDraw.SetFillAlpha(0.3);
  debugDraw.SetLineThickness(1);
  debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit)
  world.SetDebugDraw(debugDraw)

  function update() {
    world.Step(1/60, 10, 10);
    world.DrawDebugData();
    world.ClearForces();
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
})