<template>
  <div>
    <header>
      <div class="top">
        <nav>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </nav>
        <div class="search">
          <input type="text" id="search" v-model="searchValue">
        </div>
      </div>
      <div class="bottom">
        <button @click="switchBasketVisible()">Корзина</button>
        <div><span>стоимость: </span><span>{{fullPrice}} руб.</span></div>
      </div>
    </header>
    <main>
      <article class="product_list" id="basket_list" v-if="basketVisible">
        <div v-for="product in basketList" :key="product.id">
          <div class="goods-item" v-if="search(product.name)">
            <div class="img"></div>
            <div class="item-content">
              <h3>{{product.name}}</h3>
              <p>{{product.price}} руб.</p>
              <p>Количество: {{product.count}}</p>
              <button type="button" @click="removeProduct(product)">удалить</button>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </article>
      <article class="product_list" id="goods_list">
        <div v-for="product in goodsList" :key="product.id">
          <div class="goods-item" v-if="search(product.name)">
            <div class="img"></div>
            <div class="item-content">
              <h3>{{product.name}}</h3>
              <p>{{product.price}} руб.</p>
              <button type="button" @click="pushProduct(product)">Добавить</button>
            </div>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>



<script>

import { urlCatalogData } from './constUrl.js';

  export default {
    data:()=> ({
      goods: {},
      filteredGoods: {},
      basket: {},
      filteredBasket: {},
      basketVisible: false,
      searchValue: "",
    }),
    computed: {
      goodsList: {
        get() {
          return this.filteredGoods;
        }
      },
      basketList: {
        get() {
          return this.filteredBasket;
        }
      },
      fullPrice(){
        let fullPrice = 0
        if (Object.keys(this.basket).length>0){
          for (const productIdx in this.basket) {
            const product = this.basket[productIdx]
            fullPrice += product.price*product.count
          }
        }
        return fullPrice
      }
    },
    async created() {
      await fetch(urlCatalogData)
      .then(async res=>{return await res.json()})
      .then(data=>{
        for (const product of data) {
          this.goods[product.id_product] = {
            id: product.id_product,
            name: product.product_name,
            price: product.price
          }
        }
        this.filteredGoods = this.goods
      })
    },
    methods: {
      switchBasketVisible(){
        this.basketVisible = !this.basketVisible
      },
      //TODO сделать обновление корзины
      pushProduct(product){
        const newCount = this.basket[product.id] ? this.basket[product.id].count + 1 : 1;

        this.$set(this.basket, product.id, {
          ...product,
          count: newCount
        });

        this.$set(this.filteredBasket, product.id, this.basket[product.id])
      },
      removeProduct(product){
        if (product.count>1){
          this.$set(this.basket, product.id, {
            ...product,
            count: product.count - 1
          });
          this.$set(this.filteredBasket, product.id, this.basket[product.id])
        }
        else {
          this.$delete(this.filteredBasket, product.id);
          this.$delete(this.basket, product.id);
        }
      },

      search(product) {
        return product.toLowerCase().includes(this.searchValue.toLowerCase())
      },

    }
  }
</script>



<style>
  header{
      .top{
          background-color: gray;
          display: flex;
          height: 50px;
          align-items: center;
          nav{
              display: flex;
              margin: 0 10px;
              .circle{
                  margin: 0 5px;
                  width: 25px;
                  height: 25px;
                  background-color: whitesmoke;
                  border-radius: 50%;
              }
          }
          .serch input[type="text"]{
              width: 500px;
              height: 25px;
              border-radius: 5%;
              border: none;
          }
      }
      .bottom{
          height: 50px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;
          border: 1px solid black;
          button{
              height: 25px;
              width: 100px;
              border-radius: 20%;
              border: 1px solid black;
          }
      }
  }
  main .product_list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding-top: 20px;
      .goods-item{
          width: 250px;
          height: 350px;
          border: 1px solid black;

          .img{
              margin: 10px auto;
              width: 200px;
              height: 150px;
              background-color: gray;
          }
          .item-content {
              margin-left: 25px;
              button{
                  height: 25px;
                  width: 100px;
                  border-radius: 20%;
                  border: 1px solid black;
                  margin-left: 50%;
              }
          }

      }
  }
  .line{
    border-bottom: 1px solid black;
    width: 100%;
    height: 1px;
  }
</style>
