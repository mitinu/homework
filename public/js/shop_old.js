const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: null, price: null },
];
for (let cart_buttonIdx = 0; cart_buttonIdx < document.getElementsByClassName("cart-button").length; cart_buttonIdx++) {
    const cart_button = document.getElementsByClassName("cart-button")[cart_buttonIdx];
    cart_button.addEventListener("click", creatBaskets.bind(this, goods));
}
function creatBaskets(list, event) {
    const goods_list_html = document.getElementById("goods-list");
    if (goods_list_html.innerHTML=="") {
        const goodsList = []
        for (let productIdx = 0; productIdx < list.length; productIdx++) {
            const product = list[productIdx];
            goodsList.push(renderGoodsItem(product))
        }
        // const goodsList = list.map(product => renderGoodsItem(product));
        goods_list_html.innerHTML = goodsList.join("");
    }
    else{
        goods_list_html.innerHTML = ""
    }
    
}
function renderGoodsItem (product){
    const title = product.title?product.title:"товар";
    const price = product.price?product.price:"торг допустим";
    return `<div class="goods-item"><div class="img"></div><div class="item-content"><h3>${title}</h3><p>${price}</p><button type="button">Добавить</button></div></div>`;
};
