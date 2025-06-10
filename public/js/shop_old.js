const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: null, price: null },
];
for (let cart_buttonIdx = 0; cart_buttonIdx < document.getElementsByClassName("cart-button").length; cart_buttonIdx++) {
    const cart_button = document.getElementsByClassName("cart-button")[cart_buttonIdx];
    cart_button.addEventListener("click", creatBasckets.bind(this, goods));
}
function creatBasckets(list, event) {
    for (let goods_listIdx = 0; goods_listIdx < document.getElementsByClassName("goods-list").length; goods_listIdx++) {
        const goods_list_html = document.getElementsByClassName("goods-list")[goods_listIdx];
        const goodsList = list.map(product => renderGoodsItem(product));
        goods_list_html.innerHTML = goodsList.join("");
    }
}
function renderGoodsItem (product){
    const title = product.title?product.title:"товар";
    const price = product.price?product.price:"торг допустим";
    return `<div class="goods-item"><div class="img"></div><div class="item-content"><h3>${title}</h3><p>${price}</p><button type="button">Добавить</button></div></div>`;
};
