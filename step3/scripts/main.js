'use strict';
require(['requestAnimationFrame','Entities','box2d'],function(requestAnimationFrame, Entities) {
  var canvas = document.getElementById('playingField');
  var context = canvas.getContext("2d");

  CONF.WIDTH = canvas.width;
  CONF.HEIGHT = canvas.height;

  function randomEntity(id) {
    var x = Math.random() * 20;
    var y = Math.random() * 10;

    if (Math.random() > 0.5) {
      return new Entities.Circle(id, x, y, Math.random() + 0.1);
    } else {
      return new Entities.Rectangle(id, x, y, Math.random() + 0.1, Math.random() + 0.1);
    }
  }

  var world = {
    entities  : [],
    conf      : CONF,
    upToDate  : true
  };

  for (var i = 0; i < 150; i++) world.entities[i] = randomEntity(i);

  var worker = new Worker('scripts/workers/Physics.js');
  worker.onerror   = function(e) {console.log(arguments)}
  worker.onmessage = function(e) {
    world.upToDate = true;
    if (typeof e.data == 'string') return console.log (e.data)
    if (e.data.entities) {
      for (var i = 0; i < e.data.entities.length; i++) {
        var entity = world.entities[i];
        if (entity) entity.update(e.data.entities[i]);
      }
    }
  };

  worker.postMessage(world);

  (function draw() {
    if (world.upToDate) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < world.entities.length; i++) {
        var entity = world.entities[i];
        entity.draw(context);
      }
    }
    world.upToDate = false;
    requestAnimationFrame(draw);
  })();
})