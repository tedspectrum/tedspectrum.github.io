Vue.component('Tab', {
  name: "Tab",
  template: "<div v-show='isActive'><slot></slot></div>",
  props: {
    title: { default: "" },
    selected: { default: false }
  },
  data: function() {
    return {
      isActive: false
    }
  },
  mounted: function () {
    this.isActive = this.selected;
  }
});