const ButtonListComponent = {
  name: "teds-buttonlist",
  template: "<div class='buttonlist'>"
    + "<ul>"
    + "<li v-for='(item, index) in collection' :key='index' "
    + " "
    + ">"
    + "<button class='buttonlist--button' "
    + ":class='{ \"buttonlist--active\": item.active }' "
    + "@click=\"bus.$emit('buttonlist:select', item, index, collection)\">"
    + "{{ item.name }}"
    + "</button>"
    + "</li></ul>"
    + "</div>",
  mixins: [EventBusMixin],
  props: {
    'collection': {
      // the array of items to manage.
      // { name: String, active: Boolean}
      type: Array,
      required: true
    }
  }
};