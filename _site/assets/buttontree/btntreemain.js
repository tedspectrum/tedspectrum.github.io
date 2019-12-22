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
    onFullScreen: function () {
      c.toggleFullScreen(this.$el);
    },
    onNodeSelect: function (t, p) {
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
    },
    onTreeSelect: function (t /*, p */) {
			// dynamically added expanded property as needed.
			if (!t.hasOwnProperty('expanded')) {
				this.$set(t, 'expanded', false);
			}
			t.expanded = !t.expanded;
    }
  }
});