<template>
  <div>
    <router-view/>
<!--    <authorization/>-->
<!--    <mainComponent/>-->
  </div>

</template>

<script>

import mainComponent from "@/main/main.vue";
import authorization from "@/authorization/authorization.vue";

export default {
  components: {
    mainComponent,
    authorization
  },
  name: "app"
}
</script>

<style scoped>

</style>