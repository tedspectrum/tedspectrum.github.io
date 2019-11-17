function Core() {
  const d = document,
    GUIDre = /[xy]/g,
    GUIDpattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    w = window;
  var debounceTimeoutID = null,
    isErudaActive = false;
  function GUIDhelper(match) {
    let r = Math.random() * 16 | 0,
      v = match === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }
  this.debounce = function (ctx, fn, delay) {
    (debounceTimeoutID !== null) && w.clearTimeout(dbID);
    return function () {
      debounceTimeoutID = w.setTimeout(function () { fn.call(ctx); debounceTimeoutID = null; }, delay);
    }
  }
  this.eruda = function () {
    if (!isErudaActive) {
      let el = d.createElement('script');
      el.src = "//cdn.jsdelivr.net/npm/eruda";
      el.onload = function () { eruda.init(); }
      d.body.appendChild(el);
      isErudaActive = true;
    }
  }
  this.guid = function () {
    return GUIDpattern.replace(GUIDre, GUIDhelper);
  }
  this.toggleFullScreen = function (el) {
    if (d.fullscreenEnabled) {
      if (d.fullscreenElement === null) {
        el && el.requestFullscreen();
      } else {
        d.exitFullscreen();
      }
    }
  }
  this.windowWidth = function () {
    if (w.innerWidth) {
      return w.innerWidth;
    } else if (d.documentElement.clientWidth) {
      return d.documentElement.clientWidth;
    } else if (d.body.clientWidth) {
      return d.body.clientWidth;
    }
    return 0;
  }
  this.windowHeight = function () {
    if (w.innerHeight) {
      return w.innerHeight;
    } else if (d.documentElement.clientHeight) {
      return d.documentElement.clientHeight;
    } else if (d.body.clientHeight) {
      return d.body.clientHeight;
    }
    return 0;
  }
}
