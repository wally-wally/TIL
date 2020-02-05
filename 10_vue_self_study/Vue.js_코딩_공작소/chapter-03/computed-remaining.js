computed: {
  cartItemCount: function() {
    return this.cart.length || '';
  },
  canAddToCart: function() {
    return this.product.availableInventory > this.cartItemCount;     
  }
}
