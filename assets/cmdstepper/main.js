function CmdTickerWords(twm) {
  /* 
    moves first word from hidden into shown each time do() is called 
    ttm is { src: '', shown: '', hidden: '' }
  */
  this.do = function (m, v) {
    let wordEnd = twm.hidden.indexOf(' ');
    if (wordEnd !== -1) {
      twm.shown += twm.hidden.substring(0, wordEnd + 1);
      twm.hidden = twm.hidden.substring(wordEnd + 1);
    } else {
      twm.shown += twm.hidden;
      twm.hidden = '';
    }
  }
  this.isDone = function (m, v) {
    return (twm.hidden === '');
  }
  this.reset = function (m, v) {
    twm.hidden = twm.src;
    twm.shown = '';
  }
}
const app = new Vue({
  el: '#app',
  data: function () {
    return {
      'cmds': new CmdList([]),
      'cmdStates': [
        {
          src: '',
          shown: '',
          hidden: ''
        },
        {
          src: '',
          shown: '',
          hidden: ''
        }
      ],
      'elsrc': 'ttin',
      'stepper': new CmdStepper(100)
    }
  },
  methods: {
    onRun: function () {
      // prepare commands
      let cmds = this.cmds;
      // first, clear command list
      cmds.empty();
      // easy way to put text into tt
      this.cmdStates[0].src = this.$refs[this.elsrc].value;
      this.cmdStates[1].src = this.$refs[this.elsrc].value.toUpperCase();
      // create command in command list for each state
      this.cmdStates.forEach(function (v, i, a) {
        cmds.push(new CmdTickerWords(v));
      });
      // start stepping, using the commands
      this.stepper.firstStep(this.$data, this, cmds);
    }
  }
});