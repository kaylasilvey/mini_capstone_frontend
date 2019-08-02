<template>
  <div class="container show">
    <h2>{{ product.title }}</h2>
    <img v-bind:src="product.image_url" alt="" />
    <p>Name: {{ product.name }}</p>
    <p>Price: {{ product.price }}</p>
    <p>Description: {{ product.description }}</p>
    <p>Supplier ID: {{ product.supplierID }}</p>
    <router-link to="/">Back to all products</router-link>
  </div>
</template>

<style>
img {
  width: 100%;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      product: {}
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      this.product = response.data;
    });
  },
  methods: {}
};
</script>
