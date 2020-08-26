/// <reference types="vue" />
import { exportedFunction } from './tsmoduleexports.js';
exportedFunction();
const appTemplate = /*html*/`
<div id="postapp" class="app-container" v-cloak>
  <div v-show="false">
  <!-- cache, give elements ref="" to reference in methods -->
  </div>
  <div class="app pancake-stack">
    <div class="app-header">
      <h1>{{ title }}</h1>
    </div>
    <div class="app-body centered">
      <div class="app-body-content">
        <p>{{ description }}</p>
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
