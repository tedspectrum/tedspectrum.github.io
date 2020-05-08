const ContentComponent = {
  name: 'teds-content',
  template: "<div v-show='active'><slot></slot></div>",
  props: {
    active: {
      required: false, 
      default: false
    }
  }
};