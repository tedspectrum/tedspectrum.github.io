function TreeFilteredIterator(tree, filterFn) {
  var ancestorIndexes = [],
    ancestorValues = [],
    current = null,
    isDone = false,
    searchIndex = 0,
    searchValue = null;
  if (typeof filterFn === "function") {
    this.filter = filterFn;
  } else {
    this.filter = function (/* node, index of node in ancestor, tree */) {
      // return true to include node in iterator output
      return true;
    }
  }
  this.next = function () {
    // there are no objects or variables in step.
    this.step();
    // iterator protocol requires return of an object
    return isDone ? { 'done': true } : { 'done': isDone, 'value': current };
  };
  this.step = function () {
    isDone = true;
    if (current === null) {
      // first step
      if (this.filter(tree, 0, tree)) {
        current = tree;
        isDone = false;
      }
    } else {
      if (current.contents && current.contents.length > 0) {
        ancestorIndexes.push(-1);
        ancestorValues.push(current);
      }
      while (ancestorValues.length !== 0 && isDone) {
        searchIndex = ancestorIndexes.pop() + 1;
        searchValue = ancestorValues.pop();
        while (searchIndex < searchValue.contents.length) {
          if (this.filter(searchValue.contents[searchIndex], searchIndex, tree)) {
            ancestorIndexes.push(searchIndex);
            ancestorValues.push(searchValue);
            current = searchValue.contents[searchIndex];
            isDone = false;
            break;
          }
          searchIndex++;
        }
      }
    }
  }
  this[Symbol.iterator] = function () { return this; };
}