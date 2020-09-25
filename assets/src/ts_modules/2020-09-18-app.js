import { Core, StateMachine } from './core.js';
const PanelComponent = {
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
const DisplayMachine = new StateMachine(2, null, [
    {
        id: 2,
        onEnter(ctx) {
            ctx.style.height = Math.round(0.75 * ctx.$el.scrollWidth) + 'px';
        },
        transitions: [
            { id: 3, to: 3 },
            { id: 4, to: 4 },
            { id: 2, to: 2 }
        ]
    },
    {
        id: 3,
        onEnter(ctx) {
            Core.addFullScreen(ctx.$el.id);
            ctx.eruda.transition(6);
            ctx.style.height = window.innerHeight + 'px';
        },
        onLeave() {
            Core.removeFullScreen();
        },
        transitions: [
            { id: 0, to: 2 },
            { id: 5, to: 2 },
            { id: 4, to: 4 }
        ]
    },
    {
        id: 4,
        onEnter(ctx) {
            Core.addFullWindow(ctx.$el.id);
            ctx.style.height = window.innerHeight + 'px';
        },
        onLeave(ctx) {
            Core.removeFullWindow(ctx.$el.id);
        },
        transitions: [
            { id: 1, to: 2 },
            { id: 5, to: 2 },
            { id: 3, to: 3 }
        ]
    }
]);
const ErudaMachine = new StateMachine(0, null, [
    {
        id: 1,
        onEnter() {
            Core.addEruda();
        },
        transitions: [
            { id: 8, to: 0 },
            { id: 6, to: 0 }
        ]
    },
    {
        id: 0,
        onEnter() {
            Core.removeEruda();
        },
        transitions: [
            { id: 8, to: 1 },
            { id: 7, to: 1 }
        ]
    }
]);
const MainMenuMachine = new StateMachine(0, null, [
    {
        id: 1,
        transitions: [
            { id: 6, to: 0 }
        ]
    },
    {
        id: 0,
        transitions: [
            { id: 7, to: 1 }
        ]
    }
]);
const ThemeMachine = new StateMachine(0, null, [
    {
        id: 1,
        onEnter(ctx) {
            Core.addStyle(ctx.theme_context.id, ctx.theme_context.source(ctx.theme_context.content));
        },
        transitions: [
            { id: 8, to: 0 },
            { id: 6, to: 0 }
        ]
    },
    {
        id: 0,
        onEnter(ctx) {
            Core.removeStyle(ctx.theme_context.id);
        },
        transitions: [
            { id: 8, to: 1 },
            { id: 7, to: 1 }
        ]
    }
]);
export const App = Vue.extend({
    components: {
        'teds-panel': PanelComponent
    },
    data: function () {
        const domain = {
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
            display: DisplayMachine,
            eruda: ErudaMachine,
            mainmenu: MainMenuMachine,
            style: {
                height: ''
            },
            theme: ThemeMachine,
            theme_context: {
                id: 'user',
                content: {
                    backgroundColor: 'white',
                    color: 'blue'
                },
                source: UserTheme
            }
        };
        DisplayMachine.setContext(this);
        ErudaMachine.setContext(this);
        MainMenuMachine.setContext(this);
        ThemeMachine.setContext(this);
        return domain;
    },
    methods: {},
    mounted: function () {
        window.addEventListener('resize', this.display.transition.bind(this, 2));
        Core.addStyle('theme', AppTheme());
        this.display.transition(2);
    },
    template: AppTemplate()
});
function AppTemplate() {
    return `
<div id="postapp" class="app-container panel-container" 
  :style="style">
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <teds-panel 
    :model="mainmenu"
    :showPanel="(mainmenu.current === ${1})"
    @panel-activate="mainmenu.transition(${6})">
    <div class="app-header">
      <h1>{{ content.mainmenu_title }}</h1>
    </div>
    <button @click="theme.transition(${8})">
      {{ (theme.current === ${1}) ? content.theme_remove : content.theme_add }}
    </button>
    <button
      :disabled="(display.current === ${3})" 
      @click="eruda.transition(${8})">
      {{ (eruda.current === ${1}) ? content.eruda_remove : content.eruda_add }}
    </button>
  </teds-panel>
  <div class="app-content layout-rows">
    <div class="app-header">
      <button
        @click="mainmenu.transition(${7})">
        <svg viewBox="0 0 20 20" fill="currentColor" class="block" height="16px" width="16px"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="inline">{{ content.app_title }}</h1>
    </div>
    <div class="app-body">
      <p>{{ content.app_description }}</p>
      <h2>Display control</h2>
      <button 
        :disabled="(display.current === ${2})"
        @click="display.transition(${5})">
      {{ content.page_add }}
      </button>
      <button 
        :disabled="(display.current === ${4})"
        @click="display.transition(${4})">
      {{ content.fullwindow_add }}
      </button>
      <button 
        :disabled="(display.current === ${3})"
        @click="display.transition(${3})">
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
function AppTheme() {
    return `
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
  }`;
}
;
function UserTheme(content) {
    return `
  .app-content {
    color: ${content.color};
    background-color: ${content.backgroundColor};
  }`;
}
;
