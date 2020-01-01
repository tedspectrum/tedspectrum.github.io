const app = new Vue({
  el: '#app',
  data: function () {
    let d = {
      appheight: 0,
      appwidth: 0,
      changed: false,
      core: {},
      controlButton: {
        'disabled': true,
        'activeMsg': '',
        'msgLoading': 'Loading...',
        'msgReady': 'Start'
      },
      kb: {},
      showMain: false,
      showMenuPanel: false,
      showStartPanel: true,
      tileMapViewer: {},
      viewHeight: 240,
      viewWidth: 320,
      moveRate: 8,
      mousepresses: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      tileMapURL: '/assets/pages/gameone/gamemap0.json',
      tileMap: {},
      touches: {
        up: false,
        down: false,
        left: false,
        right: false
      }
    };
    return d;
  },
  mounted: function () {
    let myself = this;
    this.core = new Core();
    this.kb = new KeyHandler(window, {
      'up': 'w',
      'down': 's',
      'left': 'a',
      'right': 'd'
    });
    this.controlButton.activeMsg = this.controlButton.msgLoading;
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
    axios.get(this.tileMapURL).then(function (res) {
      myself.$set(myself, 'tileMap', res.data);
      myself.controlButton.activeMsg = myself.controlButton.msgReady;
      myself.controlButton.disabled = false;
    });
  },
  methods: {
    onEruda: function () {
      this.core.eruda();
    },
    onFullScreen: function () {
      this.core.toggleFullScreen(this.$el);
    },
    onMouseDown: function (buttonId) {
      if (this.mousepresses[buttonId] === false) {
        this.mousepresses[buttonId] = true;
      }
    },
    onMouseUp: function (buttonId) {
      if (this.mousepresses[buttonId] === true) {
        this.mousepresses[buttonId] = false;
      }
    },
    onResize: function () {
      this.appwidth = this.$el.offsetWidth;
      this.appheight = this.$el.offsetHeight;
    },
    onTouchStart: function (buttonId) {
      if (this.touches[buttonId] === false) {
        this.touches[buttonId] = true;
      }
    },
    onTouchEnd: function (buttonId) {
      if (this.touches[buttonId] === true) {
        this.touches[buttonId] = false;
      }
    },
    onTouchCancel: function (buttonId) {
      if (this.touches[buttonId] === true) {
        this.touches[buttonId] = false;
      }
    },
    run: function () {
      this.tileMapViewer = new TileMapViewer(
        {
          map: this.tileMap.layers[0],
          spriteSheet: this.$refs.tiles,
          tilesize: 32,
          outputEl: this.$refs.layer1
        }
      );
      this.kb.start();
      this.changed = true;
      this.boundUpdate = this.update.bind(this);
      this.showStartPanel = false;
      this.boundUpdate(0);
    },
    update: function (timestamp) {
      if (this.touches.left) { this.move(-1, 0); }
      if (this.touches.right) { this.move(1, 0); }
      if (this.touches.up) { this.move(0, -1); }
      if (this.touches.down) { this.move(0, 1); }
      if (!this.changed) {
        if (this.mousepresses.left) { this.move(-1, 0); }
        if (this.mousepresses.right) { this.move(1, 0); }
        if (this.mousepresses.up) { this.move(0, -1); }
        if (this.mousepresses.down) { this.move(0, 1); }
      }
      if (!this.changed) {
        if (this.kb.key.left) { this.move(-1, 0); }
        if (this.kb.key.right) { this.move(1, 0); }
        if (this.kb.key.up) { this.move(0, -1); }
        if (this.kb.key.down) { this.move(0, 1); }
      }
      if (this.changed === true) {
        this.changed = false;
        this.tileMapViewer.update();
      }
      window.requestAnimationFrame(this.boundUpdate);
    },
    move: function (moveX, moveY) {
      this.tileMapViewer.changeXY(moveX * this.moveRate, moveY * this.moveRate);
      this.changed = true;
    }
  }
});