// Class Core
declare let eruda: any;
export class Core {
  static addEruda = function (): void {
    const initEruda = function() {
        eruda.init();
      }
    if (document.getElementById('eruda-script') === null) {
      let el = document.createElement('script');
      if (el !== null && document.body) {
        el.id = 'eruda-script';
        el.src = '//cdn.jsdelivr.net/npm/eruda';
        el.onload = initEruda;
        document.body.appendChild(el);
      }
    } else {
      initEruda();
    }
  }
  static addFullScreen = function (id: string) {
    let el = document.getElementById(id);
    if (el !== null && document.fullscreenEnabled && document.fullscreenElement === null) {
      el.requestFullscreen();
    }
  }
  static addStyle = function (id: string, content: string): void {
    if (document.getElementById(id) === null) {
      let el = document.createElement('style');
      if (el !== null && document.head) {
        el.id = id;
        el.innerHTML = content;
        document.head.appendChild(el);
      }
    }
  }
  static removeElementById = function (id: string): void {
    let el = document.getElementById(id);
    if (el !== null && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }
  static removeEruda = function (): void {
    Core.removeElementById('eruda-script');
    if (eruda) { eruda.destroy(); }
  }
  static removeStyle = function (id: string): void {
    Core.removeElementById(id);
  }
  static removeFullScreen = function (): void {
    if (document.fullscreenEnabled && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}