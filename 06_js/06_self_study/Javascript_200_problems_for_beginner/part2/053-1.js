class ProductWithCode {
  static get CODE_PREFIX() {
    return "PRODUCT-"
  }

  constructor(id) {
    this.id
    this.code = ProductWithCode.CODE_PREFIX + id;
  }
}

const product1 = new ProductWithCode('001');
console.log(ProductWithCode.CODE_PREFIX);
console.log(product1.code);
