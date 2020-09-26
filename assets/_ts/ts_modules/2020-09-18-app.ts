import { Core, StateMachine } from './core.js'
const PanelComponent = {
  name: 'teds-panel',
  template: /*html*/`
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
// state machines
const enum States {
  off,
  on,
  new,
  mounted,
  page,
  fullscreen,
  fullwindow
}
const enum Transitions {
  leaveFullscreen,
  leaveFullwindow,
  mount,
  resize,
  showFullscreen,
  showFullwindow,
  showPage,
  switchOff,
  switchOn,
  toggle
}
const AppViewMachine = new StateMachine(States.new, null, [
  {
    id: States.new,
    transitions: [
      { id: Transitions.mount, to: States.mounted }
    ]
  },
  {
    id: States.mounted,
    onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
      window.addEventListener('resize', ctx.display.transition.bind(ctx, Transitions.resize));
      ctx.core.addStyle(d.id, d.source(ctx.appview.content));
      ctx.display.transition(Transitions.resize);
    },
    transitions: []
  },
]);
const DisplayMachine = new StateMachine(States.page, null, [
  {
    id: States.page,
    onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
      d.style.height = Math.round(0.75 * (ctx.$el as HTMLElement).scrollWidth) + 'px';
    },
    transitions: [
      { id: Transitions.showFullscreen, to: States.fullscreen },
      { id: Transitions.showFullwindow, to: States.fullwindow },
      { id: Transitions.resize, to: States.page }
    ]
  },
  {
    id: States.fullscreen,
    onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
      ctx.core.addFullScreen((ctx.$el as HTMLElement).id);
      ctx.eruda.transition(Transitions.switchOff);
      d.style.height = window.innerHeight + 'px';
    },
    onLeave(ctx: { [key: string]: any; }) {
      ctx.core.removeFullScreen();
    },
    transitions: [
      { id: Transitions.leaveFullscreen, to: States.page },
      { id: Transitions.showPage, to: States.page },
      { id: Transitions.showFullwindow, to: States.fullwindow }
    ]
  },
  {
    id: States.fullwindow,
    onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
      ctx.core.addFullWindow((ctx.$el as HTMLElement).id);
      d.style.height = window.innerHeight + 'px';
    },
    onLeave(ctx: { [key: string]: any; }) {
      ctx.core.removeFullWindow((ctx.$el as HTMLElement).id);
    },
    transitions: [
      { id: Transitions.leaveFullwindow, to: States.page },
      { id: Transitions.showPage, to: States.page },
      { id: Transitions.showFullscreen, to: States.fullscreen }
    ]
  }
]);
const ErudaMachine = new StateMachine(States.off, null, [
  {
    id: States.on,
    onEnter(ctx: { [key: string]: any; }) {
      ctx.core.addEruda();
    },
    transitions: [
      { id: Transitions.toggle, to: States.off },
      { id: Transitions.switchOff, to: States.off }
    ]
  },
  {
    id: States.off,
    onEnter(ctx: { [key: string]: any; }) {
      ctx.core.removeEruda();
    },
    transitions: [
      { id: Transitions.toggle, to: States.on },
      { id: Transitions.switchOn, to: States.on }
    ]
  }
]);
const MainMenuMachine = new StateMachine(States.off, null, [
  {
    id: States.on,
    transitions: [
      { id: Transitions.switchOff, to: States.off }
    ]
  },
  {
    id: States.off,
    transitions: [
      { id: Transitions.switchOn, to: States.on }
    ]
  }
]);
const ThemeMachine = new StateMachine(States.off, null, [
  {
    id: States.on,
    onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
      ctx.core.addStyle(d.id, d.source(d.content));
    },
    transitions: [
      { id: Transitions.toggle, to: States.off },
      { id: Transitions.switchOff, to: States.off }
    ]
  },
  {
    id: States.off,
    onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
      ctx.core.removeStyle(d.id);
    },
    transitions: [
      { id: Transitions.toggle, to: States.on },
      { id: Transitions.switchOn, to: States.on }
    ]
  }
]);
// vue
export const AppVue = Vue.extend({
  components: {
    'teds-panel': PanelComponent
  },
  data: function () {
    return {
      content: {
        app_author: 'By TedSpectrum',
        app_description: 'Playing about',
        app_title: 'Post app',
        eruda_add: 'Start Developer tools',
        eruda_remove: 'Remove Developer tools',
        fullscreen_add: 'Enter Full Screen',
        fullscreen_remove: 'Leave Full Screen',
        fullwindow_add: 'Enter Full Window',
        fullwindow_remove: 'Leave Full Window',
        mainmenu_title: 'Menu',
        page_add: 'View in page',
        theme_add: 'Theme On',
        theme_remove: 'Theme Off'
      },
      appview: AppViewMachine,
      appview_data: {
        id: 'apptheme',
        content: {
          backgroundColor: 'white',
          color: 'blue'
        },
        source: AppTheme
      },
      core: Core,
      display: DisplayMachine,
      display_data: {
        style: {
          height: ''
        }
      },
      eruda: ErudaMachine,
      mainmenu: MainMenuMachine,
      theme: ThemeMachine,
      theme_data: {
        id: 'usertheme',
        content: {
          backgroundColor: 'white',
          color: 'blue'
        },
        source: UserTheme
      }
    };
  },
  methods: {
    onPanelActivate: function(m: StateMachine, val: boolean) {
      val ? m.transition(Transitions.switchOn) : m.transition(Transitions.switchOff);
    }
  },
  mounted: function () {
    // connect state machines to the domain
    this.appview.setContext(this);
    this.appview.setData(this.appview_data);
    this.display.setContext(this);
    this.display.setData(this.display_data);
    this.eruda.setContext(this);
    this.mainmenu.setContext(this);
    this.theme.setContext(this);
    this.theme.setData(this.theme_data);
    // transition state machine to mounted
    this.appview.transition(Transitions.mount);
  },
  template: AppTemplate()
});
function AppTemplate(): string {
  return /*html*/`
<div id="postapp" class="app-container panel-container" 
  :style="display_data.style">
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <teds-panel 
    :model="mainmenu"
    :showPanel="mainmenu.isInState(${States.on})"
    @panel-activate="onPanelActivate">
    <div class="app-header">
      <h1>{{ content.mainmenu_title }}</h1>
    </div>
    <button @click="theme.transition(${Transitions.toggle})">
      {{ (theme.isInState(${States.on})) ? content.theme_remove : content.theme_add }}
    </button>
    <button
      :disabled="display.isInState(${States.fullscreen})" 
      @click="eruda.transition(${Transitions.toggle})">
      {{ (eruda.isInState(${States.on})) ? content.eruda_remove : content.eruda_add }}
    </button>
  </teds-panel>
  <div class="app-content layout-rows">
    <div class="app-header">
      <button
        @click="mainmenu.transition(${Transitions.switchOn})">
        <svg viewBox="0 0 20 20" fill="currentColor" class="block" height="16px" width="16px"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="inline">{{ content.app_title }}</h1>
    </div>
    <div class="app-body">
      <p>{{ content.app_description }}</p>
      <h2>Display control</h2>
      <button 
        :disabled="display.isInState(${States.page})"
        @click="display.transition(${Transitions.showPage})">
      {{ content.page_add }}
      </button>
      <button 
        :disabled="display.isInState(${States.fullwindow})"
        @click="display.transition(${Transitions.showFullwindow})">
      {{ content.fullwindow_add }}
      </button>
      <button 
        :disabled="display.isInState(${States.fullscreen})"
        @click="display.transition(${Transitions.showFullscreen})">
      {{ content.fullscreen_add }}
      </button>
    </div>
    <div class="app-footer">
      <span>{{ content.app_author }}</span>
    </div>
  </div>
</div>
`;
}
function AppTheme(content: { [key: string]: any; }): string {
  return/*css*/`
  .app-container {
    background-color: lightgray;
    color: black;
  }
  .app-content {
    background-color: lightgray;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .app-body {
    overflow: hidden;
  }
  .app-header, .app-footer {
    background-color: gray;
    color: white;
    padding-left: 0.5rem;
  }
  .body-cloak header, .body-cloak main, .body-cloak footer {
    display: none;
  }
  .block {
    display: block;
  }
  .bordered {
    border: 1px solid black;
  }
  .centered {
    display: grid;
    place-items: center;
  }
  .inline {
    display: inline;
  }
  .layout-rows {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
  .layout-columns {
    display: grid;
    grid-template-columns: auto 1fr auto;
  }`
};
function UserTheme(content: { [key: string]: any; }): string {
  return /*css*/`
  .app-content {
    color: ${content.color};
    background-color: ${content.backgroundColor};
  }`;
};