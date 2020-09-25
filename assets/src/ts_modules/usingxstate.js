"use strict";
const { Machine, assign, actions, interpret } = XState;
const toggleMachine = Machine({
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
                        assign({ 'message': (context) => { return (context.message = 'leaving inactive'); } })
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
        onActive: (context, event) => {
            context.message = 'peekaboo!';
        },
        onInActive: (context, event) => {
            context.message = 'hush!';
        }
    }
});
const appTemplate = `
<div id="postapp" class="app-container" v-cloak>
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <div class="app layout-rows">
    <div class="app-header">
      <h1>
      <svg viewBox="0 0 20 20" fill="currentColor" class="menu--svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      {{ title }}</h1>
    </div>
    <div>
      <p>{{ context.message }}</p>
      <button v-on:click="send('TOGGLE')">
        {{ current.matches("inactive") ? "Off" : "On" }}
      </button>
    </div>
    <div class="app-footer">
      <span>By TedSpectrum</span>
    </div>
  </div>
</div>
`;
const App = Vue.extend({
    template: appTemplate,
    created() {
        this.toggleService
            .onTransition((state) => {
            this.current = state;
            this.context = state.context;
        })
            .start();
    },
    data() {
        return {
            title: 'Post app',
            description: `Using xstate`,
            toggleService: interpret(toggleMachine),
            current: toggleMachine.initialState,
            context: toggleMachine.context,
        };
    },
    methods: {
        send(event) {
            this.toggleService.send(event);
            this.toggleService.send('update');
        }
    }
});
new App().$mount('#postapp');
