<template>
  <div class="goods-item" v-if="visible">
    <div class="img"></div>
    <div class="item-content">
      <h3>{{product.name}}</h3>
      <p>{{product.price}} руб.</p>
      <p>Количество: {{product.count}}</p>
      <button type="button" @click="removeProduct()">удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "productBasketComponents",
  props:{
    visible:{
      type: Boolean,
      required: true
    },
    product:{
      type: Object,
      required: true,
      validator: (value) => {
        return value && typeof value === 'object' && 'name' in value && 'price' in value
      }
    },
  },
  methods: {
    removeProduct() {
      this.$emit('removeProduct', this.product)
    }
  }
}
</script>

<style scoped>

</style>