Vue.component('Item', {
  name: "Item",
  template: "<div v-show='active'><slot></slot></div>",
  props: {
    selected: {
      required: false, 
      default: false
    }
  },
  data: function() {
    return {
      active: this.selected
    }
  },
  methods: {
    getSelected: function() {
      return this.active;
    },
    setSelected: function(bool) {
      if (this.active !== bool) {
        this.active = bool;
      }
    }
  }
});