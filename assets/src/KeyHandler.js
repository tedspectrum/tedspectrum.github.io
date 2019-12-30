function KeyHandler(eventSrc, config) {
  /*
    
    config {
      action: key
      eg. up: 'w', down: 's'
    }
  */
  var key = {},
    keyAction = {},
    action = {};
  function onKeyDown(e) {
    if (e.key && key[e.key] === true) {
      action[keyAction[e.key]] = true;
    }
  }
  function onKeyUp(e) {
    if (e.key && key[e.key] === true) {
      action[keyAction[e.key]] = false;
    }
  }
  this.start = function () {
    action = {};
    eventSrc.addEventListener('keydown', onKeyDown);
    eventSrc.addEventListener('keyup', onKeyUp);
  }
  this.stop = function () {
    eventSrc.removeEventListener('keydown', onKeyDown);
    eventSrc.removeEventListener('keyup', onKeyUp);
  }
  this.setKeys = function (newKeys) {
    keyAction = {};
    key = {};
    action = {};
    for (var prop in newKeys) {
      if (newKeys.hasOwnProperty(prop)) {
        key[newKeys[prop]] = true;
        keyAction[newKeys[prop]] = prop;
      }
    }
  }
  Object.defineProperty(this, 'key', {
    'enumerable': true,
    'get': function () {
      return action;
    }
  });
  this.setKeys(config);
}