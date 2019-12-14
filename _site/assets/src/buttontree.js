const c = new Core();
c.eruda();
const app = new Vue({
  el: '#app',
  data: function () {
    return {
      btns: {
        contents: [
          { 'name': 'b1', 'text': 'first' },
          { 'name': 'b2', 'text': 'second' },
          { 'name': 'b3', 'text': 'third' },
          { 'name': 'b4', 'text': 'fourth' }
        ],
      },
      content: ''
    }
  },
  methods: {
    onItemClick: function (t) {
      this.content += "Button " + t.name + " clicked.";
    }
  }
});