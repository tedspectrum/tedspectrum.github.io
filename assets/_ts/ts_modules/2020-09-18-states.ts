// state machines
export const enum States {
  off,
  on,
  new,
  mounted,
  page,
  fullscreen,
  fullwindow
}
export const enum Transitions {
  leaveFullscreen,
  leaveFullwindow,
  mount,
  resize,
  showFullscreen,
  showFullwindow,
  showPage,
  switchOff,
  switchOn,
  toggle
}
export const AppViewDefinition = {
  initialState: States.new,
  data: {
    id: 'apptheme',
    content: {
      backgroundColor: 'white',
      color: 'blue'
    }
  },
  states: [
    {
      id: States.new,
      transitions: [
        { id: Transitions.mount, to: States.mounted }
      ]
    },
    {
      id: States.mounted,
      onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
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
}
export const DisplayDefinition = {
  initialState: States.page,
  data: {
    style: {
      height: ''
    }
  },
  states: [
    {
      id: States.page,
      onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        ctx.display.currentState.resize(ctx, d);
      },
      resize(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        d.style.height = Math.round(0.75 * (ctx.$el as HTMLElement).scrollWidth) + 'px';
      },
      transitions: [
        { id: Transitions.showFullscreen, to: States.fullscreen },
        { id: Transitions.showFullwindow, to: States.fullwindow },
        { id: Transitions.resize, to: States.page }
      ]
    },
    {
      id: States.fullscreen,
      onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        ctx.core.addFullScreen((ctx.$el as HTMLElement).id);
        ctx.eruda.transition(Transitions.switchOff);
        ctx.display.currentState.resize(ctx, d);
      },
      resize(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        d.style.height = window.innerHeight + 'px';
      },
      onLeave(ctx: { [key: string]: any; }) {
        ctx.core.removeFullScreen();
      },
      transitions: [
        { id: Transitions.leaveFullscreen, to: States.page },
        { id: Transitions.showPage, to: States.page },
        { id: Transitions.showFullwindow, to: States.fullwindow }
      ]
    },
    {
      id: States.fullwindow,
      onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        ctx.core.addFullWindow((ctx.$el as HTMLElement).id);
        ctx.display.currentState.resize(ctx, d);
      },
      resize(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        d.style.height = window.innerHeight + 'px';
      },
      onLeave(ctx: { [key: string]: any; }) {
        ctx.core.removeFullWindow((ctx.$el as HTMLElement).id);
      },
      transitions: [
        { id: Transitions.leaveFullwindow, to: States.page },
        { id: Transitions.showPage, to: States.page },
        { id: Transitions.showFullscreen, to: States.fullscreen }
      ]
    }
  ]
};
export const ErudaDefinition = {
  initialState: States.off,
  data: null,
  states: [
    {
      id: States.on,
      onEnter(ctx: { [key: string]: any; }) {
        ctx.core.addEruda();
      },
      transitions: [
        { id: Transitions.toggle, to: States.off },
        { id: Transitions.switchOff, to: States.off }
      ]
    },
    {
      id: States.off,
      onEnter(ctx: { [key: string]: any; }) {
        ctx.core.removeEruda();
      },
      transitions: [
        { id: Transitions.toggle, to: States.on },
        { id: Transitions.switchOn, to: States.on }
      ]
    }
  ]
};
export const MainMenuDefinition = {
  initialState: States.off,
  data: null,
  states: [
    {
      id: States.on,
      transitions: [
        { id: Transitions.switchOff, to: States.off }
      ]
    },
    {
      id: States.off,
      transitions: [
        { id: Transitions.switchOn, to: States.on }
      ]
    }
  ]
};
export const ThemeDefinition = {
  initialState: States.off, 
  data: {
    id: 'usertheme',
    content: {
      backgroundColor: 'white',
      color: 'blue'
    }
  },
  states: [
    {
      id: States.on,
      onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        ctx.core.addStyle(d.id, ctx.getUserTheme(d.content));
      },
      transitions: [
        { id: Transitions.toggle, to: States.off },
        { id: Transitions.switchOff, to: States.off }
      ]
    },
    {
      id: States.off,
      onEnter(ctx: { [key: string]: any; }, d: { [key: string]: any }) {
        ctx.core.removeStyle(d.id);
      },
      transitions: [
        { id: Transitions.toggle, to: States.on },
        { id: Transitions.switchOn, to: States.on }
      ]
    }
  ]
};