const c = new Core();
const app = new Vue({
  el: '#app',
  data: function () {
    return {
      url: '/assets/buttontree/btns.json',
      domain: {},
      content: ''
    }
  },
  mounted: function () {
    let myself = this;
    axios.get(myself.url, { 'responseType': 'json' })
      .then(function (res) {
        //console.log(res);
        myself.$set(myself, 'domain', res.data);
      });
  },
  methods: {
    onEruda: function (e) {
      c.eruda();
    },
    onBtnTreeClick: function (t) {
      // receives object from btn tree
      this.content += "Button " + t.text + " clicked.";
    }
  }
});