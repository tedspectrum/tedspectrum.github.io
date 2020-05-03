Vue.component('TabGroup', {
  name: "Tab-Group",
  template: "<div class='tabgroup'>"
    + "<ul><li v-for='(tab, index) in tabs' :key='index' "
    + ":class='{ \"tabgroup-isactive\": tab.isActive }' "
    + "@click='onSelectTab(index)' >"
    + "<span class='tabgroup-title'>"
    + "{{ tab.title }}"
    + "</span>"
    + "</li></ul><div><slot></slot></div></div>",
  props: {
  },
  data: function() {
    return {
      tabs: []
    }
  },
  created: function () {
    this.tabs = this.$children;
  },
  methods: {
    onSelectTab: function(selectedIndex) {
      for(var i = 0; i < this.tabs.length; i++) {
        if (i === selectedIndex) {
          this.tabs[i].isActive = true;
        } else {
          this.tabs[i].isActive = false;
        }
      }
    }
  }
});