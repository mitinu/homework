class Goods {
  constructor(goods) {
    this.goods = []
    goods.forEach(product=>[
      this.goods.push(new Product(product.id_product, product.product_name, product.price))
    ]);
    this.render()
  }
  render() {
    const goods_html = document.getElementById("goods-list");
    goods_html.innerHTML = ""
    this.goods.forEach(product => {
      product.renderGoods(goods_html);
    });
  }
  pushProduct(product){
    this.goods.push(product)
    this.render()
  }
  removeProduct(product){
    this.goods.splice(this.goods.indexOf(product), 1)
    this.render()
  }
}
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
  render() {
    const myBascket_html = document.getElementById("myBascket");
      myBascket_html.innerHTML = "";
    if (this.visibility) {
      this.bascket.forEach(product => {
       product.renderBasket(myBascket_html);
      });
    }
  }
  renderFullPice(){
    document.getElementById("full_price").innerHTML = this.getFullPice()
  }
  getFullPice() {
    return this.fullPice
  }
  pushProduct(product){
    this.bascket.push(product)
    this.fullPice += parseInt(product.price)?parseInt(product.price):0
    this.renderFullPice()
    this.render()
  }
  removeProduct(product){
    this.bascket.splice(this.bascket.indexOf(product), 1)
    this.fullPice -= parseInt(product.price)?parseInt(product.price):0
    this.renderFullPice()
    this.render()
  }
}
class Product {
  static bascket
  static goods
  constructor(id_product, product_name, price) {
    this.id_product = id_product
    this.product_name = product_name?product_name:"товар";
    this.price = price?price:"торг допустим";
  }
  renderGoods(goods_html) {
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
    addButton.textContent = 'добавить';
    addButton.addEventListener("click", event=>{
      Product.goods.removeProduct(this)
      Product.bascket.pushProduct(this)
    })

    itemContent.append(title, pricePara, addButton);
    goodsItem.append(imgDiv, itemContent);
    goods_html.append(goodsItem);
  }
  renderBasket(bascket_html) {
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
    addButton.textContent = 'удалить';
    addButton.addEventListener("click", event=>{
      Product.goods.pushProduct(this)
      Product.bascket.removeProduct(this)
    })

    itemContent.append(title, pricePara, addButton);
    goodsItem.append(imgDiv, itemContent);
    bascket_html.append(goodsItem);
  }
}