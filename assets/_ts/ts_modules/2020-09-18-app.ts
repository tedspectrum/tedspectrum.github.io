import { Core, StateMachine } from './core.js'
const PanelComponent = {
  name: 'teds-panel',
  template: /*html*/`
    <div>
      <transition :name="overlay_transition">
        <div v-show="model.active && overlay" class="overlay"
          @click="$emit('panel-activate', model, false)"></div>
      </transition>
      <transition :name="transition">
        <div v-show="model.active" class="panel" :class="classes">
          <slot></slot>
        </div>
      </transition>
    </div>`,
  props: {
    classes: {
      type: String,
      default: "panel-fullheightleft"
    },
    model: {
      type: Object,
      required: true
    },
    overlay: {
      default: true
    },
    overlay_transition: {
      type: String,
      default: "fadeinout"
    },
    transition: {
      type: String,
      default: "slideright"
    }
  }
};
export const App = Vue.extend({
  components: {
    'teds-panel': PanelComponent
  },
  created: function () {
    Core.addStyle('theme', AppTheme());
  },
  data: function () {
    const DisplayMachine = new StateMachine();
    DisplayMachine.addStates([
      {
        id: 'page',
        onEnter(ctx: { [key: string]: any; }) {
          ctx.onWindowResize();
        }
      },
      {
        id: 'fullscreen',
        onEnter(ctx: { [key: string]: any; }) {
          Core.addFullScreen((ctx.$el as HTMLElement).id);
          if (ctx.eruda.currentId === 'on') {
            ctx.eruda.changeTo('off');
          }
          ctx.onWindowResize();
        },
        onLeave() {
          Core.removeFullScreen();
        }
      },
      {
        id: 'fullwindow',
        onEnter(ctx: { [key: string]: any; }) {
          Core.addFullWindow((ctx.$el as HTMLElement).id);
          ctx.onWindowResize();
        },
        onLeave(ctx: { [key: string]: any; }) {
          Core.removeFullWindow((ctx.$el as HTMLElement).id);
        }
      }
    ]);
    DisplayMachine.setContext(this);
    DisplayMachine.setState('page');
    const ErudaMachine = new StateMachine();
    ErudaMachine.addStates([
      {
        id: 'on',
        onEnter() {
          Core.addEruda();
        }
      },
      {
        id: 'off',
        onEnter() {
          Core.removeEruda();
        }
      }
    ]);
    ErudaMachine.setState('off');
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
        theme_add: 'Theme On',
        theme_remove: 'Theme Off'
      },
      display: DisplayMachine,
      eruda: ErudaMachine,
      mainmenu: {
        active: false,
      },
      style: {
        height: ''
      },
      theme: {
        active: false,
        id: 'user',
        content: {
          color: 'blue'
        }
      },
    };
  },
  methods: {
    onErudaToggle: function (): void {
      switch(this.eruda.currentId) {
        case 'on': this.eruda.changeTo('off'); break;
        case 'off': this.eruda.changeTo('on'); break;
      }
    },
    onFullScreenToggle: function (): void {
      switch(this.display.currentId) {
        case 'fullscreen': this.display.changeTo('page'); break;
        case 'page': this.display.changeTo('fullscreen'); break;
      }
    },
    onFullWindowToggle: function (): void {
      switch(this.display.currentId) {
        case 'fullwindow': this.display.changeTo('page'); break;
        case 'page': this.display.changeTo('fullwindow'); break;
      }
    },
    onPanelSet: function (m: { active: boolean }, val: boolean): void {
      if (m.active !== val) { m.active = val; };
    },
    onThemeToggle: function (m: { active: boolean, id: string, content: object }): void {
      if (m.active) {
        Core.removeStyle(m.id);
        m.active = false;
      } else {
        Core.addStyle(m.id, UserTheme(m.content));
        m.active = true;
      }
    },
    onWindowResize: function () {
      if (this.display.currentId === 'page') {
        this.style.height = Math.round(0.75 * (this.$el as HTMLElement).scrollWidth) + 'px';
      } else {
        this.style.height = window.innerHeight + 'px';
      }
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.onWindowResize();
  },
  template: AppTemplate()
});
function AppTemplate(): string {
  return /*html*/`
<div id="postapp" class="app-container panel-container" 
  :style="style"
  v-cloak>
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <teds-panel 
    :model="mainmenu" 
    @panel-activate="onPanelSet">
    <div class="app-header">
      <h1>{{ content.mainmenu_title }}</h1>
    </div>
    <button @click="onThemeToggle(theme)">
      {{ theme.active ? content.theme_remove : content.theme_add }}
    </button>
    <button 
      :disabled="(display.currentId === 'fullscreen')"
      @click="onFullWindowToggle()" >
    {{ (display.currentId === 'fullwindow') ? content.fullwindow_remove : content.fullwindow_add }}
    </button>
    <button 
      :disabled="(display.currentId === 'fullwindow')"
      @click="onFullScreenToggle()">
    {{ (display.currentId === 'fullscreen') ? content.fullscreen_remove : content.fullscreen_add }}
    </button>
    <button
      :disabled="(display.currentId === 'fullscreen')" 
      @click="onErudaToggle()">
      {{ (eruda.currentId === 'on') ? content.eruda_remove : content.eruda_add }}
    </button>
  </teds-panel>
  <div class="app-content layout-rows">
    <div class="app-header">
      <button
        @click="onPanelSet(mainmenu, true)">
        <svg viewBox="0 0 20 20" fill="currentColor" class="menu--svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="inline">{{ content.app_title }}</h1>
    </div>
    <div class="app-body-content">
      <p>{{ content.app_description }}</p>
    </div>
    <div class="app-footer">
      <span>{{ content.app_author }}</span>
    </div>
  </div>
</div>
`;
}
function AppTheme(): string {
  return/*css*/`
  .app-container {
    color: black;
    background-color: lightgray;
  }
  .app-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: lightgray;
  }
  .v-cloak, .body-cloak header, .body-cloak main, .body-cloak footer {
    display: none;
  }
  .app-header, .app-footer {
    background-color: gray;
    color: white;
    padding-left: 0.5rem;
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
  }
  .column-width {
    width: 12rem;
  }
  .app-body-content {
    overflow: hidden;
  }
  .menu--svg {
    width: 16px;
    height: 16px;
    display: block;
  }`
};
function UserTheme(content: { [key: string]: any; }): string {
  return /*css*/`
  .app-content {
    color: ${content.color}
  }`;
};