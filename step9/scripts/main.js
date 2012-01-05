'use strict';
require(['requestAnimationFrame','Entities','BoxTest'],function(requestAnimationFrame, Entities, BoxTest) {
  var canvas = document.getElementById('playingField');
  var context = canvas.getContext("2d");

  CONF.WIDTH = canvas.width;
  CONF.HEIGHT = canvas.height;

  var initialState = [
//    {id: "ground", x: CONF.WIDTH / 2 / CONF.SCALE, y: CONF.HEIGHT * 0.66 / CONF.SCALE, angle: (15 * Math.PI)/180, halfHeight: 0.5, halfWidth: CONF.WIDTH / CONF.SCALE, color: 'yellow'},
    {id: "ground", x: CONF.WIDTH / 2 / CONF.SCALE, y: CONF.HEIGHT * 0.66 / CONF.SCALE, angle: 0, halfHeight: 0.5, halfWidth: CONF.WIDTH / CONF.SCALE, color: 'yellow'},
    {id: "wheel1", x: 1, y: 4, radius: 1.5},
    {id: "wheel2", x: 6, y: 4, radius: 0.5},
    {id: "chassis", x: 3.5, y: 4, halfHeight: 0.15, halfWidth: 2.5}
  ];

  var world = {
    entities  : {}
  };
  var bodiesState = null;
  var box = null;

  function update(animStart) {
    box.update();
    bodiesState = box.getState();
    for (var id in bodiesState) {
      var entity = world.entities[id];
      if (entity) entity.update(bodiesState[id])
    }
  }

  function draw() {
    context.clearRect(0,0,CONF.WIDTH, CONF.HEIGHT)
    for (var id in world.entities) {
      var entity = world.entities[id];
      entity.draw(context);
    }

  }

  function init() {
    for (var i = 0; i < initialState.length; i++) {
      world.entities[initialState[i].id] = Entities.build(initialState[i]);
    }

    box = new BoxTest(60, false, CONF.WIDTH, CONF.HEIGHT, CONF.SCALE);
    box.setBodies(world.entities);
//    box.addRevoluteJoint("wheel1", "chassis"); // no motor
    box.addRevoluteJoint("wheel1", "chassis", {motorSpeed : -2, maxMotorTorque : 10});
    box.addRevoluteJoint("wheel2", "chassis");
    setTimeout(init,7000)
  }

  init();
  (function loop(animStart){
    update(animStart);
    draw();
    requestAnimationFrame(loop);
  })();

})