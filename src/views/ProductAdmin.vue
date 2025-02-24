<template>
  <BasePage
    imageSrc="/images/catering/haus-hamburg-leer-catering-1.webp"
    imageAlt="Produktverwaltung"
    titleAbove="Admin"
    titleMain="Produkte"
    subtitle="Verwalten Sie die Produkte in Ihrem Shop"
    heading="Übersicht der Produkte"
    flowText="Hier können Sie alle Produkte sehen, die im Shop verfügbar sind."
    parallaxImageSrc="/images/restaurant/haus-hamburg-leer-08.webp"

  >
    <table class="product-table">
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
  </BasePage>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchProducts } from "../../firebase/products";
import BasePage from "@/components/BasePage.vue";

export default {
  components: { BasePage },
  setup() {
    const products = ref([]);

    onMounted(async () => {
      products.value = await fetchProducts();
      console.log("📋 Produktliste geladen:", products.value);
    });

    return { products };
  },
};
</script>

<style scoped>
.product-table {
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
