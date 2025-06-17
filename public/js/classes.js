// класс товаров
class Goods {
    constructor() {
        this.goods = []
    }

    // получение новых товаров
    fetchGoods(goods) {
        // this.goods = []
        goods.forEach(product => [
            this.goods.push(new Product(product.id_product, product.product_name, product.price))
        ]);
        this.render()
    }

    search(valueSearch) {
        if (valueSearch){
            valueSearch = valueSearch.toLowerCase()
            this.render(this.goods.filter(product => product.product_name.toLowerCase().includes(valueSearch)))
        }
    }

    // загрузка товаров в дом
    render(goods = this.goods) {
        const goods_html = document.getElementById("goods-list");
        goods_html.innerHTML = ""
        goods.forEach(product => {
            product.renderGoods(goods_html);
        });
    }

    // добавление товара
    pushProduct(product) {
        this.goods.push(product)
        this.render()
    }

    // удаление товара
    removeProduct(product) {
        this.goods.splice(this.goods.indexOf(product), 1)
        this.render()
    }
}

// класс корзины
class Basket {
    constructor() {
        this.visibility = false
        this.fullPice = 0
        this.basket = []
    }

    swapRender() {
        if (this.visibility) {
            this.visibility = false
        } else {
            this.visibility = true
        }
        this.render()
    }

    search(valueSearch) {
        this.render(this.basket.filter(product => product.product_name.toLowerCase().includes(valueSearch.toLowerCase())))
    }

    // загрузка товаров в дом
    render(basket = this.basket) {
        const myBasket_html = document.getElementById("myBasket");
        myBasket_html.innerHTML = "";
        if (this.visibility) {
            basket.forEach(product => {
                product.renderBasket(myBasket_html);
            });
        }
    }

    // загрузка стоимости корзины
    renderFullPice() {
        document.getElementById("full_price").innerHTML = this.fullPice
    }

    // добавление товара
    pushProduct(product) {
        this.basket.push(product)
        this.fullPice += parseInt(product.price) ? parseInt(product.price) : 0
        this.renderFullPice()
        this.render()
    }

    // удаление товара
    removeProduct(product) {
        this.basket.splice(this.basket.indexOf(product), 1)
        this.fullPice -= parseInt(product.price) ? parseInt(product.price) : 0
        this.renderFullPice()
        this.render()
    }
}

// класс продукт
class Product {
    static basket
    static goods

    constructor(id_product, product_name, price) {
        this.id_product = id_product
        this.product_name = product_name ? product_name : "товар";
        this.price = price ? price : "торг допустим";
    }

    pre_rendering() {
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
        addButton.addEventListener("click", event => {
            Product.goods.removeProduct(this)
            Product.basket.pushProduct(this)
        })

        goods_html.append(goodsItem);
    }

    // рендер корзины
    renderBasket(basket_html) {
        const goodsItem = this.pre_rendering()

        const addButton = goodsItem.querySelector('button')
        addButton.textContent = 'удалить';
        addButton.addEventListener("click", event => {
            Product.goods.pushProduct(this)
            Product.basket.removeProduct(this)
        })

        basket_html.append(goodsItem);
    }
}