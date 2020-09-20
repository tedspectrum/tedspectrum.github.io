import { Core, StateMachine } from './core.js';
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
        var DisplayMachine = new StateMachine();
        DisplayMachine.addStates([
            {
                id: 'page',
                onEnter: function (ctx) {
                    ctx.onWindowResize();
                }
            },
            {
                id: 'fullscreen',
                onEnter: function (ctx) {
                    Core.addFullScreen(ctx.$el.id);
                    if (ctx.eruda.currentId === 'on') {
                        ctx.eruda.changeTo('off');
                    }
                    ctx.onWindowResize();
                },
                onLeave: function () {
                    Core.removeFullScreen();
                }
            },
            {
                id: 'fullwindow',
                onEnter: function (ctx) {
                    Core.addFullWindow(ctx.$el.id);
                    ctx.onWindowResize();
                },
                onLeave: function (ctx) {
                    Core.removeFullWindow(ctx.$el.id);
                }
            }
        ]);
        DisplayMachine.setContext(this);
        DisplayMachine.setState('page');
        var ErudaMachine = new StateMachine();
        ErudaMachine.addStates([
            {
                id: 'on',
                onEnter: function () {
                    Core.addEruda();
                }
            },
            {
                id: 'off',
                onEnter: function () {
                    Core.removeEruda();
                }
            }
        ]);
        ErudaMachine.setState('off');
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
                theme_add: 'Theme On',
                theme_remove: 'Theme Off'
            },
            display: DisplayMachine,
            eruda: ErudaMachine,
            mainmenu: {
                active: false,
            },
            style: {
                height: ''
            },
            theme: {
                active: false,
                id: 'user',
                content: {
                    color: 'blue'
                }
            },
        };
    },
    methods: {
        onErudaToggle: function () {
            switch (this.eruda.currentId) {
                case 'on':
                    this.eruda.changeTo('off');
                    break;
                case 'off':
                    this.eruda.changeTo('on');
                    break;
            }
        },
        onFullScreenToggle: function () {
            switch (this.display.currentId) {
                case 'fullscreen':
                    this.display.changeTo('page');
                    break;
                case 'page':
                    this.display.changeTo('fullscreen');
                    break;
            }
        },
        onFullWindowToggle: function () {
            switch (this.display.currentId) {
                case 'fullwindow':
                    this.display.changeTo('page');
                    break;
                case 'page':
                    this.display.changeTo('fullwindow');
                    break;
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
            if (this.display.currentId === 'page') {
                this.style.height = Math.round(0.75 * this.$el.scrollWidth) + 'px';
            }
            else {
                this.style.height = window.innerHeight + 'px';
            }
        }
    },
    mounted: function () {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.onWindowResize();
    },
    template: AppTemplate()
});
function AppTemplate() {
    return "\n<div id=\"postapp\" class=\"app-container panel-container\" \n  :style=\"style\"\n  v-cloak>\n  <div v-show=\"false\">\n  <!-- cache, give elements ref=\"\" to reference in methods -->\n  </div>\n  <teds-panel \n    :model=\"mainmenu\" \n    @panel-activate=\"onPanelSet\">\n    <div class=\"app-header\">\n      <h1>{{ content.mainmenu_title }}</h1>\n    </div>\n    <button @click=\"onThemeToggle(theme)\">\n      {{ theme.active ? content.theme_remove : content.theme_add }}\n    </button>\n    <button \n      :disabled=\"(display.currentId === 'fullscreen')\"\n      @click=\"onFullWindowToggle()\" >\n    {{ (display.currentId === 'fullwindow') ? content.fullwindow_remove : content.fullwindow_add }}\n    </button>\n    <button \n      :disabled=\"(display.currentId === 'fullwindow')\"\n      @click=\"onFullScreenToggle()\">\n    {{ (display.currentId === 'fullscreen') ? content.fullscreen_remove : content.fullscreen_add }}\n    </button>\n    <button\n      :disabled=\"(display.currentId === 'fullscreen')\" \n      @click=\"onErudaToggle()\">\n      {{ (eruda.currentId === 'on') ? content.eruda_remove : content.eruda_add }}\n    </button>\n  </teds-panel>\n  <div class=\"app-content layout-rows\">\n    <div class=\"app-header\">\n      <button\n        @click=\"onPanelSet(mainmenu, true)\">\n        <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"menu--svg\"><path fill-rule=\"evenodd\" d=\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\" clip-rule=\"evenodd\"></path></svg>\n      </button>\n      <h1 class=\"inline\">{{ content.app_title }}</h1>\n    </div>\n    <div class=\"app-body-content\">\n      <p>{{ content.app_description }}</p>\n    </div>\n    <div class=\"app-footer\">\n      <span>{{ content.app_author }}</span>\n    </div>\n  </div>\n</div>\n";
}
function AppTheme() {
    return "\n  .app-container {\n    color: black;\n    background-color: lightgray;\n  }\n  .app-content {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background-color: lightgray;\n  }\n  .v-cloak, .body-cloak header, .body-cloak main, .body-cloak footer {\n    display: none;\n  }\n  .app-header, .app-footer {\n    background-color: gray;\n    color: white;\n    padding-left: 0.5rem;\n  }\n  .bordered {\n    border: 1px solid black;\n  }\n  .centered {\n    display: grid;\n    place-items: center;\n  }\n  .inline {\n    display: inline;\n  }\n  .layout-rows {\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n  }\n  .layout-columns {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n  }\n  .column-width {\n    width: 12rem;\n  }\n  .app-body-content {\n    overflow: hidden;\n  }\n  .menu--svg {\n    width: 16px;\n    height: 16px;\n    display: block;\n  }";
}
;
function UserTheme(content) {
    return "\n  .app-content {\n    color: " + content.color + "\n  }";
}
;
