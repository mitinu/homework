// класс товаров
class Goods {
  constructor() {
    this.goods = []
  }
  // получение новыых товаров
  fetchGoods(goods){
    // this.goods = []
    goods.forEach(product=>[
      this.goods.push(new Product(product.id_product, product.product_name, product.price))
    ]);
    this.render()
  }
  // загрузка товаров в дом
  render() {
    const goods_html = document.getElementById("goods-list");
    goods_html.innerHTML = ""
    this.goods.forEach(product => {
      product.renderGoods(goods_html);
    });
  }
  // добовление товара
  pushProduct(product){
    this.goods.push(product)
    this.render()
  }
  // удаление товара
  removeProduct(product){
    this.goods.splice(this.goods.indexOf(product), 1)
    this.render()
  }
}
// класс карзины
class Bascket {
  constructor() {
    this.visibility = false
    this.fullPice = 0
    this.bascket = []
  }
  swapRender(){
    if (this.visibility) {
      this.visibility = false
    }
    else{
      this.visibility = true
    }
    this.render()
  }
  // загрузка товаров в дом
  render() {
    const myBascket_html = document.getElementById("myBascket");
    myBascket_html.innerHTML = "";
    if (this.visibility) {
      this.bascket.forEach(product => {
       product.renderBasket(myBascket_html);
      });
    }
  }
  // загрузка стоемости корзины
  renderFullPice(){
    document.getElementById("full_price").innerHTML = this.fullPice
  }
  // добовление товара
  pushProduct(product){
    this.bascket.push(product)
    this.fullPice += parseInt(product.price)?parseInt(product.price):0
    this.renderFullPice()
    this.render()
  }
  // удаление товара
  removeProduct(product){
    this.bascket.splice(this.bascket.indexOf(product), 1)
    this.fullPice -= parseInt(product.price)?parseInt(product.price):0
    this.renderFullPice()
    this.render()
  }
}
// класс продука
class Product {
  static bascket
  static goods
  constructor(id_product, product_name, price) {
    this.id_product = id_product
    this.product_name = product_name?product_name:"товар";
    this.price = price?price:"торг допустим";
  }
  pre_rendering(){
    const goodsItem = document.createElement('div');
    goodsItem.className = 'goods-item';


    const imgDiv = document.createElement('div');
    imgDiv.className = 'img';

   const itemContent = document.createElement('div');
    itemContent.className = 'item-content';
    itemContent.id = `productId_${this.id_product}`;
   

    const title = document.createElement('h3');
    title.textContent = this.product_name;

    const pricePara = document.createElement('p');
    pricePara.textContent = this.price;

    const addButton = document.createElement('button');
    addButton.type = 'button';

    itemContent.append(title, pricePara, addButton);
   
    goodsItem.append(imgDiv, itemContent);

    return goodsItem
  }
  // рендер общих товаров
  renderGoods(goods_html) {
    const goodsItem = this.pre_rendering()

    const addButton = goodsItem.querySelector('button')
    addButton.textContent = 'добавить';
    addButton.addEventListener("click", event=>{
      Product.goods.removeProduct(this)
      Product.bascket.pushProduct(this)
    })

    goods_html.append(goodsItem);
  }
  // рендер корзины
  renderBasket(bascket_html) {
    const goodsItem = this.pre_rendering()

    const addButton = goodsItem.querySelector('button')
    addButton.textContent = 'удалить';
    addButton.addEventListener("click", event=>{
      Product.goods.pushProduct(this)
      Product.bascket.removeProduct(this)
    })

    bascket_html.append(goodsItem);
  }
}