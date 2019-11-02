const app = new Vue({
  el: '#app',
  data: {
    loggerLength: 20,
    logger: [],
  },
  methods: {
    log: function (str) {
      this.logger.push(str);
      while (this.logger.length > this.loggerLength) {
        this.logger.shift();
      } 
    },
    run: function () {
      const bst = new BST(),
        src = [9, 4, 17, 3, 6, 22, 5, 7, 20];
      src.forEach(function(v) {
        bst.add(v);
      })
      this.log('findMinHeight (1) ' + bst.findMinHeight(bst.root));
      this.log('findMaxHeight (3) ' + bst.findMaxHeight(bst.root));
      this.log('isBalanced (false) ' + bst.isBalanced());
      bst.add(10);
      this.log('findMinHeight (2) ' + bst.findMinHeight(bst.root));
      this.log('findMaxHeight (3) ' + bst.findMaxHeight(bst.root));
      this.log('isBalanced (true) ' + bst.isBalanced());
      this.log('has 7 (true) ' + bst.has(7));
      this.log('has 8 (false) ' + bst.has(8));
      this.log('inOrder: ' + bst.inOrder());
      this.log('inOrder 7: ' + bst.inOrder(bst.find(7)));
      this.log('preOrder: ' + bst.preOrder());
      this.log('postOrder: ' + bst.postOrder());
      this.log('levelOrder: ' + bst.levelOrder());
    }
  }
});