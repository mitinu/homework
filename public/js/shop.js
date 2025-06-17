// создание классов для работы со списками товаров
const goods = new Goods()
const basket = new Basket();
// добавление объектов в класс продукт для корректного удаление и добавление товаров
Product.goods = goods
Product.basket = basket

// получение новых товаров
fetch(urlCatalogData)
.then(res=>{return res.json()})
.then(data=>{
  goods.fetchGoods(data)
})
// goods.pushProduct(new Product(1,"dawd",100))
// goods.pushProduct(new Product(2,"dawd",100))



// для всех кнопок с классом cart-button добавить Event по нажатию на кнопку который переключит видимость корзины
for (let cart_buttonIdx = 0; cart_buttonIdx < document.getElementsByClassName("cart-button").length; cart_buttonIdx++) {
  const cart_button = document.getElementsByClassName("cart-button")[cart_buttonIdx];
  cart_button.addEventListener("click", () => {
    basket.swapRender()
  });
}


document.getElementById("search").addEventListener('change', event=>{
  const valueSearch = event.target.value
  basket.search(valueSearch)
  goods.search(valueSearch)
})
