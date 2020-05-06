Vue.component('TabGroup', {
  name: "Tab-Group",
  template: "<div class='tabgroup'>"
    + "<ul><li v-for='(tab, index) in tabs' :key='index' "
    + ":class='{ \"tabgroup-isactive\": tab.isActive }' "
    + "@click='onSelectTab(index)' >"
    + "<span class='tabgroup-title'>"
    + "{{ tab.$attrs['tab-name'] }}"
    + "</span>"
    + "</li></ul><div><slot></slot></div></div>",
  data: function() {
    return {
      tabs: this.$children
    }
  },
  methods: {
    onSelectTab: function(selectedIndex) {
      for(var i = 0; i < this.tabs.length; i++) {
        if (i === selectedIndex) {
          this.tabs[i].isActive = true;
        } else {
          this.tabs[i].isActive = false;
        }
        //console.log(this.tabs[i]);
      }
    }
  }
});