class Product {
  static build(name, price) {
    const id = Math.floor(Math.random() * 1000);
    return new Product(id, name, price);
  }

  static getTaxPrice(product) {
    return (product.price * 0.1) + product.price;
  }

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class DeposableProduct extends Product {
  depose() {
    this.deposed = true;
  }
}

const gum = Product.build('껌', 1000);
console.log(gum);

const clothes = new DeposableProduct(1, '옷', 2000);
const taxPrice = DeposableProduct.getTaxPrice(clothes);
console.log(taxPrice);
