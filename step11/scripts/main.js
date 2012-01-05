'use strict';
require(['requestAnimationFrame','Entities','BoxTest'],function(requestAnimationFrame, Entities, BoxTest) {
  var canvas = document.getElementById('playingField');
  var context = canvas.getContext("2d");

  var W = CONF.WIDTH  = canvas.width,
      H = CONF.HEIGHT = canvas.height,
      SCALE = CONF.SCALE;

  var initialState = [
    {id: "ground", x: W / 2 / SCALE, y: H / SCALE, halfHeight: 0.5, halfWidth: W / SCALE, color: 'yellow'},
    {id: "ball", x: 2, y: H / SCALE - 2, radius: 0.5, color : "#E3002A"},
    {id: "target", x: 17, y: H / SCALE - 6, radius: 0.5, color: "#68DB30"},
    {id: "v1", x:13, y: H / SCALE - 1, halfHeight: 2, halfWidth: 0.10, color : "#DC9223"},
    {id: "v2", x:17, y: H / SCALE - 1, halfHeight: 2, halfWidth: 0.10, color : "#DC9223"},
    {id: "v3", x:21, y: H / SCALE - 1, halfHeight: 2, halfWidth: 0.10, color : "#DC9223"},
    {id: "h1", x:19, y: H / SCALE - 5, halfHeight: 0.25, halfWidth: 2, color : "#DC9223"},
    {id: "h2", x:15, y: H / SCALE - 5, halfHeight: 0.25, halfWidth: 2, color : "#DC9223"}
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
    setTimeout(function() {
        box.applyImpulse("ball", 70, 30);
    }, 1000);

    setTimeout(init,7000)
  }

  init();
  (function loop(animStart){
    update(animStart);
    draw();
    requestAnimationFrame(loop);
  })();

})