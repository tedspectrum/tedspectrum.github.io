function TreeIterator(tree) {
  const ITERATOR_DONE = { 'done': true };
  var currentTree = tree, 
    currentValue = null, // object
    hasNext = true,
    nodeStackLength = 0,
    nodeStackIndexes = [],
    nodeStackValues = [],
    searchIndex = 0,
    searchValue = null, // object
    stepCount = 0;
  this.current = function () {
    return currentValue;
  }
  this.done = function () {
    return !hasNext;
  }
  this.next = function () {
    // iterator protocol requires return of an object
    return (this.step()) ? { 'done': false, 'value': currentValue } : ITERATOR_DONE;
  };
  this.reset = function () {
    currentValue = null; // object
    hasNext = true;
    nodeStackLength = 0;
    nodeStackIndexes = [];
    nodeStackValues = [];
    searchIndex = 0;
    searchValue = null; // object
    stepCount = 0;
    return this;
  };
  this.setTransform = function (newTransformFn) {
    if (typeof newTransformFn === "function") {
      this.transform = newTransformFn;
    }
    return this;
  };
  this.setTree = function (newTree) {
    currentTree = newTree;
    this.reset();
    return this;
  };
  this.step = function () {
    hasNext = false;
    if (stepCount === 0) {
      if (this.transform(currentTree, stepCount, this)) {
        currentValue = currentTree;
        hasNext = true;
      }
    } else if (currentValue.contents) {
      nodeStackIndexes[nodeStackLength] = -1;
      nodeStackValues[nodeStackLength] = currentValue;
      nodeStackLength++;
    }
    while (nodeStackLength > 0 && !hasNext) {
      nodeStackLength--;
      searchIndex = nodeStackIndexes[nodeStackLength] + 1;
      searchValue = nodeStackValues[nodeStackLength];
      while (searchIndex < searchValue.contents.length && !hasNext) {
        if (this.transform(searchValue.contents[searchIndex], stepCount, this)) {
          nodeStackIndexes[nodeStackLength] = searchIndex;
          nodeStackValues[nodeStackLength] = searchValue;
          nodeStackLength++;
          currentValue = searchValue.contents[searchIndex];
          hasNext = true;
        } else {
          searchIndex++;
        }
      }
    }
    stepCount++;
    return hasNext;
  }
  this.transform = function () {
    return true;
  }
  this[Symbol.iterator] = function () { return this; };
}