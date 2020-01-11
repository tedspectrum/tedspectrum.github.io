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
      viewHeight: 230,
      viewWidth: 330,
      moveRate: 8,
      mousepress: '',
      mousepresses: {
        up: true,
        down: true,
        left: true,
        right: true
      },
      player: {},
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
      this.mousepress = '';
      if (this.mousepresses[buttonId]) {
        this.mousepress = buttonId;
      }
    },
    onMouseUp: function (buttonId) {
      this.mousepress = '';
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
      this.camera = new Camera(this.tileMap, this.viewWidth, this.viewHeight);
      this.tileMap.layers.splice(1,0, {
        "data":[61],
        "height":1,
        "name":"Player",
        "opacity":1,
        "type":"tilelayer",
        "visible":true,
        "width":1,
        "x":0,
        "y":0
       });
       this.tileMap.layers.splice(2,0, {
        "data":[84, 85, 86, 104, 105, 106, 124, 125, 126],
        "height":3,
        "name":"Player2",
        "opacity":1,
        "type":"tilelayer",
        "visible":true,
        "width":3,
        "x": 250,
        "y": 40
       });
      this.tileMapViewer = new TileMapViewer(
        {
          map: this.tileMap,
          spriteSheet: this.$refs.tiles,
          outputEl: [this.$refs.background, this.$refs.player1, this.$refs.player2, this.$refs.foreground],
          view: this.camera
        }
      );
      this.player = new Player(this.tileMap, 0, 0);
      this.camera.follow(this.player);
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
        if (this.mousepress === 'left') { this.move(-1, 0); }
        if (this.mousepress === 'right') { this.move(1, 0); }
        if (this.mousepress === 'up') { this.move(0, -1); }
        if (this.mousepress === 'down') { this.move(0, 1); }
      }
      if (!this.changed) {
        if (this.kb.key.left) { this.move(-1, 0); }
        if (this.kb.key.right) { this.move(1, 0); }
        if (this.kb.key.up) { this.move(0, -1); }
        if (this.kb.key.down) { this.move(0, 1); }
      }
      if (this.changed === true) {
        this.changed = false;
        this.camera.update();
        this.tileMap.layers[1].x = this.player.x;
        this.tileMap.layers[1].y = this.player.y;
        this.tileMapViewer.update();
      }
      window.requestAnimationFrame(this.boundUpdate);
    },
    move: function (moveX, moveY) {
      // move player
      this.player.move(moveX, moveY);
      this.changed = true;
    }
  }
});