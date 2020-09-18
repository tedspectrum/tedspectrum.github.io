"use strict";
var Machine = XState.Machine, assign = XState.assign, actions = XState.actions, interpret = XState.interpret;
var toggleMachine = Machine({
    id: 'toggle',
    context: {
        message: 'initial message'
    },
    initial: 'inactive',
    states: {
        inactive: {
            on: {
                TOGGLE: {
                    target: 'active',
                    actions: [
                        assign({ 'message': function (context) { return (context.message = 'leaving inactive'); } })
                    ]
                }
            }
        },
        active: {
            on: {
                TOGGLE: {
                    target: 'inactive',
                    actions: ['onInActive']
                }
            }
        }
    }
}, {
    actions: {
        onActive: function (context, event) {
            context.message = 'peekaboo!';
        },
        onInActive: function (context, event) {
            context.message = 'hush!';
        }
    }
});
var appTemplate = "\n<div id=\"postapp\" class=\"app-container\" v-cloak>\n  <div v-show=\"false\">\n  <!-- cache, give elements ref=\"\" to reference in methods -->\n  </div>\n  <div class=\"app layout-rows\">\n    <div class=\"app-header\">\n      <h1>\n      <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"menu--svg\"><path fill-rule=\"evenodd\" d=\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\" clip-rule=\"evenodd\"></path></svg>\n      {{ title }}</h1>\n    </div>\n    <div>\n      <p>{{ context.message }}</p>\n      <button v-on:click=\"send('TOGGLE')\">\n        {{ current.matches(\"inactive\") ? \"Off\" : \"On\" }}\n      </button>\n    </div>\n    <div class=\"app-footer\">\n      <span>By TedSpectrum</span>\n    </div>\n  </div>\n</div>\n";
var App = Vue.extend({
    template: appTemplate,
    created: function () {
        var _this = this;
        this.toggleService
            .onTransition(function (state) {
            _this.current = state;
            _this.context = state.context;
        })
            .start();
    },
    data: function () {
        return {
            title: 'Post app',
            description: "Using xstate",
            toggleService: interpret(toggleMachine),
            current: toggleMachine.initialState,
            context: toggleMachine.context,
        };
    },
    methods: {
        send: function (event) {
            this.toggleService.send(event);
            this.toggleService.send('update');
        }
    }
});
new App().$mount('#postapp');
