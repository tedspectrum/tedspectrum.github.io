const app = new Vue({
  el: '#geolocationapp',
  data: {
    geoLocationOptions: {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 1000
    },
    lat: 0,
    long: 0,
    msg: '',
    str: {
      idle: '',
      progress: 'working...',
      nolocation: 'geolocation unavailable'
    }
  },
  methods: {
    geolocate: function (onSuccess, onErr, opts) {
      if (navigator.geolocation) {
        this.msg = this.str.progress;
        navigator.geolocation.getCurrentPosition(onSuccess, onErr, opts);
      } else {
        onErr({ message: this.str.nolocation });
      }
    },
    onLocateError: function (e) {
      this.msg = e.message;
    },
    onLocateSuccess: function (pos) {
      this.lat = pos.coords.latitude.toFixed(7);
      this.long = pos.coords.longitude.toFixed(7);
      this.msg = this.str.idle;
    },
    onLocationGet: function () {
      // button press handler
      this.geolocate(
        this.onLocateSuccess,
        this.onLocateError,
        this.geoLocationOptions
      );
    }
  }
});