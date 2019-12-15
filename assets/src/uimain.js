//const c = new Core();
//c.eruda();
const app = new Vue({
  el: '#app',
  data: function () {
    return {
      activePanel: {
        classes: [''],
        contents: [{}],
        overlay: true,
        transition: 'zoomin'
      },
      activePanelVisible: false,
      content: `
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Error quam reiciendis expedita ex suscipit earum ut sapiente dolor 
        debitis deserunt, id eum est exercitationem eveniet qui possimus 
        numquam nemo rerum.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Error quam reiciendis expedita ex suscipit earum ut sapiente dolor 
        debitis deserunt, id eum est exercitationem eveniet qui possimus 
        numquam nemo rerum.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Error quam reiciendis expedita ex suscipit earum ut sapiente dolor 
        debitis deserunt, id eum est exercitationem eveniet qui possimus 
        numquam nemo rerum.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Error quam reiciendis expedita ex suscipit earum ut sapiente dolor 
        debitis deserunt, id eum est exercitationem eveniet qui possimus 
        numquam nemo rerum.
        `,
      leftMenu: {
        classes: ['panel-fulllengthleft'],
        items: [
          { 'name': 'l1', 'text': 'first' },
          { 'name': 'l2', 'text': 'second' },
          { 'name': 'l3', 'text': 'third' },
          { 'name': 'l4', 'text': 'fourth' }
        ],
        overlay: true,
        transition: 'slideright'
      },
      rightMenu: {
        classes: ['panel-fulllengthright'],
        items: [
          { 'name': 'r1', 'text': 'first' },
          { 'name': 'r2', 'text': 'second' },
          { 'name': 'r3', 'text': 'third' },
          { 'name': 'r4', 'text': 'fourth' }
        ],
        overlay: true,
        transition: 'slideleft'
      },
      topMenu: {
        classes: ['panel-fullwidthtop'],
        items: [
          { 'name': 't1', 'text': 'first' },
          { 'name': 't2', 'text': 'second' },
          { 'name': 't3', 'text': 'third' },
          { 'name': 't4', 'text': 'fourth' }
        ],
        overlay: true,
        transition: 'slidedown'
      },
      bottomMenu: {
        classes: ['panel-fullwidthbottom'],
        items: [
          { 'name': 'b1', 'text': 'first' },
          { 'name': 'b2', 'text': 'second' },
          { 'name': 'b3', 'text': 'third' },
          { 'name': 'b4', 'text': 'fourth' }
        ],
        overlay: true,
        transition: 'slideup'
      },
      fullMenu: {
        classes: ['panel-full'],
        items: [
          { 'name': 'b1', 'text': 'first' },
          { 'name': 'b2', 'text': 'second' },
          { 'name': 'b3', 'text': 'third' },
          { 'name': 'b4', 'text': 'fourth' }
        ],
        overlay: true,
        transition: 'zoomin'
      }
    }
  },
  methods: {
    onMenuButtonClick: function (menuName) {
      if (!this.activePanelVisible) {
        this.activePanelVisible = true;
        switch (menuName) {
          case 'left':
            this.$set(this, 'activePanel', this.leftMenu);
            break;
          case 'right':
            this.$set(this, 'activePanel', this.rightMenu);
            break;
          case 'top':
            this.$set(this, 'activePanel', this.topMenu);
            break;
          case 'bottom':
            this.$set(this, 'activePanel', this.bottomMenu);
            break;
          case 'full':
            this.$set(this, 'activePanel', this.fullMenu);
            break;
        }
      }
    },
    onMenuItemClick: function (btnName) {
      this.content += "Button " + btnName + " clicked.";
    }
  }
});