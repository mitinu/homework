<template>
  <div>
    <header>
      <div class="top">
        <nav>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </nav>
        <div class="serch">
          <input type="text" id="serch">
        </div>
      </div>
      <div class="bottom">
        <button class="cart-button" type="button">Корзина</button>
        <div><span>стоемость: </span><span id="full_price"></span></div>
      </div>
    </header>
    <main>
      <article class="product_list" id="myBascket"></article>
      <article class="product_list" id="goods-list"></article>
    </main>
  </div>
</template>



<script>
  export default {
    data:()=> ({
      goods: [],
      basket: [],
      basketVisible: false,
    }),
    computed: {
      // basketTotal(){
      // } 
    },
    method: {

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
          height: 300px;
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
</style>
