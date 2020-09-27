import { Core, PanelComponent, StateMachine } from './core.js'
import { States, Transitions, AppViewDefinition, DisplayDefinition, ErudaDefinition, MainMenuDefinition, ThemeDefinition }
  from './2020-09-18-states.js'
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
      appview: new StateMachine(this, AppViewDefinition),
      core: Core,
      cssTemplates: {
        app: AppTheme,
        user: UserTheme
      },
      display: new StateMachine(this, DisplayDefinition),
      eruda: new StateMachine(this, ErudaDefinition),
      mainmenu: new StateMachine(this, MainMenuDefinition),
      theme: new StateMachine(this, ThemeDefinition),
    };
  },
  methods: {
    onPanelActivate: function (m: StateMachine, val: boolean) {
      val ? m.transition(Transitions.switchOn) : m.transition(Transitions.switchOff);
    }
  },
  mounted: function () {
    // transition state machine to mounted
    this.appview.transition(Transitions.mount);
  },
  template: /*html*/`
<div id="postapp" class="panel-container" 
  :style="display.data.style">
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <teds-panel
    :component_classes="{ mainmenu: true }"
    :model="mainmenu"
    :showPanel="mainmenu.data.active"
    @panel-activate="onPanelActivate">
    <div class="app-header">
      <h1>{{ content.mainmenu_title }}</h1>
    </div>
    <button @click="theme.transition(${Transitions.toggle})">
      {{ (theme.isInState(${States.on})) ? content.theme_remove : content.theme_add }}
    </button>
    <button
      :disabled="display.data.isFullwindowActive" 
      @click="eruda.transition(${Transitions.toggle})">
      {{ (eruda.isInState(${States.on})) ? content.eruda_remove : content.eruda_add }}
    </button>
  </teds-panel>
  <div class="app-content layout-rows">
    <div class="app-header">
      <button
        @click="mainmenu.transition(${Transitions.switchOn})">
        <svg viewBox="0 0 20 20" fill="currentColor" class="display-block" height="16px" width="16px"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="display-inline">{{ content.app_title }}</h1>
    </div>
    <div class="app-body">
      <p>{{ content.app_description }}</p>
      <h2>Display control</h2>
      <button 
        :disabled="display.data.isPageActive"
        @click="display.transition(${Transitions.showPage})">
      {{ content.page_add }}
      </button>
      <button 
        :disabled="display.data.isFullwindowActive"
        @click="display.transition(${Transitions.showFullwindow})">
      {{ content.fullwindow_add }}
      </button>
      <button 
        :disabled="display.data.isFullscreenActive"
        @click="display.transition(${Transitions.showFullscreen})">
      {{ content.fullscreen_add }}
      </button>
    </div>
    <div class="app-footer">
      <span>{{ content.app_author }}</span>
    </div>
  </div>
</div>`
});
function AppTheme(content: { [key: string]: any; }): string {
  return/*css*/`
  .app-content {
    width: 100%;
    height: 100%;
  }
  .app-body {
    overflow: hidden;
  }
  .body-cloak header, .body-cloak main, .body-cloak footer {
    display: none;
  }
  .centered {
    display: grid;
    place-items: center;
  }
  .display-block {
    display: block;
  }
  .display-inline {
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
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 20;
    opacity: 0.9;
  }
  .panel-container {
    position: relative;
    overflow: hidden;
  }
  .panel {
    position: absolute;
    z-index: 1000;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .panel-fullheightleft {
    width: 12em;
    top: 0;
    bottom: 0;
    left: 0;
  }
`
};
function UserTheme(content: { [key: string]: any; }): string {
  return /*css*/`
  .app-content {
    background-color: ${content.baseColor};
    color: ${content.highlightColor1};
  }
  .app-header, .app-footer {
    background-color: ${content.highlightColor1};
    color: ${content.baseColor};
    padding-left: 0.5rem;
  }
  .mainmenu .overlay {
    background-color: ${content.mainmenu.overlay.backgroundColor};    
  }
  .mainmenu .panel {
    background-color: ${content.mainmenu.panel.backgroundColor};
  }`;
};