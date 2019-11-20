function Core() {
  const d = document,
    GUIDre = /[xy]/g,
    GUIDpattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    w = window;
  var c = null, // cache for dom elements 
    db = null, // debounce timeout ID
    fwEl = null, // dom element in cache for file writing
    frEl = null, // dom element in cache for file reading
    isErudaActive = false;
  function GUIDhelper(match) {
    let r = Math.random() * 16 | 0,
      v = match === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }
  this.DOMCacheCreate = function (el) {
    c = d.createElement('div');
    c.style.display = "none";
    el ? el.appendChild(c) : d.body.appendChild(c);
    return c;
  }
  this.DOMCacheGet = function () {
    return c;
  }
  this.DOMCacheAdd = function (el) {
    if (c === null) {
      this.DOMCacheCreate();
    }
    c.appendChild(el);
    return c;
  }
  this.debounce = function (ctx, fn, delay) {
    (db !== null) && w.clearTimeout(db);
    return function () {
      db = w.setTimeout(function () { fn.call(ctx); db = null; }, delay);
    }
  }
  this.eruda = function () {
    if (!isErudaActive) {
      let el = d.createElement('script');
      el.src = "//cdn.jsdelivr.net/npm/eruda";
      el.onload = function () { eruda.init(); }
      this.DOMCacheAdd(el);
      isErudaActive = true;
    }
  }
  this.fileReadText = function (cb) {
    if (w && w.hasOwnProperty('FileReader')) {
      if (frEl === null) {
        frEl = d.createElement('input');
        frEl.type = 'file';
        this.DOMCacheAdd(frEl);
      }
      frEl.onchange = function (ev) {
        let i = 0, rdr = new FileReader();
        for (i = 0; i < ev.target.files.length; i++) {
            let idx = i;
            // cb arguments; event object with .target.result property, file, index, filelist
            rdr.onload = function(rdrev) {
              cb.call(null, rdrev, ev.target.files[idx], idx, ev.target.files);
            }
            rdr.readAsText(ev.target.files[i], 'UTF-8');
        }
      };
      frEl.click();
    }
  }
  this.fileWriteText = function (fileName, fileContents) {
    if (w && w.Blob && w.URL && w.URL.createObjectURL && fileName && fileContents) {
      let txtBlob = new Blob([fileContents], { type: 'text/plain' });
      if (navigator && navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(txtBlob, fileName);
      } else {
        if (fwEl === null) {
          fwEl = d.createElement('a');
          this.DOMCacheAdd(fwEl);
        }
        fwEl.download = fileName;
        fwEl.href = window.URL.createObjectURL(txtBlob);
        fwEl.click();
      }
    }
  }
  this.GUIDCreate = function () {
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
