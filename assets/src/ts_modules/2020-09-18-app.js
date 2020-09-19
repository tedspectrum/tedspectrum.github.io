var PanelComponent = {
    name: 'teds-panel',
    template: "\n    <div>\n      <transition :name=\"overlay_transition\">\n        <div v-show=\"model.active && overlay\" class=\"overlay\"\n          @click=\"$emit('panel-activate', model, false)\"></div>\n      </transition>\n      <transition :name=\"transition\">\n        <div v-show=\"model.active\" class=\"panel\" :class=\"classes\">\n          <slot></slot>\n        </div>\n      </transition>\n    </div>",
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
var AppTemplate = "\n<div id=\"postapp\" class=\"app-container panel-container\" v-cloak>\n  <div v-show=\"false\">\n  <!-- cache, give elements ref=\"\" to reference in methods -->\n  </div>\n  <div class=\"app layout-rows\">\n    <div class=\"app-header\">\n      <button\n        @click=\"onPanelSet(mainmenu, true)\">\n        <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"menu--svg\"><path fill-rule=\"evenodd\" d=\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\" clip-rule=\"evenodd\"></path></svg>\n      </button>\n      <h1 class=\"inline\">{{ app.content.title }}</h1>\n    </div>\n    <teds-panel \n      :model=\"mainmenu\" \n      @panel-activate=\"onPanelSet\">\n      <div class=\"app-header\">\n        <h1>{{ mainmenu.content.title }}</h1>\n      </div>\n      <button @click=\"onThemeToggle(theme)\">\n        {{ theme.active ? theme.content.remove : theme.content.add }}\n      </button>\n      <button @click=\"onErudaToggle(eruda)\">\n        {{ eruda.active ? eruda.content.remove : eruda.content.add }}\n      </button>\n    </teds-panel>\n    <div>\n      <p>{{ app.content.description }}</p>\n    </div>\n    <div class=\"app-footer\">\n      <span>{{ app.content.author }}</span>\n    </div>\n  </div>\n</div>\n";
var Core = (function () {
    function Core() {
    }
    Core.addStyle = function (id, content) {
        if (document.getElementById(id) === null) {
            var el = document.createElement('style');
            if (el !== null && document.head) {
                el.id = id;
                el.innerHTML = content;
                document.head.appendChild(el);
            }
        }
    };
    Core.addEruda = function () {
        if (document.getElementById('eruda-script') === null) {
            var el = document.createElement('script');
            if (el !== null && document.body) {
                el.id = 'eruda-script';
                el.src = '//cdn.jsdelivr.net/npm/eruda';
                el.onload = function () {
                    eruda.init();
                };
                document.body.appendChild(el);
            }
        }
        else {
            eruda.init();
        }
    };
    Core.removeElementById = function (id) {
        var el = document.getElementById(id);
        if (el !== null && el.parentNode !== null) {
            el.parentNode.removeChild(el);
        }
    };
    Core.removeEruda = function () {
        Core.removeElementById('eruda-script');
        if (eruda) {
            eruda.destroy();
        }
    };
    Core.removeStyle = function (id) {
        Core.removeElementById(id);
    };
    return Core;
}());
export var App = Vue.extend({
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
        onErudaToggle: function (m) {
            if (m.active) {
                Core.removeEruda();
                m.active = false;
            }
            else {
                Core.addEruda();
                m.active = true;
            }
        },
        onPanelSet: function (m, val) {
            if (m.active !== val) {
                m.active = val;
            }
            ;
        },
        onThemeToggle: function (m) {
            if (m.active) {
                Core.removeStyle(m.id);
                m.active = false;
            }
            else {
                Core.addStyle(m.id, getUserTheme(m.content));
                m.active = true;
            }
        }
    },
    mounted: function () {
        this.$el.focus();
    },
    template: AppTemplate
});
function getUserTheme(content) {
    return "\n  .app {\n    color: " + content.color + "\n  }";
}
;
function getAppTheme() {
    return "\n  .app {\n    width: 100%;\n    overflow: hidden;\n    background-color: lightgray;\n  }\n  .v-cloak {\n    display: none;\n  }\n  .app-header, .app-footer {\n    background-color: gray;\n    color: white;\n    padding-left: 0.5rem;\n  }\n  .bordered {\n    border: 1px solid black;\n  }\n  .centered {\n    display: grid;\n    place-items: center;\n  }\n  .inline {\n    display: inline;\n  }\n  .layout-rows {\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n  }\n  .layout-columns {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n  }\n  .column-width {\n    width: 12rem;\n  }\n  .app-body-content {\n    width: 50%;\n    height: 50%;\n    overflow: hidden;\n  }\n  .menu--svg {\n    width: 16px;\n    height: 16px;\n    display: block;\n  }";
}
;
