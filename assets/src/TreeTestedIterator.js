function TreeTestedIterator(tree) {
  var ancestors = [], // { value: node, index: index of descendant }
    current = null,
    search = null;
  this.test = function (nextVal) {
    return !nextVal.disabled;
  }
  this.next = function () {
    let ret = {
      value: null,
      done: true // false if next has produced value, true if no more values
    }
    if (current === null && this.test(tree)) {
      // first step
      current = tree;
      ret.value = current;
      ret.done = false;
    } else if (current !== null
      && current.contents
      && current.contents.length > 0) {
      // next value is first descendant that passes test
      let idx = 0;
      while (idx < current.contents.length) {
        if(this.test(current.contents[idx])) {
          ancestors.push({ value: current, index: idx });
          current = current.contents[idx];
          ret.value = current;
          ret.done = false;
          break;
        }
        idx++;
      }
    } else {
      while (ancestors.length !== 0 && ret.done) {
        search = ancestors.pop();
        while (search.index < search.value.contents.length - 1 && ret.done) {
          search.index++;
          if (this.test(search.value.contents[search.index])) {
            ancestors.push({ value: search.value, index: search.index });
            current = search.value.contents[search.index];
            ret.value = current;
            ret.done = false;
          }
        }
      }
    }
    return ret;
  }
  this[Symbol.iterator] = function () { return this; };
}