'use strict';
require(['requestAnimationFrame','Entities','BoxTest'],function(requestAnimationFrame, Entities, BoxTest) {
  var canvas = document.getElementById('playingField');
  var context = canvas.getContext("2d");

  CONF.WIDTH = canvas.width;
  CONF.HEIGHT = canvas.height;

  var initialState = {
    0 : { id : 0, x : 10, y : 5, radius : 2},
    1 : { id : 1, x : 5, y : 5, polys : [
      [{x:0,y:0},{x:1,y:0},{x:0,y:2}]
    ]},
    2 : { id : 2, x : 9, y : 4, halfHeight : 1.5, halfWidth : 0.9},
    3 : { id : 3, x : 4.5, y : 3, polys : [
      [{x:0,y:-2},{x:2,y:0},{x:0,y:2},{x:-0.5,y:1.5}]
    ]},
    4 : { id: 4, x: 10, y: 10, color : "green", polys : [
      [{x: -1, y: -1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}], // box
      [{x: 1, y: -1.5}, {x: 2, y: 0}, {x: 1, y: 1.5}]  // arrow
    ]}
  }

  var world = {
    entities  : []
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
    for (var i in initialState) {
      world.entities[i] = Entities.build(initialState[i]);
    }

    box = new BoxTest(60, false, CONF.WIDTH, CONF.HEIGHT, CONF.SCALE);
    box.setBodies(world.entities)
    setTimeout(init,5000)
  }

  init();
  (function loop(animStart){
    update(animStart);
    draw();
    requestAnimationFrame(loop);
  })();

})