new Vue({
  data: {
    length: 5,
    width: 3
  },
  computed: {
    area: function() {
      return this.length * this.width;
    }
  }
});
