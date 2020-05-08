const ItemComponent = {
  name: "Item",
  template: "<div v-show='selected'><slot></slot></div>",
  props: {
    selected: {
      required: false, 
      default: false
    }
  }
};