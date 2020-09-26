export class StateMachine {
    constructor(initialContext, configObject) {
        this.context = {};
        this.data = {};
        this.emptyState = { id: -1, transitions: [] };
        this.states = [];
        this.transitions = [];
        this.setContext(initialContext);
        this.setData(configObject.data);
        this.setStates(configObject.states);
        let newState = this.states[configObject.initialState];
        this.currentState = (newState) ? newState : this.emptyState;
        this.current = this.currentState.id;
    }
    isInState(testState) {
        return (this.current === testState);
    }
    setContext(newContext) {
        this.context = (newContext !== null) ? newContext : {};
    }
    setData(newData) {
        this.data = (newData !== null) ? newData : {};
    }
    setState(newState) {
        this.transitions[newState.id] = [];
        newState.transitions.forEach(v => {
            this.transitions[newState.id][v.id] = v.to;
        });
        this.states[newState.id] = newState;
    }
    setStates(newStates) {
        newStates.forEach(v => { this.setState(v); });
    }
    transition(transitionId) {
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
export class Core {
}
Core.addEruda = function () {
    const initEruda = function () {
        eruda.init();
    };
    if (document.getElementById('eruda-script') === null) {
        let el = document.createElement('script');
        if (el !== null && document.body) {
            el.id = 'eruda-script';
            el.src = '//cdn.jsdelivr.net/npm/eruda';
            el.onload = initEruda;
            document.body.appendChild(el);
        }
    }
    else {
        initEruda();
    }
};
Core.addFullScreen = function (id) {
    let el = document.getElementById(id);
    if (el === null) {
        el = document.body;
    }
    if (el !== null && document.fullscreenEnabled && document.fullscreenElement === null) {
        el.requestFullscreen();
    }
};
Core.addFullWindow = function (id) {
    let el = document.getElementById(id), placeholderEl = document.createElement('div');
    if (el !== null && el.parentNode !== null && placeholderEl !== null) {
        placeholderEl.id = id + '-placeholder';
        placeholderEl.classList.add('hidden');
        el.parentNode.replaceChild(placeholderEl, el);
        document.body.appendChild(el);
        document.body.classList.add('body-cloak');
    }
};
Core.addStyle = function (id, content) {
    if (document.getElementById(id) === null) {
        let el = document.createElement('style');
        if (el !== null && document.head) {
            el.id = id;
            el.innerHTML = content;
            document.head.appendChild(el);
        }
    }
};
Core.removeElementById = function (id) {
    let el = document.getElementById(id);
    if (el !== null && el.parentNode !== null) {
        el.parentNode.removeChild(el);
    }
};
Core.removeEruda = function () {
    Core.removeElementById('eruda-script');
    if (eruda) {
        eruda.destroy();
    }
};
Core.removeFullWindow = function (id) {
    let el = document.getElementById(id), placeholderEl = document.getElementById(id + '-placeholder');
    if (el !== null && el.parentNode !== null && placeholderEl !== null && placeholderEl.parentNode !== null) {
        placeholderEl.parentNode.replaceChild(el, placeholderEl);
        document.body.classList.remove('body-cloak');
    }
};
Core.removeStyle = function (id) {
    Core.removeElementById(id);
};
Core.removeFullScreen = function () {
    if (document.fullscreenEnabled && document.fullscreenElement) {
        document.exitFullscreen();
    }
};
export const PanelComponent = {
    name: 'teds-panel',
    template: `
    <div>
      <transition :name="overlay_transition">
        <div v-show="showPanel && showOverlay" 
          class="overlay"
          :class="overlay_classes"
          @click="$emit('panel-activate', model, false)"></div>
      </transition>
      <transition :name="panel_transition">
        <div v-show="showPanel" 
          class="panel" 
          :class="panel_classes">
          <slot></slot>
        </div>
      </transition>
    </div>`,
    props: {
        model: {
            type: Object,
            required: true
        },
        overlay_classes: {
            type: String,
            default: ""
        },
        overlay_transition: {
            type: String,
            default: "fadeinout"
        },
        panel_classes: {
            type: String,
            default: "panel-fullheightleft"
        },
        panel_transition: {
            type: String,
            default: "slideright"
        },
        showPanel: {
            type: Boolean,
            required: true
        },
        showOverlay: {
            type: Boolean,
            default: true
        }
    }
};
