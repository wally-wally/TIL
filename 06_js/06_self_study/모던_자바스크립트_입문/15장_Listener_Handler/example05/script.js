let addItemBtn = document.querySelector('#add-item');
let itemList = document.querySelector('.product-list');
let items = document.querySelectorAll('li');

function addItem() {
  let list = document.createElement('li');
  let itemName = document.createTextNode('새 제품');
  list.setAttribute('class', 'product-item');
  list.appendChild(itemName);
  itemList.appendChild(list);
}

itemList.addEventListener('click', () => {
  alert('클릭됨!');
})

addItemBtn.addEventListener('click', addItem);