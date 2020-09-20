import { Core } from './core.js';
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
export var App = Vue.extend({
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
        onFullScreenToggle: function (m) {
            if (m.active) {
                Core.removeFullScreen();
                this.app.class.fullscreen = false;
                this.onWindowResize();
                m.active = false;
            }
            else {
                Core.addFullScreen(this.$el.id);
                this.app.class.fullscreen = true;
                this.onWindowResize();
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
                Core.addStyle(m.id, UserTheme(m.content));
                m.active = true;
            }
        },
        onWindowResize: function () {
            if (!this.app.class.fullscreen) {
                this.app.style.height = Math.round(0.75 * this.$el.scrollWidth) + 'px';
            }
            else {
                this.app.style.height = '';
            }
        }
    },
    mounted: function () {
        this.$el.scrollIntoView(true);
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this));
    },
    template: AppTemplate()
});
function AppTemplate() {
    return "\n<div id=\"postapp\" class=\"panel-container\" \n  :class=\"app.class.fullscreen\" \n  v-cloak>\n  <div v-show=\"false\">\n  <!-- cache, give elements ref=\"\" to reference in methods -->\n  </div>\n  <teds-panel \n    :model=\"mainmenu\" \n    @panel-activate=\"onPanelSet\">\n    <div class=\"app-header\">\n      <h1>{{ mainmenu.content.title }}</h1>\n    </div>\n    <button @click=\"onThemeToggle(theme)\">\n      {{ theme.active ? theme.content.remove : theme.content.add }}\n    </button>\n    <button @click=\"onFullScreenToggle(fullscreen)\">\n    {{ fullscreen.active ? fullscreen.content.remove : fullscreen.content.add }}\n    </button>\n    <button\n      :disabled=\"fullscreen.active\" \n      @click=\"onErudaToggle(eruda)\">\n      {{ eruda.active ? eruda.content.remove : eruda.content.add }}\n    </button>\n  </teds-panel>\n  <div class=\"app-content layout-rows\" :style=\"app.style\">\n    <div class=\"app-header\">\n      <button\n        @click=\"onPanelSet(mainmenu, true)\">\n        <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"menu--svg\"><path fill-rule=\"evenodd\" d=\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\" clip-rule=\"evenodd\"></path></svg>\n      </button>\n      <h1 class=\"inline\">{{ app.content.title }}</h1>\n    </div>\n    <div class=\"app-body-content\">\n      <p>{{ app.content.description }}</p>\n    </div>\n    <div class=\"app-footer\">\n      <span>{{ app.content.author }}</span>\n    </div>\n  </div>\n</div>\n";
}
function AppTheme() {
    return "\n  .app-content {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background-color: lightgray;\n  }\n  .fullscreen {\n    height: 100vh;\n  }\n  .v-cloak {\n    display: none;\n  }\n  .app-header, .app-footer {\n    background-color: gray;\n    color: white;\n    padding-left: 0.5rem;\n  }\n  .bordered {\n    border: 1px solid black;\n  }\n  .centered {\n    display: grid;\n    place-items: center;\n  }\n  .inline {\n    display: inline;\n  }\n  .layout-rows {\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n  }\n  .layout-columns {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n  }\n  .column-width {\n    width: 12rem;\n  }\n  .app-body-content {\n    overflow: hidden;\n  }\n  .menu--svg {\n    width: 16px;\n    height: 16px;\n    display: block;\n  }";
}
;
function UserTheme(content) {
    return "\n  .app-content {\n    color: " + content.color + "\n  }";
}
;
