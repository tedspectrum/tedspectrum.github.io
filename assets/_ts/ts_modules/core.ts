// Class Core
declare let eruda: any;
export interface State {
  id: string,
  onEnter?(context: { [key: string]: any }): void,
  onLeave?(context: { [key: string]: any }): void
}
export class StateMachine {
  context: { [key: string]: any } = {};
  current: State | null = null;
  currentId: string = '';
  previous: State | null = null;
  previousId: string = '';
  states: State[] = [];
  addState(newState: State) {
    this.states.push(newState);
  }
  addStates(newStates: State[]) {
    this.states = this.states.concat(newStates);
  }
  changeTo(id: string) {
    let newStates: State[] = this.states.filter(v => v.id === id);
    if (newStates.length > 0) {
      if(this.current !== null) {
        this.current.onLeave && this.current.onLeave(this.context);
        this.previous = this.current;
        this.previousId = this.currentId;
      }
      this.current = newStates[0];
      this.currentId = this.current.id;
      this.current.onEnter && this.current.onEnter(this.context);
    }
  }
  setContext(newContext: { [key: string]: any; }) {
    this.context = newContext;
  }
  setState(id: string) {
    let newStates: State[] = this.states.filter(v => v.id === id);
    if (newStates.length > 0) {
      if(this.current !== null) {
        this.previous = this.current;
        this.previousId = this.currentId;
      }
      this.current = newStates[0];
      this.currentId = this.current.id;
    } 
  }
}
export class Core {
  static addEruda = function (): void {
    const initEruda = function () {
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
    if (el === null) {
      el = document.body;
    }
    if (el !== null && document.fullscreenEnabled && document.fullscreenElement === null) {
      el.requestFullscreen();
    }
  }
  static addFullWindow = function (id: string) {
    /*
     move element to base of body, 
     inserts placeholder in old position
     adds body-cloak class to body
    */
    let el = document.getElementById(id),
      placeholderEl = document.createElement('div');
    if (el !== null && el.parentNode !== null && placeholderEl !== null) {
      placeholderEl.id = id + '-placeholder';
      placeholderEl.classList.add('hidden');
      el.parentNode.replaceChild(placeholderEl, el);
      document.body.appendChild(el);
      document.body.classList.add('body-cloak');
    }
  }
  static removeFullWindow = function (id: string) {
    /*
     swaps element with placeholder element
     removes body-cloak class to body
    */
    let el = document.getElementById(id),
      placeholderEl = document.getElementById(id + '-placeholder');
    if (el !== null && el.parentNode !== null && placeholderEl !== null && placeholderEl.parentNode !== null) {
      placeholderEl.parentNode.replaceChild(el, placeholderEl);
      document.body.classList.remove('body-cloak');
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