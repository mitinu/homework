<template>
  <div>
    <article>
      <alertComponents
          v-if="alert.show"
          :message="alert.message"
          :type="alert.type"
          @close="alert.show = false"
      />
    </article>
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
import alertComponents from "@/components/alertComponents.vue";
import Cookies from 'js-cookie';

export default {
  components:{
    alertComponents
  },
  name: "authorization",
  data(){
    return{
      alert:{
        show: false,
        message: "",
        type:"error"
      },
      login: "",
      password: ""
    }
  },
  methods:{
    showError(alertMessage = 'error') {
      this.alert.show = true
      this.alert.message = alertMessage
      this.alert.type = "error"
    },
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
          this.showError(data.error.message)
        }
      })

    }
  }
}
</script>

<style scoped>

</style>