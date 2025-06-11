// создание классов для работы с списками таваров
let goods = new Goods()
const bascket = new Bascket();
// доболение обектов в класс продукт для коректного удаление и доболение товаров
Product.goods = goods
Product.bascket = bascket

// получение новыых товаров
fetch(urlCatalogData)
.then(res=>{return res.json()})
.then(data=>{
  goods.fetchGoods(data)
})




// для всех кнопок с классом cart-button добавить ивет по нажатию на кнопку который переключит видипость корзины
for (let cart_buttonIdx = 0; cart_buttonIdx < document.getElementsByClassName("cart-button").length; cart_buttonIdx++) {
  const cart_button = document.getElementsByClassName("cart-button")[cart_buttonIdx];
  cart_button.addEventListener("click", () => {
    bascket.swapRender()
  });
}

