export const AppViewDefinition = {
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
                ctx.core.addStyle(d.id, ctx.getAppTheme(d.content));
                ctx.display.currentState.resize(ctx, ctx.display.data);
            },
            transitions: []
        },
    ]
};
export const DisplayDefinition = {
    initialState: 4,
    data: {
        style: {
            height: ''
        }
    },
    states: [
        {
            id: 4,
            onEnter(ctx, d) {
                ctx.display.currentState.resize(ctx, d);
            },
            resize(ctx, d) {
                d.style.height = Math.round(0.75 * ctx.$el.scrollWidth) + 'px';
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
            },
            resize(ctx, d) {
                d.style.height = window.innerHeight + 'px';
            },
            onLeave(ctx) {
                ctx.core.removeFullScreen();
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
            },
            resize(ctx, d) {
                d.style.height = window.innerHeight + 'px';
            },
            onLeave(ctx) {
                ctx.core.removeFullWindow(ctx.$el.id);
            },
            transitions: [
                { id: 1, to: 4 },
                { id: 6, to: 4 },
                { id: 4, to: 5 }
            ]
        }
    ]
};
export const ErudaDefinition = {
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
export const MainMenuDefinition = {
    initialState: 0,
    data: null,
    states: [
        {
            id: 1,
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
export const ThemeDefinition = {
    initialState: 0,
    data: {
        id: 'usertheme',
        content: {
            backgroundColor: 'white',
            color: 'blue'
        }
    },
    states: [
        {
            id: 1,
            onEnter(ctx, d) {
                ctx.core.addStyle(d.id, ctx.getUserTheme(d.content));
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
