/* Modified heavily by Jarrod Overson http://jarrodoverson.com/ */
/*
Copyright 2011 Seth Ladd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

importScripts('../box2d.js');

function bTest(stepRate, conf) {
  this.stepRate = stepRate;

  this.lastTimestamp = Date.now();

  this.world = new Box2D.Dynamics.b2World(
    new Box2D.Common.Math.b2Vec2(0, 9.8), true
  );

  var SCALE = conf.SCALE;

  this.fixDef = new Box2D.Dynamics.b2FixtureDef;
  this.fixDef.density = 1.0;
  this.fixDef.friction = 0.5;
  this.fixDef.restitution = 0.2;

  this.bodyDef = new Box2D.Dynamics.b2BodyDef;

  //create ground
  this.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

  // positions the center of the object (not upper left!)
  this.bodyDef.position.x = conf.WIDTH / 2 / SCALE;
  this.bodyDef.position.y = conf.HEIGHT / SCALE;

  this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;

  // half width, half height. eg actual height here is 1 unit
  this.fixDef.shape.SetAsBox((600 / SCALE) / 2, (10/SCALE) / 2);
  this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
}

bTest.prototype.update = function() {
  var now = Date.now();
  var stepRate = this.stepRate;
  this.lastTimestamp = now;
  this.world.Step(stepRate, 10, 10);
  this.world.ClearForces();
  this.sendUpdate();
}

bTest.prototype.sendUpdate = function() {
  var entities = [];
  var body = this.world.GetBodyList();
  do {
    entities[body.GetUserData()] = [body.GetPosition().x, body.GetPosition().y, body.GetAngle()];
  } while (body = body.m_next)
  postMessage({entities : entities});
}

bTest.prototype.setBodies = function(bodyEntities) {
    this.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    for(var id in bodyEntities) {
        var entity = bodyEntities[id];
        if (entity.radius) {
            this.fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(entity.radius);
        } else {
            this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
            this.fixDef.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
        }
       this.bodyDef.position.x = entity.x;
       this.bodyDef.position.y = entity.y;
       this.bodyDef.userData = entity.id;
       this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
    }
    this.ready = true;
}

self.onmessage = function(e) {
  var box = new bTest(1/60,e.data.conf)
  box.setBodies(e.data.entities);

  (function loop() {
    if (box.ready) box.update();
    setTimeout(loop,30)
  })()

};