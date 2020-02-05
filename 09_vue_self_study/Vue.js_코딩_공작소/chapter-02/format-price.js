var webstore = new Vue({
  el: '#app',
  data: {
    sitename: "Vue.js 애완용품샵",
    product: {
      id: 1001,
      title: "고양이 사료, 25파운드",
      description: "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
      price: 2000,
      image: "assets/images/product-fullsize.png",
    },
  },
  filters: {
    formatPrice: function(price) {
      if (!parseInt(price)) { return ""; }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index+3, 0, ",");
          index += 4;
        }
        return "$" + priceArray.reverse().join("");
      } else {
        return "$" + (price / 100).toFixed(2);
      }
    }
  }
});
