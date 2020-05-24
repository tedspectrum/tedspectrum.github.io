const app = new Vue({
  el: '#app',
  data: function () {
    let d = {
      appheight: 0,
      appwidth: 0,
      changed: false,
      core: {},
      controlButton: {
        disabled: true,
        activeMsg: '',
        msgLoading: 'Loading...',
        msgReady: 'Start'
      },
      kb: {},
      inputkeys: {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd'
      },
      inputmouse: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      inputtouch: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      layers: [
        {
          "data": [61],
          "height": 1,
          "name": "Player",
          "opacity": 1,
          "type": "tilelayer",
          "visible": true,
          "width": 1,
          "x": 0,
          "y": 0
        },
        {
          "data": [84, 85, 86, 104, 105, 106, 124, 125, 126],
          "height": 3,
          "name": "Player2",
          "opacity": 1,
          "type": "tilelayer",
          "visible": true,
          "width": 3,
          "x": 250,
          "y": 40
        },
        {
          "type": "objectlayer",
          "opacity": 1,
          "visible": true,
          "data": [
            {
              "x": 50,
              "y": 50,
              "width": 2,
              "height": 2,
              "id": 82
            }
          ]
        }
      ],
      player: {},
      tileMap: {},
      tileMapURL: '/assets/projects/gameone/gamemap0.json',
      tileMapViewer: {},
      showMain: false,
      showMenuPanel: false,
      showStartPanel: true,
      viewHeight: 240,
      viewWidth: 320,
    };
    return d;
  },
  mounted: function () {
    let myself = this;
    this.core = new Core();
    this.kb = new KeyHandler(window, this.inputkeys);
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
      this.onMouseUp();
      if (this.inputmouse[buttonId] === false) {
        this.inputmouse[buttonId] = true;
      }
    },
    onMouseUp: function () {
      for (let prop in this.inputmouse) {
        if (this.inputmouse.hasOwnProperty(prop)) {
          this.inputmouse[prop] = false;
        }
      }
    },
    onResize: function () {
      this.appwidth = this.$el.offsetWidth;
      this.appheight = this.$el.offsetHeight;
    },
    onTouchStart: function (buttonId) {
      if (this.inputtouch[buttonId] === false) {
        this.inputtouch[buttonId] = true;
      }
    },
    onTouchEnd: function (buttonId) {
      if (this.inputtouch[buttonId] === true) {
        this.inputtouch[buttonId] = false;
      }
    },
    onTouchCancel: function (buttonId) {
      if (this.inputtouch[buttonId] === true) {
        this.inputtouch[buttonId] = false;
      }
    },
    run: function () {
      this.camera = new Camera(this.tileMap, this.viewWidth, this.viewHeight);
      this.tileMap.layers.splice(1, 0, this.layers[0]);
      this.tileMap.layers.splice(2, 0, this.layers[1]);
      this.tileMap.layers.splice(3, 0, this.layers[2]);
      this.tileMapViewer = new TileMapViewer(
        {
          map: this.tileMap,
          spriteSheet: this.$refs.tiles,
          outputEl: [this.$refs.background, this.$refs.player1, this.$refs.player2, this.$refs.objects, this.$refs.foreground],
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
      if (this.inputtouch.left) { this.move(-1, 0); }
      if (this.inputtouch.right) { this.move(1, 0); }
      if (this.inputtouch.up) { this.move(0, -1); }
      if (this.inputtouch.down) { this.move(0, 1); }
      if (!this.changed) {
        if (this.inputmouse.left) { this.move(-1, 0); }
        if (this.inputmouse.right) { this.move(1, 0); }
        if (this.inputmouse.up) { this.move(0, -1); }
        if (this.inputmouse.down) { this.move(0, 1); }
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