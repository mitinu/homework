class GoodsList {
  fullPice = 0
  constructor(goods) {
    this.goods = goods;
    this.goods.forEach(GoodsItem=>{
      this.fullPice += parseInt(GoodsItem.price)?parseInt(GoodsItem.price):0
    })
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      listHtml += good.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  getFullPice() {
    return this.fullPice
  }
}
class GoodsItem {
  constructor(title, price) {
    this.title = title?title:"товар";
    this.price = price?price:"торг допустим";
  }
   render() {
    return `
        <div class="goods-item">
            <div class="img"></div>
            <div class="item-content">
                <h3>${this.title}</h3>
                <p>${this.price}</p><button type="button">удалить</button>
            </div>
        </div>
    `;
  }
}
const goodsList = new GoodsList([
    new GoodsItem('Shirt', 150),
    new GoodsItem('Socks', 50),
    new GoodsItem('Jacket', 350),
    new GoodsItem('Shoes', 250),
    new GoodsItem(null, null)
]);

for (let cart_buttonIdx = 0; cart_buttonIdx < document.getElementsByClassName("cart-button").length; cart_buttonIdx++) {
  const cart_button = document.getElementsByClassName("cart-button")[cart_buttonIdx];
  cart_button.addEventListener("click", () => goodsList.render());
}
document.getElementById("full_price").innerHTML = goodsList.getFullPice()

/**на будущее */
// function Validate(min, max) {
//   return function(target, key) {
//     // Логика валидации
//   };
// }

// class Product {
//   @Validate(0, 100) // Проверка, что цена от 0 до 100
//   price = 50;
// }