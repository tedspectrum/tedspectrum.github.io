function TreeIterator(tree) {
  var ancestors = [], // { value: node, index: index of descendant }
    current = null;
    search = null;
  this.next = function () {
    let ret = {
      value: null,
      done: true // false if next has produced value, true if no more values
    }
    if (current === null) {
      // first step
      current = tree;
      ret.value = current;
      ret.done = false;
    } else if (current.contents && current.contents.length !== 0) {
      // next value is first descendant
      ancestors.push({ value: current, index: 0 });
      current = current.contents[0];
      ret.value = current;
      ret.done = false;
    } else {
      while (ancestors.length !== 0 && ret.done) {
        search = ancestors.pop();
        if (search.index < search.value.contents.length - 1) {
          ancestors.push({ value: search.value, index: search.index + 1 });
          current = search.value.contents[search.index + 1];
          ret.value = current;
          ret.done = false;
        }
      }
    }
    return ret;
  }
  this[Symbol.iterator] = function() { return this; };
}