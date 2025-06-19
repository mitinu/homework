<template>
  <div>
    <div class="bottom">
      <button @click="switchBasketVisible()">Корзина</button>
      <div><span>стоимость: </span><span>{{fullPrice}} руб.</span></div>
    </div>
    <main>
      <article class="product_list" id="basket_list" v-if="basketVisible">
        <div v-for="product in basketList" :key="product.id">
          <productBasketComponents
              :visible="search(product.name)"
              :product="product"
              @removeProduct="removeProduct(product)"
          />
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

import {urlGetGoods, urlUpdateProductBasket} from '../constUrl.js';
import Search from "@/main/components/searchComponents.vue";
import productBasketComponents from "@/main/components/productBasketComponents.vue";
import Cookies from 'js-cookie';

  export default {
    components:{
      Search,
      productBasketComponents,
    },
    name: "mainComponent",
    props:{
      searchValue:{
        type: String,
        required: true
      },
    },
    data(){
      return {
        goods: {},
        basket: {},
        parametersCreate: {
          visibleSearch: true,
          visibleExit: true
        },
        basketVisible: false,
      }
    },
    computed: {
      goodsList: {
        get() {
          return this.goods;
        }
      },
      basketList: {
        get() {
          return this.basket;
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
    beforeCreate() {
      if (!Cookies.get('token')) {
        this.$router.push('/authorization')
      }
    },
    created() {
      this.$emit('returnParametersCreate', this.parametersCreate);
      this.GetGoods()
    },
    methods: {
      GetGoods(){
        this.goods = {}
        this.basket = {}
        fetch(urlGetGoods,{
          headers:{
            Authorization: Cookies.get('token')
          },
          credentials: 'include'
        })
        .then(res=>{
          if (!res.ok) {
            throw new Error('мы скоро все починим, ждите)))');
          }
          return res.json()
        })
        .then(data=>{
          if (data.status==401){
            Cookies.remove('token');
            this.$router.push('/authorization')
            return;
          }
          if (data.status.toString()[0]==2){
            for (const productIdx in data.goods) {
              const product = data.goods[productIdx]
              this.$set(this.goods, product.id, {
                id: product.id,
                name: product.name,
                price: product.price
              });
            }
            for (const productIdx in data.basket) {
              const product = data.basket[productIdx]
              this.$set(this.basket, product.id, {
                id: product.id,
                name: data.goods[productIdx].name,
                price: data.goods[productIdx].price,
                count: product.count
              });
            }
            return;
          }
          this.$emit("showError", data.error.message)

        })
        .catch(e=>this.$emit("showError", e.message))
      },
      updateProductBasket(method, productId, count){
        switch (method){
          case "patch":
            fetch(urlUpdateProductBasket,{
              method: "PATCH",
              headers:{
                "Content-Type": "application/json",
                Authorization: Cookies.get('token')
              },
              credentials: 'include',
              body: JSON.stringify({
                productId: productId,
                count: count,
              })
            })
            .then(res=>{
              if(!res.ok){this.GetGoods()}
              return res.json()
            })
            .then(data=>{
              if (data.status!=200){this.GetGoods()}
            })
            .catch(e=>{this.GetGoods()})
            break
          case "post":
            fetch(urlUpdateProductBasket,{
              method: "POST",
              headers:{
                "Content-Type": "application/json",
                Authorization: Cookies.get('token')
              },
              credentials: 'include',
              body: JSON.stringify({
                productId: productId,
                count: count,
              })
            })
            .then(res=>{
              if(!res.ok){this.GetGoods()}
              return res.json()
            })
            .then(data=>{
              if (data.status!=200){this.GetGoods()}
            })
            .catch(e=>{this.GetGoods()})
            break
          case "delete":
            fetch(urlUpdateProductBasket,{
              method: "DELETE",
              headers:{
                "Content-Type": "application/json",
                Authorization: Cookies.get('token')
              },
              credentials: 'include',
              body: JSON.stringify({
                productId: productId
              })
            })
            .then(res=>{
              if(!res.ok){this.GetGoods()}
              return res.json()
            })
            .then(data=>{
              if (data.status!=200){this.GetGoods()}
            })
            .catch(e=>{this.GetGoods()})
            break
        }
      },

      switchBasketVisible(){
        this.basketVisible = !this.basketVisible
      },
      pushProduct(product){
        let newCount
        if (this.basket[product.id]){
          newCount = this.basket[product.id].count + 1
        }
        else {
          newCount = 1
        }
        this.$set(this.basket, product.id, {
          ...product,
          count: newCount
        });
        this.updateProductBasket(newCount==1?"post":"patch", product.id, newCount)
      },
      removeProduct(product){
        if (product.count>1){
          this.$set(this.basket, product.id, {
            ...product,
            count: product.count - 1
          });
          this.updateProductBasket("patch", product.id, product.count - 1)
        }
        else {
          this.$delete(this.basket, product.id);
          this.updateProductBasket("delete", product.id)
        }
      },

      search(product) {
        return product.toLowerCase().includes(this.searchValue.toLowerCase())
      },

    }
  }
</script>



<style>

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
