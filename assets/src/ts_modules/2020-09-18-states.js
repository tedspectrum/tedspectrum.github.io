const AppViewDefinition = {
    initialState: 2,
    data: {
        id: 'apptheme',
        content: {
            backgroundColor: 'white',
            color: 'blue'
        }
    },
    states: [
        {
            id: 2,
            transitions: [
                { id: 2, to: 3 }
            ]
        },
        {
            id: 3,
            onEnter(ctx, d) {
                function onResize() {
                    ctx.display.currentState.resize(ctx, ctx.display.data);
                }
                window.addEventListener('resize', onResize);
                ctx.core.addStyle(d.id, ctx.cssTemplates.app(d.content));
                ctx.display.currentState.resize(ctx, ctx.display.data);
                ctx.theme.transition(8);
            },
            transitions: []
        },
    ]
};
const DisplayDefinition = {
    initialState: 4,
    data: {
        isFullscreenActive: false,
        isFullwindowActive: false,
        isPageActive: true,
        style: {
            height: ''
        }
    },
    states: [
        {
            id: 4,
            onEnter(ctx, d) {
                ctx.display.currentState.resize(ctx, d);
                d.isPageActive = true;
            },
            resize(ctx, d) {
                d.style.height = Math.round(0.75 * ctx.$el.scrollWidth) + 'px';
            },
            onLeave(ctx, d) {
                d.isPageActive = false;
            },
            transitions: [
                { id: 4, to: 5 },
                { id: 5, to: 6 },
                { id: 3, to: 4 }
            ]
        },
        {
            id: 5,
            onEnter(ctx, d) {
                ctx.core.addFullScreen(ctx.$el.id);
                ctx.eruda.transition(7);
                ctx.display.currentState.resize(ctx, d);
                d.isFullscreenActive = true;
            },
            resize(ctx, d) {
                d.style.height = window.innerHeight + 'px';
            },
            onLeave(ctx, d) {
                ctx.core.removeFullScreen();
                d.isFullscreenActive = false;
            },
            transitions: [
                { id: 0, to: 4 },
                { id: 6, to: 4 },
                { id: 5, to: 6 }
            ]
        },
        {
            id: 6,
            onEnter(ctx, d) {
                ctx.core.addFullWindow(ctx.$el.id);
                ctx.display.currentState.resize(ctx, d);
                d.isFullwindowActive = true;
            },
            resize(ctx, d) {
                d.style.height = window.innerHeight + 'px';
            },
            onLeave(ctx, d) {
                ctx.core.removeFullWindow(ctx.$el.id);
                d.isFullwindowActive = false;
            },
            transitions: [
                { id: 1, to: 4 },
                { id: 6, to: 4 },
                { id: 4, to: 5 }
            ]
        }
    ]
};
const ErudaDefinition = {
    initialState: 0,
    data: null,
    states: [
        {
            id: 1,
            onEnter(ctx) {
                ctx.core.addEruda();
            },
            transitions: [
                { id: 9, to: 0 },
                { id: 7, to: 0 }
            ]
        },
        {
            id: 0,
            onEnter(ctx) {
                ctx.core.removeEruda();
            },
            transitions: [
                { id: 9, to: 1 },
                { id: 8, to: 1 }
            ]
        }
    ]
};
const MainMenuDefinition = {
    initialState: 0,
    data: {
        active: false
    },
    states: [
        {
            id: 1,
            onEnter: function (ctx, d) {
                d.active = true;
            },
            onLeave: function (ctx, d) {
                d.active = false;
            },
            transitions: [
                { id: 7, to: 0 }
            ]
        },
        {
            id: 0,
            transitions: [
                { id: 8, to: 1 }
            ]
        }
    ]
};
const ThemeDefinition = {
    initialState: 0,
    data: {
        id: 'usertheme',
        content: {
            baseColor: 'white',
            highlightColor1: 'darkgray',
            highlightColor2: 'lightgray',
            mainmenu: {
                panel: {
                    backgroundColor: 'lightgray'
                },
                overlay: {
                    backgroundColor: 'darkgray'
                }
            }
        }
    },
    states: [
        {
            id: 1,
            onEnter(ctx, d) {
                ctx.core.addStyle(d.id, ctx.cssTemplates.user(d.content));
            },
            transitions: [
                { id: 9, to: 0 },
                { id: 7, to: 0 }
            ]
        },
        {
            id: 0,
            onEnter(ctx, d) {
                ctx.core.removeStyle(d.id);
            },
            transitions: [
                { id: 9, to: 1 },
                { id: 8, to: 1 }
            ]
        }
    ]
};
export { AppViewDefinition, DisplayDefinition, ErudaDefinition, MainMenuDefinition, ThemeDefinition };
