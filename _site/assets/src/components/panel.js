const PanelComponent = {
  name: 'teds-panel',
  template: "<div>"
    + "<transition :name='overlayTransition'>"
    + "<div v-show='model.active && overlay' class='overlay' "
    + "@click=\"bus.$emit('panel:activate', model, false)\"></div>"
    + "</transition>"
    + "<transition :name='transition'>"
    + "<div v-show='model.active' class='panel' :class='classes'>"
    + "<slot></slot>"
    + "</div>"
    + "</transition>"
    + "</div>",
  mixins: [EventBusMixin],
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
    'overlay-transition': {
      type: String,
      default: "fadeinout"
    },
    transition: {
      type: String,
      default: "slideright"
    }
  }
};