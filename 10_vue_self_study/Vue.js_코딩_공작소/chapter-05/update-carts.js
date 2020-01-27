canAddToCart(aProduct) {
  return aProduct.availableInventory > this.cartCount(aProduct.id);
},
cartCount(id) {
  let count = 0;
  for(var i = 0; i < this.cart.length; i++) {
    if (this.cart[i] === id) {
      count++;
    }
  }
  return count;
}
