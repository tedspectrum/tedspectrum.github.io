const EventBus = new Vue();
const EventBusMixin = {
  data: function () {
    return {
      'bus': EventBus
    }
  }
};