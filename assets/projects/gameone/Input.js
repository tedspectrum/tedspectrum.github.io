/*eslint no-unused-vars: "off"*/
function Input() {
  /*
    
    config {
      action: key
      eg. up: 'w', down: 's'
    }
  */
  var key = {},
    keyAction = {},
    keyEventsActive = false,
    keyEventSrc = null,
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
    if (keyEventsActive === false) {
      keyEventSrc.addEventListener("keydown", onKeyDown);
      keyEventSrc.addEventListener("keyup", onKeyUp);
      keyEventsActive = true;
    }
  };
  this.stop = function () {
    if (keyEventsActive === true) {
      keyEventSrc.removeEventListener("keydown", onKeyDown);
      keyEventSrc.removeEventListener("keyup", onKeyUp);
      keyEventsActive = false;
    }
  };
  this.setKeys = function (eventSrc, newKeys) {
    if (keyEventsActive) {
      this.stop();
    }
    keyEventSrc = eventSrc;
    this.start();
    keyAction = {};
    key = {};
    for (let prop in newKeys) {
      if (Object.prototype.hasOwnProperty.call(newKeys, prop)) {
        key[newKeys[prop]] = true;
        keyAction[newKeys[prop]] = prop;
      }
    }
  };
  Object.defineProperty(this, "key", {
    enumerable: true,
    get: function () {
      return action;
    },
  });
}
