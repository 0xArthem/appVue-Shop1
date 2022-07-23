<template>
  <div>
    <ProductsComponent></ProductsComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductsComponent from '@/components/products-component.vue'

export default {
  name: 'HomeView',
  components: {
    ProductsComponent
  }
}
</script>
