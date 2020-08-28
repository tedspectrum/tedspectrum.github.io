/// <reference types="vue" />
import { exportedFunction } from './tsmoduleexports.js';
exportedFunction();
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
    <div class="layout-columns">
      <div class="column-width bordered">
        <div>left - the quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="app-body centered">
        <div class="app-body-content bordered">
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="column-width bordered">
        <span>right</span>
      </div>
    </div>
    <div class="app-footer">
      <span>By TedSpectrum</span>
    </div>
  </div>
</div>
`;
const App = Vue.extend({
  /*
  components: {
    'component-name': 'object-name'
  },
  */
  data: function () {
    return {
      title: 'Post app',
      description: `Now using typescript module,
      npm install -D vue, then add /// <reference types="vue" /> as first line of script.
      Benefits;
      1) no script in jekyll post, script module is self contained.
      2) can import other modules
      3) editor support for vue declarations`,
      obj: {
        'myProp': 1
      }
    }
  },
  /*
  mixins: [],
  */
  mounted: function () {
    this.helloworld();
  },
  methods: {
    helloworld(): void {
      this.$set(this.obj, 'newProp', false);
    },
    secondFn(): void {
      this.helloworld();
    }
  },
  template: appTemplate
});
// mount app
new App().$mount('#postapp');
