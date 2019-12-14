function BST() {
  this.root = null;
}
const BSTproto = BST.prototype;
BSTproto.createNode = function (val) {
  return {
    'data': val,
    'left': null,
    'right': null
  }
}
BSTproto.add = function (data) {
  let current = this.root,
    added = false;
  if (this.root === null) {
    this.root = this.createNode(data);
  } else {
    while (current !== null && added === false) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = this.createNode(data);
          added = true;
        } else {
          current = current.left;
        }
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = this.createNode(data);
          added = true;
        } else {
          current = current.right;
        }
      } else {
        added = true;
      }
    }
  }
  return added;
}
BSTproto.findMin = function () {
  let current = this.root;
  while (current.left !== null) {
    current = current.left;
  }
  return current.data;
}
BSTproto.findMax = function () {
  let current = this.root;
  while (current.right !== null) {
    current = current.right;
  }
  return current.data;
}
BSTproto.find = function (data) {
  let current = this.root;
  let retVal = null;
  while (current !== null && retVal === null) {
    if (data === current.data) {
      retVal = current;
    } else if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return retVal;
}
BSTproto.has = function (data) {
  return (this.find(data) !== null);
}
BSTproto.remove = function (data) {
  const removeNode = function (node, data) {
    if (node === null) {
      return null;
    }
    if (data === node.data) {
      // node has no children
      if (node.left === null && node.right === null) {
        return null;
      }
      // node has no left child
      if (node.left === null) {
        return node.right;
      }
      // node has no right child
      if (node.right === null) {
        return node.left;
      }
      // node has two children
      var tempNode = node.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      node.data = tempNode.data;
      node.right = removeNode(node.right, tempNode.data);
      return node;
    } else if (data < node.data) {
      node.left = removeNode(node.left, data);
      return node;
    } else {
      node.right = removeNode(node.right, data);
      return node;
    }
  }
  this.root = removeNode(this.root, data);
}
BSTproto.isBalanced = function () {
  return (this.findMinHeight(this.root) >= this.findMaxHeight(this.root) - 1)
}
BSTproto.findMinHeight = function (node) {
  let retVal = -1;
  if (node !== null) {
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    retVal = (left < right) ? left + 1 : right + 1;
  }
  return retVal;
}
BSTproto.findMaxHeight = function (node) {
  let retVal = -1;
  if (node !== null) {
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    retVal = (left > right) ? left + 1 : right + 1;
  }
  return retVal;
}
BSTproto.traverseInOrder = function (prevVals, node) {
  if (node !== null) {
    if (node.left) {
      this.traverseInOrder(prevVals, node.left);
    }
    prevVals.push(node.data);
    if (node.right) {
      this.traverseInOrder(prevVals, node.right);
    }
  }
}
BSTproto.inOrder = function () {
  let vals = [];
  this.traverseInOrder(vals, this.root);
  return vals;
}
BSTproto.preOrder = function () {
  if (this.root === null) {
    return null;
  } else {
    var result = [];
    function traversePreOrder(node) {
      result.push(node.data);
      node.left && traversePreOrder(node.left);
      node.right && traversePreOrder(node.right);
    };
    traversePreOrder(this.root);
    return result;
  };
}
BSTproto.postOrder = function () {
  if (this.root === null) {
    return null;
  } else {
    var result = [];
    function traversePostOrder(node) {
      node.left && traversePostOrder(node.left);
      node.right && traversePostOrder(node.right);
      result.push(node.data);
    };
    traversePostOrder(this.root);
    return result;
  }
}
BSTproto.levelOrder = function () {
  let result = [];
  let Q = [];
  if (this.root != null) {
    Q.push(this.root);
    while (Q.length > 0) {
      let node = Q.shift();
      result.push(node.data);
      if (node.left != null) {
        Q.push(node.left);
      };
      if (node.right != null) {
        Q.push(node.right);
      };
    };
    return result;
  } else {
    return null;
  };
}
