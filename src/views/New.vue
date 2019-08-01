<template>
  <div class="newProduct">
    <div class="container">
      <h1>New Product</h1>
      Name:
      <input v-model="name" type="text" />
      Price:
      <input v-model="price" type="text" />
      Image URL:
      <input v-model="imageURL" type="text" />
      Item Description:
      <input v-model="description" type="text" />
      Supplier ID:
      <input v-model="supplierID" type="text" />
      <button v-on:click="createProduct">Add New Product</button>
      <h1>{{ message }}</h1>
      <div v-for="product in products">
        <img v-bind:src="product.image_url" alt="" />
        <h2>{{ product.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      price: "",
      image_url: "",
      description: "",
      supplier_id: ""
    };
  },
  methods: {
    createProduct: function() {
      console.log("Create the product");
      var params = {
        name: this.name,
        price: this.price,
        image_url: this.imageURL,
        description: this.description,
        supplier_id: this.supplierID
      };
      axios
        .post("/api/products", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/");
          this.name = "";
          this.price = "";
          this.imageURL = "";
          this.description = "";
          this.supplierID = "";
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>
