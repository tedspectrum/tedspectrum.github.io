var appTemplate = "\n<div id=\"postapp\" class=\"app-container\" v-cloak>\n  <div v-show=\"false\">\n  <!-- cache, give elements ref=\"\" to reference in methods -->\n  </div>\n  <div class=\"app layout-rows\">\n    <div class=\"app-header\">\n      <h1>\n      <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"menu--svg\"><path fill-rule=\"evenodd\" d=\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\" clip-rule=\"evenodd\"></path></svg>\n      {{ title }}</h1>\n    </div>\n    <div>\n      <p>{{ description }}</p>\n      <button v-on:click=\"onThemeToggle\">\n        {{ themeState ? \"Theme Off\" : \"Theme On\" }}\n      </button>\n    </div>\n    <div class=\"app-footer\">\n      <span>By TedSpectrum</span>\n    </div>\n  </div>\n</div>\n";
function addStyle(id, content) {
    if (document.getElementById(id) === null) {
        var sheet = document.createElement('style');
        if (sheet !== null && document.head) {
            sheet.id = id;
            sheet.innerHTML = content;
            document.head.appendChild(sheet);
        }
    }
}
function removeStyle(id) {
    var sheet = document.getElementById(id);
    if (sheet !== null && sheet.parentNode !== null) {
        sheet.parentNode.removeChild(sheet);
    }
}
export var App = Vue.extend({
    created: function () {
        addStyle('theme', getAppTheme());
    },
    data: function () {
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
        onThemeToggle: function () {
            if (this.themeState) {
                removeStyle('userTheme');
                this.themeState = false;
            }
            else {
                addStyle('userTheme', getUserTheme(this.themeUserOptions));
                this.themeState = true;
            }
        }
    },
    template: appTemplate
});
function getUserTheme(options) {
    return "\n  .app {\n    color: " + options.color + "\n  }";
}
function getAppTheme() {
    return "\n  .app {\n    width: 100%;\n    overflow: hidden;\n    background-color: lightgray;\n  }\n  .v-cloak {\n    display: none;\n  }\n  .app-header, .app-footer {\n    background-color: gray;\n    color: white;\n    padding-left: 0.5rem;\n  }\n  .bordered {\n    border: 1px solid black;\n  }\n  .centered {\n    display: grid;\n    place-items: center;\n  }\n  .layout-rows {\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n  }\n  .layout-columns {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n  }\n  .column-width {\n    width: 12rem;\n  }\n  .app-body-content {\n    width: 50%;\n    height: 50%;\n    overflow: hidden;\n  }\n  .menu--svg {\n    width: 16px;\n    height: 16px;\n  }";
}
