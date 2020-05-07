Vue.component('ItemControls', {
  name: "Item-Controls",
  template: "<div class='item-controls'>"
    + "<ul>"
    + "<li v-for='(item, index) in items' :key='index' "
    + " "
    + ">"
    + "<button class='item-controls--button' " 
    + ":class='{ \"item-controls--active\": item.getSelected() }' "
    + "@click='onClick(index)'>"
    + "{{ item.$attrs['name'] }}"
    + "</button>"
    + "</li></ul>"
    + "</div>",
  props: {
    'items': {
      // the array of item components to manage.
      type: Array,
      required: true
    }
  },
  methods: {
    onClick: function(selectedIndex) {
      this.items.forEach(function(v, i) {
        v.setSelected(i === selectedIndex);
      })
    }
  }
});