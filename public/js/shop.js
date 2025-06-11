let goods = null
const bascket = new Bascket();
Product.bascket = bascket

fetch(urlCatalogData)
.then(res=>{return res.json()})
.then(data=>{
  goods = new Goods(data)
  Product.goods = goods
})





for (let cart_buttonIdx = 0; cart_buttonIdx < document.getElementsByClassName("cart-button").length; cart_buttonIdx++) {
  const cart_button = document.getElementsByClassName("cart-button")[cart_buttonIdx];
  cart_button.addEventListener("click", () => {
    bascket.swapRender()
  });
}

for (let buttonPushBascketIdx = 0; buttonPushBascketIdx < document.getElementsByClassName("pushBascket").length; buttonPushBascketIdx++) {
  const buttonPushBascket = document.getElementsByClassName("pushBascket")[buttonPushBascketIdx];
  buttonPushBascket.addEventListener("click", event=>{
    const productId = event.target.parentElement.classList
    console.log(productId)
  })
}