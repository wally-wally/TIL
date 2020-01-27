computed: {
  fullName: function() {
    return [this.firstName, this.lastName].join('');
  }
}
