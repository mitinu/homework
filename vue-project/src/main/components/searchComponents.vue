<template>
  <div>
    <input type="text"
           :value="value"
           @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>

export default {
  name: "Search",
  props: ['value']
}
</script>


<style scoped>

</style>