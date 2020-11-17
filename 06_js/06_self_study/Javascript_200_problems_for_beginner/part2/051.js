class Cart {
  constructor() {
    this.store = {};
  }

  addProduct(product) {
    this.store[product.id] = product;
  }

  getProuduct(id) {
    return this.store[id];
  }
}

const cart1 = new Cart();

cart1.addProduct({ id: 1, name: '노트북'})
console.log(cart1.store);

const p = cart1.getProuduct(1);
console.log(p);