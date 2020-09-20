import { Core } from './core.js'
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
    return {
      app: {
        class: {
          fullscreen: false
        },
        content: {
          author: 'By TedSpectrum',
          description: 'playing about',
          title: 'Post app'
        },
        style: {
          height: '10em'
        }
      },
      eruda: {
        active: false,
        content: {
          add: 'Start Developer tools',
          remove: 'Remove Developer tools'
        }
      },
      fullscreen: {
        active: false,
        content: {
          add: 'Enter Full Screen',
          remove: 'Leave Full Screen'
        }
      },
      mainmenu: {
        active: false,
        content: {
          title: 'Menu'
        }
      },
      theme: {
        active: false,
        id: 'user',
        content: {
          color: 'blue',
          add: 'Theme On',
          remove: 'Theme Off'
        }
      },
    };
  },
  methods: {
    onErudaToggle: function (m: { active: boolean, id: string }): void {
      if (m.active) {
        Core.removeEruda();
        m.active = false;
      } else {
        Core.addEruda();
        m.active = true;
      }
    },
    onFullScreenToggle: function (m: { active: boolean }): void {
      if (m.active) {
        Core.removeFullScreen();
        this.app.class.fullscreen = false;
        this.onWindowResize();
        m.active = false;
      } else {
        Core.addFullScreen((this.$el as HTMLElement).id);
        this.app.class.fullscreen = true;
        this.onWindowResize();
        m.active = true;
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
      if (!this.app.class.fullscreen) {
        this.app.style.height = Math.round(0.75 * (this.$el as HTMLElement).scrollWidth) + 'px';
      } else {
        this.app.style.height = '';
      }
    }
  },
  mounted: function () {
    (this.$el as HTMLElement).scrollIntoView(true);
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  },
  template: AppTemplate()
});
function AppTemplate(): string {
  return /*html*/`
<div id="postapp" class="panel-container" 
  :class="app.class.fullscreen" 
  v-cloak>
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <teds-panel 
    :model="mainmenu" 
    @panel-activate="onPanelSet">
    <div class="app-header">
      <h1>{{ mainmenu.content.title }}</h1>
    </div>
    <button @click="onThemeToggle(theme)">
      {{ theme.active ? theme.content.remove : theme.content.add }}
    </button>
    <button @click="onFullScreenToggle(fullscreen)">
    {{ fullscreen.active ? fullscreen.content.remove : fullscreen.content.add }}
    </button>
    <button
      :disabled="fullscreen.active" 
      @click="onErudaToggle(eruda)">
      {{ eruda.active ? eruda.content.remove : eruda.content.add }}
    </button>
  </teds-panel>
  <div class="app-content layout-rows" :style="app.style">
    <div class="app-header">
      <button
        @click="onPanelSet(mainmenu, true)">
        <svg viewBox="0 0 20 20" fill="currentColor" class="menu--svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="inline">{{ app.content.title }}</h1>
    </div>
    <div class="app-body-content">
      <p>{{ app.content.description }}</p>
    </div>
    <div class="app-footer">
      <span>{{ app.content.author }}</span>
    </div>
  </div>
</div>
`;
}
function AppTheme(): string {
  return/*css*/`
  .app-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: lightgray;
  }
  .fullscreen {
    height: 100vh;
  }
  .v-cloak {
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