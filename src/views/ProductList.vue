<template>
  <div>
    <h1 class="title-base big-title">Produktliste</h1>
    <table>
      <thead>
        <tr>
          <th>Bild</th>
          <th>Name</th>
          <th>Beschreibung</th>
          <th>Preis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td><img :src="product.image" :alt="product.name" width="50" /></td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }} €</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// Anstatt Firebase zu verwenden, importieren wir die statischen Produkte
import staticProducts from "@/data/products.json";

export default {
  setup() {
    const products = ref([]);

    onMounted(() => {
      products.value = staticProducts;
      console.log("📋 Produktliste geladen:", products.value);
    });

    return { products };
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
