const c = new Core();
const app = new Vue({
  el: '#app',
  data: function () {
    return {
      url: '/assets/buttontree/btns.json',
      domain: {},
      content: '',
      path: ''
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
    onBtnTreeClick: function (t, p) {
      // receives object from btn tree
      let newPath = '';
      p.forEach(function(v,i,a) {
        newPath += v.text;
        if(i < a.length) {
          newPath += ' > ';
        }
      })
      newPath = newPath + t.text;
      this.path = newPath;
      this.content = JSON.stringify(t,null, 2);
    }
  }
});