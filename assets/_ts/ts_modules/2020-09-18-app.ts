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
const AppTemplate = /*html*/`
<div id="postapp" class="app-container panel-container" v-cloak>
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <div class="app layout-rows">
    <div class="app-header">
      <button
        @click="onPanelSet(mainmenu, true)">
        <svg viewBox="0 0 20 20" fill="currentColor" class="menu--svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <h1 class="inline">{{ app.content.title }}</h1>
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
      <button @click="onErudaToggle(eruda)">
        {{ eruda.active ? eruda.content.remove : eruda.content.add }}
      </button>
    </teds-panel>
    <div>
      <p>{{ app.content.description }}</p>
    </div>
    <div class="app-footer">
      <span>{{ app.content.author }}</span>
    </div>
  </div>
</div>
`;
// Class Core
declare let eruda: any;
class Core {
  static addStyle(id: string, content: string): void {
    if (document.getElementById(id) === null) {
      let el = document.createElement('style');
      if (el !== null && document.head) {
        el.id = id;
        el.innerHTML = content;
        document.head.appendChild(el);
      }
    }
  }
  static addEruda(): void {
    if (document.getElementById('eruda-script') === null) {
      let el = document.createElement('script');
      if (el !== null && document.body) {
        el.id = 'eruda-script';
        el.src = '//cdn.jsdelivr.net/npm/eruda';
        el.onload = function () {
          eruda.init();
        };
        document.body.appendChild(el);
      }
    } else {
      eruda.init();
    }
  }
  static removeElementById(id: string): void {
    let el = document.getElementById(id);
    if (el !== null && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }
  static removeEruda(): void {
    Core.removeElementById('eruda-script');
    if(eruda) { eruda.destroy(); }
  }
  static removeStyle(id: string): void {
    Core.removeElementById(id);
  }
}
export const App = Vue.extend({
  components: {
    'teds-panel': PanelComponent
  },
  created: function () {
    Core.addStyle('theme', getAppTheme());
  },
  data: function () {
    return {
      app: {
        content: {
          author: 'By TedSpectrum',
          description: 'playing about',
          title: 'Post app'
        }
      },
      eruda: {
        active: false,
        content: {
          add: 'Start Eruda',
          remove: 'Remove Eruda'
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
    onPanelSet: function (m: { active: boolean }, val: boolean): void {
      if (m.active !== val) { m.active = val; };
    },
    onThemeToggle: function (m: { active: boolean, id: string, content: object }): void {
      if (m.active) {
        Core.removeStyle(m.id);
        m.active = false;
      } else {
        Core.addStyle(m.id, getUserTheme(m.content));
        m.active = true;
      }
    }
  },
  mounted: function () {
    (this.$el as HTMLElement).focus();
  },
  template: AppTemplate
});
function getUserTheme(content: { [key: string]: any; }): string {
  return /*css*/`
  .app {
    color: ${content.color}
  }`;
};
function getAppTheme(): string {
  return/*css*/`
  .app {
    width: 100%;
    overflow: hidden;
    background-color: lightgray;
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
    width: 50%;
    height: 50%;
    overflow: hidden;
  }
  .menu--svg {
    width: 16px;
    height: 16px;
    display: block;
  }`
};