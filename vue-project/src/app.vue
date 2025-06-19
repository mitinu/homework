<template>
  <div>
    <header>
      <nav>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </nav>
      <Search v-if="visibleSearch" v-model="searchValue"></Search>
      <button @click="showError()">Показать ошибку</button>
      <button v-if="visibleExit" @click="exit()">выйти</button>
    </header>
    <article>
      <alertComponents
          v-if="alert.show"
          :message="alert.message"
          :type="alert.type"
          @close="alert.show = false"
      />
    </article>
    <router-view
        :searchValue="searchValue"
        @showError="showError"
        @returnParametersCreate="returnParametersCreate"
    />
  </div>

</template>

<script>

import mainComponent from "@/main/main.vue";
import authorization from "@/authorization/authorization.vue";
import Search from "@/main/components/searchComponents.vue";
import Cookies from "js-cookie";
import alertComponents from "@/components/alertComponents.vue";

export default {
  components: {
    Search,
    mainComponent,
    authorization,
    alertComponents
  },
  name: "app",
  data(){
    return {
      searchValue: "",
      visibleSearch: false,
      visibleExit: false,
      alert:{
        show: false,
        message: "",
        type:"error"
      },
    }
  },
  methods:{
    returnParametersCreate(parametersCreate){
      this.visibleSearch = parametersCreate.visibleSearch
      this.visibleExit = parametersCreate.visibleExit
    },
    exit(){
      Cookies.remove('token');
      this.$router.push('/authorization')
    },
    showError(alertMessage = 'error') {
      this.alert.show = true
      this.alert.message = alertMessage
      this.alert.type = "error"
    },
  }
}
</script>

<style lang="less" scoped>
header{
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
</style>