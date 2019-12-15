const c = new Core();
const app = new Vue({
  el: '#app',
  data: function () {
    return {
      btns: {
      	'name': 'root',
				'text': 'root',
        'contents': [
          { 'name': 'b1', 'text': 'multi-level', 'contents': [
          	{ 'name': 'b1.1', 'text': 'content 1.1' },
          	{ 'name': 'b1.2', 'text': 'content 1.2', 'contents' : [
          		{ 'name': 'b1.2.1', 'text': 'content 1.2.1' }
          	] }
          ] },
          { 'name': 'b2', 'text': 'empty', 'contents': [] },
          { 'name': 'b3', 'text': 'one item', 'contents': [
          	{ 'name': 'b3.1', 'text': 'content1' }
          ] },
          { 'name': 'b4', 'text': 'fourth' }
        ],
      },
      content: ''
    }
  },
  methods: {
  	onEruda: function (e) {
  		c.eruda();
  	},
    onItemClick: function (e) {
    	console.log(e);
      this.content += "Button " + e.target.name + " clicked.";
    }
  }
});