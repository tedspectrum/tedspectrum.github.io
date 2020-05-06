Vue.component('Tab', {
  name: "Tab",
  template: "<div v-show='isActive'><slot></slot></div>",
  props: {
    selected: { default: false }
  },
  data: function() {
    return {
      isActive: this.selected
    }
  }
});