import { Core, PanelComponent, StateMachine } from './core.js';
import { AppViewDefinition, DisplayDefinition, ErudaDefinition, MainMenuDefinition, ThemeDefinition } from './2020-09-18-states.js';
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
            appview: new StateMachine(this, AppViewDefinition),
            core: Core,
            display: new StateMachine(this, DisplayDefinition),
            eruda: new StateMachine(this, ErudaDefinition),
            mainmenu: new StateMachine(this, MainMenuDefinition),
            theme: new StateMachine(this, ThemeDefinition),
        };
    },
    methods: {
        getAppTheme: function (content) {
            return AppTheme(content);
        },
        getUserTheme: function (content) {
            return UserTheme(content);
        },
        onPanelActivate: function (m, val) {
            val ? m.transition(8) : m.transition(7);
        }
    },
    mounted: function () {
        this.appview.transition(2);
    },
    template: `
<div id="postapp" class="app-container panel-container" 
  :style="display.data.style">
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
</div>`
});
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
