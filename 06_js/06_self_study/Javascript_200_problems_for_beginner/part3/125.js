const products = [{ name: "가방" }, { name: "노트북" }];

for (const item of products) {
    console.log(item.name);
}

const iter = products[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());