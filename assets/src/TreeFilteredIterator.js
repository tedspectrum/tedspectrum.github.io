function TreeFilteredIterator(tree, filterFn) {
  const DONE_VALUE = { 'done': true };
  var currentValue = null, // object
    hasNext = true,
    nodeStackLength = 0,
    nodeStackIndexes = [],
    nodeStackValues = [],
    searchIndex = 0,
    searchValue = null, // object
    stepCount = 0;
  if (typeof filterFn === "function") {
    this.filter = filterFn;
  } else {
    this.filter = function (/* node, number of steps to node in iteration, iterator */) {
      // return true to include node in iterator output
      return true;
    }
  }
  this.next = function () {
    // there are no objects or variables in step.
    this.step();
    // iterator protocol requires return of an object
    return (hasNext) ? { 'done': false, 'value': currentValue } : DONE_VALUE;
  };
  this.step = function () {
    hasNext = false;
    if (stepCount === 0) {
      if (this.filter(tree, stepCount, this)) {
        currentValue = tree;
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
        if (this.filter(searchValue.contents[searchIndex], stepCount, this)) {
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
  }
  this[Symbol.iterator] = function () { return this; };
}