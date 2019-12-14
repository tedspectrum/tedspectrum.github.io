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
          {
            "type": "directory",
            "name": "emptydir",
            "path": "emptydir",
            "contents": []
          },
          {
            "type": "file",
            "name": "index.js",
            "path": "index.js"
          },
          {
            "type": "file",
            "name": "package.json",
            "path": "package.json"
          },
          {
            "type": "file",
            "name": "test.json",
            "path": "test.json"
          },
          {
            "type": "directory",
            "name": "testdirectory",
            "path": "testdirectory",
            "contents": [
              {
                "type": "directory",
                "name": "emptysubdir1",
                "path": "testdirectory/emptysubdir1",
                "contents": []
              },
              {
                "type": "file",
                "name": "file1.html",
                "path": "testdirectory/file1.html"
              },
              {
                "type": "file",
                "name": "file11.txt",
                "path": "testdirectory/file11.txt"
              },
              {
                "type": "file",
                "name": "file2.txt",
                "path": "testdirectory/file2.txt"
              },
              {
                "type": "file",
                "name": "file3.md",
                "path": "testdirectory/file3.md"
              },
              {
                "type": "directory",
                "name": "subdir1",
                "path": "testdirectory/subdir1",
                "contents": [
                  {
                    "type": "file",
                    "name": "file4.txt",
                    "path": "testdirectory/subdir1/file4.txt"
                  },
                  {
                    "type": "file",
                    "name": "file5.txt",
                    "path": "testdirectory/subdir1/file5.txt"
                  },
                  {
                    "type": "file",
                    "name": "file6.txt",
                    "path": "testdirectory/subdir1/file6.txt"
                  },
                  {
                    "type": "file",
                    "name": "file7.txt",
                    "path": "testdirectory/subdir1/file7.txt"
                  },
                  {
                    "type": "file",
                    "name": "file8.txt",
                    "path": "testdirectory/subdir1/file8.txt"
                  }
                ]
              },
              {
                "type": "directory",
                "name": "subdir2",
                "path": "testdirectory/subdir2",
                "contents": [
                  {
                    "type": "file",
                    "name": "file10.txt",
                    "path": "testdirectory/subdir2/file10.txt"
                  },
                  {
                    "type": "file",
                    "name": "file9.txt",
                    "path": "testdirectory/subdir2/file9.txt"
                  }
                ]
              }
            ]
          }
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