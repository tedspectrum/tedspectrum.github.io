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
      <p>{{ description }}</p>
      <button v-on:click="onThemeToggle">
        {{ themeState ? "Theme Off" : "Theme On" }}
      </button>
    </div>
    <div class="app-footer">
      <span>By TedSpectrum</span>
    </div>
  </div>
</div>
`
function addStyle(id: string, content: string) {
  if (document.getElementById(id) === null) {
    let sheet = document.createElement('style');
    if (sheet !== null && document.head) {
      sheet.id = id;
      sheet.innerHTML = content;
      document.head.appendChild(sheet);
    }
  }
}
function removeStyle(id: string) {
  let sheet = document.getElementById(id);
  if (sheet !== null && sheet.parentNode !== null) {
    sheet.parentNode.removeChild(sheet);
  }
}
export const App = Vue.extend({
  created() {
    addStyle('theme', getAppTheme());
  },
  data() {
    return {
      title: 'Post app',
      description: 'playing about',
      themeState: false,
      themeUserOptions: {
        color: 'blue'
      }
    };
  },
  methods: {
    onThemeToggle: function (): void {
      if (this.themeState) {
        removeStyle('userTheme');
        this.themeState = false;
      } else {
        addStyle('userTheme', getUserTheme(this.themeUserOptions));
        this.themeState = true;
      }
    }
  },
  template: appTemplate
});
function getUserTheme(options: { [key: string]: any; }): string {
  return /*css*/`
  .app {
    color: ${options.color}
  }`
}
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
  }`
}