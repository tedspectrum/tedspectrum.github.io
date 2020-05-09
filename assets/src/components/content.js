const ContentComponent = {
  name: 'teds-content',
  template: "<div v-show='model.active'><slot></slot></div>",
  props: {
    model: {
      required: false, 
      default: {
        'active': false
      }
    }
  }
};