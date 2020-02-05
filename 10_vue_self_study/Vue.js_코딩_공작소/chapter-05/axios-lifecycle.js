},
created: function() {
  axios.get('./products.json')
    .then((response) =>{
      this.products=response.data.products;
      console.log(this.products);
  });
},
