import { exportedFunction } from './tsmoduleexports.js';
exportedFunction();
var appTemplate = "\n<div id=\"postapp\" class=\"app-container\" v-cloak>\n  <div v-show=\"false\">\n  <!-- cache, give elements ref=\"\" to reference in methods -->\n  </div>\n  <div class=\"app layout-rows\">\n    <div class=\"app-header\">\n      <h1>\n      <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"menu--svg\"><path fill-rule=\"evenodd\" d=\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\" clip-rule=\"evenodd\"></path></svg>\n      {{ title }}</h1>\n    </div>\n    <div class=\"layout-columns\">\n      <div class=\"column-width bordered\">\n        <div>left - the quick brown fox jumps over the lazy dog</div>\n      </div>\n      <div class=\"app-body centered\">\n        <div class=\"app-body-content bordered\">\n          <p>{{ description }}</p>\n        </div>\n      </div>\n      <div class=\"column-width bordered\">\n        <span>right</span>\n      </div>\n    </div>\n    <div class=\"app-footer\">\n      <span>By TedSpectrum</span>\n    </div>\n  </div>\n</div>\n";
var App = Vue.extend({
    data: function () {
        return {
            title: 'Post app',
            description: "Now using typescript module,\n      npm install -D vue, then add /// <reference types=\"vue\" /> as first line of script.\n      Benefits;\n      1) no script in jekyll post, script module is self contained.\n      2) can import other modules\n      3) editor support for vue declarations",
            obj: {
                'myProp': 1
            }
        };
    },
    mounted: function () {
        this.helloworld();
    },
    methods: {
        helloworld: function () {
            this.$set(this.obj, 'newProp', false);
        },
        secondFn: function () {
            this.helloworld();
        }
    },
    template: appTemplate
});
new App().$mount('#postapp');
