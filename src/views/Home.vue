<template>
  <div class="home">
    <!--  <h1>New Product</h1>
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
    <button v-on:click="createProduct">Add New Product</button> -->
    <h1>{{ message }}</h1>
    <div v-for="product in products">
      <img v-bind:src="product.image_url" alt="" />
      <div>
        <router-link v-bind:to="`/products/${product.id}`">More info</router-link>
      </div>
      <h2>{{ product.name }}</h2>
      <!-- SHOW TOGGLE ------------------------------------------------------>
      <div>
        <button v-on:click="showProduct(product)">Product Info</button>
      </div>
      <div v-if="product === currentProduct">
        <p>Item Description: {{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <div>
          <!-- UPDATE ------------------------------------------------------->
          <h1>Edit Product</h1>
          Name:
          <input v-model="product.name" type="text" />
          Price:
          <input v-model="product.price" type="text" />
          Image URL:
          <input v-model="product.imageURL" type="text" />
          Item Description:
          <input v-model="product.description" type="text" />
          Supplier ID:
          <input v-model="product.supplierID" type="text" />
          <button v-on:click="updateProduct(product)">Update Product Info</button>
        </div>
        <div>
          <!-- DESTROY -------------------------------------------------------->
          <button v-on:click="destroyProduct(product)">Delete Product</button>
        </div>
      </div>
    </div>
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
      message: "Anna Lisa Illustration's Product Shop",
      products: [],
      currentProduct: {},
      name: "",
      price: "",
      imageURL: "",
      description: "",
      supplierID: ""
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
      console.log(this.products);
    });
  },
  methods: {
    // CREATE ------------------------------------------------------>
    // createProduct: function() {
    //   console.log("Create the product");
    //   var params = {
    //     name: this.name,
    //     price: this.price,
    //     image_url: this.imageURL,
    //     description: this.description,
    //     supplier_id: this.supplierID
    //   };
    //   axios
    //     .post("/api/products", params)
    //     .then(response => {
    //       console.log("Item created", response.data);
    //       this.products.push(response.data);
    //       this.name = "";
    //       this.price = "";
    //       this.imageURL = "";
    //       this.description = "";
    //       this.supplierID = "";
    //     })
    //     .catch(error => console.log(error.response));
    // },
    // SHOW TOGGLE ------------------------------------------------->
    showProduct: function(inputProduct) {
      if (this.currentProduct === inputProduct) {
        this.currentProduct = {};
      } else {
        this.currentProduct = inputProduct;
      }
    },
    // UPDATE ------------------------------------------------------>
    updateProduct: function(inputProduct) {
      console.log("Updated the product");
      var params = {
        name: inputProduct.name,
        price: inputProduct.price,
        image_url: inputProduct.imageURL,
        description: inputProduct.description,
        supplier_id: inputProduct.supplierID
      };
      axios.patch("/api/products/" + inputProduct.id, params).then(response => {
        console.log("Item Updated", response.data);
        inputProduct.name = response.data.name;
        inputProduct.price = response.data.price;
        inputProduct.imageURL = response.data.imageURL;
        inputProduct.description = response.data.description;
        inputProduct.supplierID = response.data.supplierID;
      });
    },
    // DESTROY ------------------------------------------------------>
    destroyProduct: function(inputProduct) {
      axios.delete("/api/products/" + inputProduct.id).then(response => {
        console.log("Product Deleted", response.data);
        var index = this.products.indexOf(inputProduct);
        this.products.splice(index, 1);
      });
    }
  }
};
</script>
