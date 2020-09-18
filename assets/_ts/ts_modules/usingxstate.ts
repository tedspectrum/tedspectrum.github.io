// global xstate
declare var XState: any;
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
            assign({ 'message': (context: any) => { return (context.message = 'leaving inactive'); } })
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
},
  {
    actions: {
      onActive: (context: any, event: any) => {
        context.message = 'peekaboo!';
      },
      onInActive: (context: any, event: any) => {
        context.message = 'hush!';
      }
    }
  }
);
const appTemplate = /*html*/`
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
    // Start service on component creation
    this.toggleService
      .onTransition((state: any) => {
        // Update the current state component data property with the next state
        this.current = state;
        // Update the context component data property with the updated context
        this.context = state.context;
      })
      .start();
  },
  data() {
    return {
      title: 'Post app',
      description: `Using xstate`,
      // Interpret the machine and store it in data
      toggleService: interpret(toggleMachine),

      // Start with the machine's initial state
      current: toggleMachine.initialState,

      // Start with the machine's initial context
      context: toggleMachine.context,
    };
  },
  methods: {
    // Send events to the service
    send(event: any) {
      this.toggleService.send(event);
      this.toggleService.send('update');
    }
  }
});
// mount app
new App().$mount('#postapp');