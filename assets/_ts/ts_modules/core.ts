export interface State {
  id: number,
  onEnter?(context: { [key: string]: any }, data: { [key: string]: any }): void,
  onLeave?(context: { [key: string]: any }, data: { [key: string]: any }): void,
  transitions: { id: number, to: number }[]
}
export class StateMachine {
  private context: { [key: string]: any } = {};
  private data: { [key: string]: any } = {};
  private current: number;
  private currentState: State;
  private emptyState: State = { id: -1, transitions: [] };
  private states: State[] = [];
  private transitions: number[][] = [];
  constructor(initialState: number, initialContext: { [key: string]: any } | null, initialStates: State[]) {
    this.setContext(initialContext);
    this.setStates(initialStates);
    let newState = this.states[initialState];
    this.currentState = (newState) ? newState : this.emptyState;
    this.current = this.currentState.id;
  }
  isInState(testState: number) {
    return (this.current === testState);
  }
  setContext(newContext: { [key: string]: any; } | null) {
    this.context = (newContext !== null) ? newContext : {};
  }
  setData(newData: { [key: string]: any; } | null) {
    this.data = (newData !== null) ? newData : {};
  }
  setState(newState: State) {
    // using sparse arrays
    this.transitions[newState.id] = [];
    newState.transitions.forEach(v => {
      this.transitions[newState.id][v.id] = v.to;
    })
    this.states[newState.id] = newState;
  }
  setStates(newStates: State[]) {
    newStates.forEach(v => { this.setState(v); });
  }
  transition(transitionId: number) {
    if (this.transitions !== undefined &&
      this.transitions[this.current] !== undefined &&
      this.transitions[this.current][transitionId] !== undefined &&
      this.states[this.transitions[this.current][transitionId]] !== undefined) {
      this.currentState.onLeave && this.currentState.onLeave(this.context, this.data);
      this.currentState = this.states[this.transitions[this.current][transitionId]];
      this.current = this.currentState.id;
      this.currentState.onEnter && this.currentState.onEnter(this.context, this.data);
    }
  }
}
// Class Core
declare let eruda: any;
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
  static removeStyle = function (id: string): void {
    Core.removeElementById(id);
  }
  static removeFullScreen = function (): void {
    if (document.fullscreenEnabled && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}