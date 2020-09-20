var StateMachine = (function () {
    function StateMachine() {
        this.context = {};
        this.current = null;
        this.currentId = '';
        this.previous = null;
        this.previousId = '';
        this.states = [];
    }
    StateMachine.prototype.addState = function (newState) {
        this.states.push(newState);
    };
    StateMachine.prototype.addStates = function (newStates) {
        this.states = this.states.concat(newStates);
    };
    StateMachine.prototype.changeTo = function (id) {
        var newStates = this.states.filter(function (v) { return v.id === id; });
        if (newStates.length > 0) {
            if (this.current !== null) {
                this.current.onLeave && this.current.onLeave(this.context);
                this.previous = this.current;
                this.previousId = this.currentId;
            }
            this.current = newStates[0];
            this.currentId = this.current.id;
            this.current.onEnter && this.current.onEnter(this.context);
        }
    };
    StateMachine.prototype.setContext = function (newContext) {
        this.context = newContext;
    };
    StateMachine.prototype.setState = function (id) {
        var newStates = this.states.filter(function (v) { return v.id === id; });
        if (newStates.length > 0) {
            if (this.current !== null) {
                this.previous = this.current;
                this.previousId = this.currentId;
            }
            this.current = newStates[0];
            this.currentId = this.current.id;
        }
    };
    return StateMachine;
}());
export { StateMachine };
var Core = (function () {
    function Core() {
    }
    Core.addEruda = function () {
        var initEruda = function () {
            eruda.init();
        };
        if (document.getElementById('eruda-script') === null) {
            var el = document.createElement('script');
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
        var el = document.getElementById(id);
        if (el === null) {
            el = document.body;
        }
        if (el !== null && document.fullscreenEnabled && document.fullscreenElement === null) {
            el.requestFullscreen();
        }
    };
    Core.addFullWindow = function (id) {
        var el = document.getElementById(id), placeholderEl = document.createElement('div');
        if (el !== null && el.parentNode !== null && placeholderEl !== null) {
            placeholderEl.id = id + '-placeholder';
            placeholderEl.classList.add('hidden');
            el.parentNode.replaceChild(placeholderEl, el);
            document.body.appendChild(el);
            document.body.classList.add('body-cloak');
        }
    };
    Core.removeFullWindow = function (id) {
        var el = document.getElementById(id), placeholderEl = document.getElementById(id + '-placeholder');
        if (el !== null && el.parentNode !== null && placeholderEl !== null && placeholderEl.parentNode !== null) {
            placeholderEl.parentNode.replaceChild(el, placeholderEl);
            document.body.classList.remove('body-cloak');
        }
    };
    Core.addStyle = function (id, content) {
        if (document.getElementById(id) === null) {
            var el = document.createElement('style');
            if (el !== null && document.head) {
                el.id = id;
                el.innerHTML = content;
                document.head.appendChild(el);
            }
        }
    };
    Core.removeElementById = function (id) {
        var el = document.getElementById(id);
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
    Core.removeStyle = function (id) {
        Core.removeElementById(id);
    };
    Core.removeFullScreen = function () {
        if (document.fullscreenEnabled && document.fullscreenElement) {
            document.exitFullscreen();
        }
    };
    return Core;
}());
export { Core };
