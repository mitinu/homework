<template>
  <div>
    <article>
      <form @submit.prevent="handleLogin()">
        <input v-model="login" type="text" placeholder="login">
        <input v-model="password" type="password" placeholder="Password">
        <button type="submit">Войти</button>
      </form>
    </article>
  </div>
</template>

<script>
import {urlAuthorization} from "@/constUrl";
import Cookies from 'js-cookie';

export default {

  name: "authorization",
  data(){
    return{
      parametersCreate:{
        visibleSearch: false,
        visibleExit: false
      },
      login: "",
      password: ""
    }
  },
  beforeCreate() {
    if (!Cookies.get('token')) {
      this.$router.push('/authorization')
    }
  },
  created() {
    this.$emit('returnParametersCreate', this.parametersCreate);
  },
  methods:{

    handleLogin(){
      fetch(urlAuthorization,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      })
      .then(res=>{return res.json()})
      .then(data=>{
        if (data.status == 200 ){
          Cookies.set('token', data.token);
          this.$router.push('/')
        }
        else {
          this.$emit("showError", data.error.message)
        }
      })

    }
  }
}
</script>

<style scoped>

</style>