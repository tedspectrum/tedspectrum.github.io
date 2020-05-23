/**
 * LocalStorage wrapper
 * @class
 * @constructor
 */
function LocalStorage() {
  this.src = window.localStorage;
  this.size = this.src.length;
  this[Symbol.iterator] = function () {
    var index = -1,
      store = this;
    return {
      next: function () {
        let state = { value: { key: null, value: null }, done: false };
        index++;
        if (index >= store.count()) {
          state.value = null;
          state.done = true;
        } else {
          state.value.key = store.src.key(index);
          state.value.value = store.get(store.src.key(index));
          state.done = false;
        }
        return state;
      },
    };
  };
}

/**
 * Add a key value pair to the storage
 * @method isAvailable
 * @memberof! LocalStorage
 * @returns {Boolean} whether localStorage is available
 */
LocalStorage.isAvailable = function () {
  try {
    window.localStorage.setItem("testkey", "testVal");
    window.localStorage.removeItem("testkey");
    return true;
  } catch (e) {
    return false;
  }
};
LocalStorage.prototype = {
  /**
   * Add a key value pair to the storage
   * @method LocalStorage#add
   * @param {String} key the unique key to identify the value in the store
   * @param {Object} val the value to store
   * @returns {Boolean} whether the add was successful
   */
  add: function (key, val) {
    if (!this.has(key)) {
      try {
        this.src.setItem(key, JSON.stringify(val));
        this.size = this.src.length;
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  /**
   * Remove a key value pair to the storage
   * @method LocalStorage#delete
   * @param {String} key the unique key to identify the value in the store
   * @returns {Boolean} whether the deletion was successful
   */
  remove: function (key) {
    let isDeleted = false;
    if (this.has(key)) {
      this.src.removeItem(key);
      this.size = this.src.length;
      isDeleted = true;
    }
    return isDeleted;
  },
  /**
   * Remove all key value pairs from storage
   * @method LocalStorage#clear
   * @returns {Boolean} whether the clear was successful
   */
  clear: function () {
    this.src.clear();
    this.size = this.src.length;
    return true;
  },
  /**
   * Getter for the number of key value pairs in storage
   * @method LocalStorage#count
   * @returns {Number} the number of key value pairs in storage
   */
  count: function () {
    return this.size;
  },
  /**
   * Get a value identified by a key
   * @method LocalStorage#get
   * @param {String} key the unique key to identify the value in the store
   * @returns {Object} the value object, or null if get failed
   */
  get: function (key) {
    let val;
    try {
      val = JSON.parse(this.src.getItem(key));
    } catch (e) {
      val = null;
    }
    return val;
  },
  /**
   * Check whether a key exists in the storage
   * @method LocalStorage#has
   * @param {String} key the unique key to identify a value in the store
   * @returns {Boolean} whether the key exists in the store
   */
  has: function (key) {
    return this.src.getItem(key) !== null;
  },
  /**
   * Setter for the value identified by a key
   * @method LocalStorage#set
   * @param {String} key the unique key to identify the value in the store
   * @param {Object} val the replacement value to store
   * @returns {Boolean} whether the set was successful
   */
  set: function (key, val) {
    let isSet = false;
    if (this.has(key)) {
      try {
        this.src.setItem(key, JSON.stringify(val));
        isSet = true;
      } catch (e) {
        isSet = false;
      }
    }
    return isSet;
  },
};
