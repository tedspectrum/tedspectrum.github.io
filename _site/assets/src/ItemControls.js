const ItemControlsComponent = {
  name: "itemcontrols",
  template: "<div class='item-controls'>"
    + "<ul>"
    + "<li v-for='(item, index) in items' :key='index' "
    + " "
    + ">"
    + "<button class='item-controls--button' "
    + ":class='{ \"item-controls--active\": item.active }' "
    + "@click='onClick(index)'>"
    + "{{ item.name }}"
    + "</button>"
    + "</li></ul>"
    + "</div>",
  props: {
    'items': {
      // the array of items to manage.
      // { name: String, active: Boolean}
      type: Array,
      required: true
    }
  },
  mixins: [EventBusMixin],
  methods: {
    onClick: function (selectedIndex) {
      let myself = this;
      this.items.forEach(function (v, i) {
        myself.bus.$emit('itemcontrols:select', v, (i === selectedIndex));
      })
    }
  }
};