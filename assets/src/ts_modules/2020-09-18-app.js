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
const AppViewMachine = new StateMachine(2, null, [
    {
        id: 2,
        transitions: [
            { id: 2, to: 3 }
        ]
    },
    {
        id: 3,
        onEnter(ctx, d) {
            window.addEventListener('resize', ctx.display.transition.bind(ctx, 3));
            ctx.core.addStyle(d.id, d.source(ctx.appview.content));
            ctx.display.transition(3);
        },
        transitions: []
    },
]);
const DisplayMachine = new StateMachine(4, null, [
    {
        id: 4,
        onEnter(ctx, d) {
            d.style.height = Math.round(0.75 * ctx.$el.scrollWidth) + 'px';
        },
        transitions: [
            { id: 4, to: 5 },
            { id: 5, to: 6 },
            { id: 3, to: 4 }
        ]
    },
    {
        id: 5,
        onEnter(ctx, d) {
            ctx.core.addFullScreen(ctx.$el.id);
            ctx.eruda.transition(7);
            d.style.height = window.innerHeight + 'px';
        },
        onLeave(ctx) {
            ctx.core.removeFullScreen();
        },
        transitions: [
            { id: 0, to: 4 },
            { id: 6, to: 4 },
            { id: 5, to: 6 }
        ]
    },
    {
        id: 6,
        onEnter(ctx, d) {
            ctx.core.addFullWindow(ctx.$el.id);
            d.style.height = window.innerHeight + 'px';
        },
        onLeave(ctx) {
            ctx.core.removeFullWindow(ctx.$el.id);
        },
        transitions: [
            { id: 1, to: 4 },
            { id: 6, to: 4 },
            { id: 4, to: 5 }
        ]
    }
]);
const ErudaMachine = new StateMachine(0, null, [
    {
        id: 1,
        onEnter(ctx) {
            ctx.core.addEruda();
        },
        transitions: [
            { id: 9, to: 0 },
            { id: 7, to: 0 }
        ]
    },
    {
        id: 0,
        onEnter(ctx) {
            ctx.core.removeEruda();
        },
        transitions: [
            { id: 9, to: 1 },
            { id: 8, to: 1 }
        ]
    }
]);
const MainMenuMachine = new StateMachine(0, null, [
    {
        id: 1,
        transitions: [
            { id: 7, to: 0 }
        ]
    },
    {
        id: 0,
        transitions: [
            { id: 8, to: 1 }
        ]
    }
]);
const ThemeMachine = new StateMachine(0, null, [
    {
        id: 1,
        onEnter(ctx, d) {
            ctx.core.addStyle(d.id, d.source(d.content));
        },
        transitions: [
            { id: 9, to: 0 },
            { id: 7, to: 0 }
        ]
    },
    {
        id: 0,
        onEnter(ctx, d) {
            ctx.core.removeStyle(d.id);
        },
        transitions: [
            { id: 9, to: 1 },
            { id: 8, to: 1 }
        ]
    }
]);
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
        onPanelActivate: function (m, val) {
            val ? m.transition(8) : m.transition(7);
        }
    },
    mounted: function () {
        this.appview.setContext(this);
        this.appview.setData(this.appview_data);
        this.display.setContext(this);
        this.display.setData(this.display_data);
        this.eruda.setContext(this);
        this.mainmenu.setContext(this);
        this.theme.setContext(this);
        this.theme.setData(this.theme_data);
        this.appview.transition(2);
    },
    template: AppTemplate()
});
function AppTemplate() {
    return `
<div id="postapp" class="app-container panel-container" 
  :style="display_data.style">
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <teds-panel 
    :model="mainmenu"
    :showPanel="mainmenu.isInState(${1})"
    @panel-activate="onPanelActivate">
    <div class="app-header">
      <h1>{{ content.mainmenu_title }}</h1>
    </div>
    <button @click="theme.transition(${9})">
      {{ (theme.isInState(${1})) ? content.theme_remove : content.theme_add }}
    </button>
    <button
      :disabled="display.isInState(${5})" 
      @click="eruda.transition(${9})">
      {{ (eruda.isInState(${1})) ? content.eruda_remove : content.eruda_add }}
    </button>
  </teds-panel>
  <div class="app-content layout-rows">
    <div class="app-header">
      <button
        @click="mainmenu.transition(${8})">
        <svg viewBox="0 0 20 20" fill="currentColor" class="block" height="16px" width="16px"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="inline">{{ content.app_title }}</h1>
    </div>
    <div class="app-body">
      <p>{{ content.app_description }}</p>
      <h2>Display control</h2>
      <button 
        :disabled="display.isInState(${4})"
        @click="display.transition(${6})">
      {{ content.page_add }}
      </button>
      <button 
        :disabled="display.isInState(${6})"
        @click="display.transition(${5})">
      {{ content.fullwindow_add }}
      </button>
      <button 
        :disabled="display.isInState(${5})"
        @click="display.transition(${4})">
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
function AppTheme(content) {
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
