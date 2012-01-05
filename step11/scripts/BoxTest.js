define(['box2d'],function(){

  function BoxTest(intervalRate, adaptive, width, height, scale) {
    this.intervalRate = parseInt(intervalRate);
    this.adaptive = adaptive;
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.bodiesMap = {};

    this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);

    this.fixDef = new Box2D.Dynamics.b2FixtureDef;
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.2;

//    this.bodyDef = new Box2D.Dynamics.b2BodyDef;

//    this.buildGround();
  }

  BoxTest.prototype.buildGround = function() {
    this.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    this.bodyDef.position.x = this.width / 2 / this.scale;
    this.bodyDef.position.y = this.height / this.scale;
    this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
    this.fixDef.shape.SetAsBox(
      (this.width - (this.width * .1 / this.scale)) / 2,
      10 / this.scale / 2
    );
    this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
  }


  BoxTest.prototype.update = function() {
    var start = Date.now();
    var stepRate = (this.adaptive) ? (now - this.lastTimestamp) / 1000 : (1 / this.intervalRate);
    this.world.Step(stepRate, 10, 10);
    this.world.ClearForces();
    return (Date.now() - start);
  }

  BoxTest.prototype.getState = function() {
    var state = {};
    for (var b = this.world.GetBodyList(); b; b = b.m_next) {
      if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
        state[b.GetUserData()] = this.getBodySpec(b);
      }
    }
    return state;
  }

  BoxTest.prototype.getBodySpec = function(b) {
    return [b.GetPosition().x, b.GetPosition().y, b.GetAngle(), {x: b.GetWorldCenter().x, y: b.GetWorldCenter().y}];
  }

  BoxTest.prototype.setBodies = function(bodyEntities) {
    var bodyDef = new Box2D.Dynamics.b2BodyDef;

    for (var id in bodyEntities) {
      var entity = bodyEntities[id];

      if (entity.id === 'ground') {
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
      } else {
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
      }

      bodyDef.position.x = entity.x;
      bodyDef.position.y = entity.y;
      bodyDef.angle = entity.angle;
      bodyDef.userData = entity.id;
      var body = this.registerBody(bodyDef);

      if (entity.radius) {
        this.fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(entity.radius);
        body.CreateFixture(this.fixDef);
      } else if (entity.polys) {
        for (var j = 0; j < entity.polys.length; j++) {
          var points = entity.polys[j];
          var vecs = [];
          for (var i = 0; i < points.length; i++) {
            var vec = new Box2D.Common.Math.b2Vec2();
            vec.Set(points[i].x, points[i].y);
            vecs[i] = vec;
          }
          this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
          this.fixDef.shape.SetAsArray(vecs, vecs.length);
          body.CreateFixture(this.fixDef);
        }
      } else {
        this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        this.fixDef.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
        body.CreateFixture(this.fixDef);
      }
    }
    this.ready = true;
  }

  BoxTest.prototype.registerBody = function(bodyDef) {
    var body = this.world.CreateBody(bodyDef);
    this.bodiesMap[body.GetUserData()] = body;
    return body;
  }

  BoxTest.prototype.addRevoluteJoint = function(bid1,bid2,params) {
    var body1 = this.bodiesMap[bid1];
    var body2 = this.bodiesMap[bid2];
    var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    joint.Initialize(body1,body2,body1.GetWorldCenter());
    if (params && params.motorSpeed) {
      joint.motorSpeed = params.motorSpeed;
      joint.maxMotorTorque = params.maxMotorTorque;
      joint.enableMotor = true;
    }
    this.world.CreateJoint(joint)
  }
  BoxTest.prototype.applyImpulse = function(bid, degrees, power) {
    var body = this.bodiesMap[bid];
    body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(
        Math.cos(degrees * (Math.PI / 180)) * power,
        Math.sin(degrees * (Math.PI / 180)) * power),
      body.GetWorldCenter()
    );
  }

  return BoxTest;
})
