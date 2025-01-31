<!-- src/components/MenuList.vue -->
<template>
  <div class="menu-list">
    <div v-for="category in menu" :key="category.category" class="menu-category">
      <h2 class="category-title">{{ category.category }}</h2>
      <div class="menu-items">
        <div
          v-for="item in category.items"
          :key="item.name"
          class="menu-item"
          :class="{ unavailable: !item.available }"
        >
          <div class="item-header">
            <h3 class="item-name">{{ item.name }}</h3>
            <span class="item-price">{{ item.price }}</span>
          </div>
          <p class="item-description">{{ item.description }}</p>
          <p v-if="item.details" class="item-details">{{ item.details }}</p>
          <p v-if="!item.available" class="item-unavailable">Nicht verfügbar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { menuItems } from "../data/menu.js"; // Fallback-Daten

export default {
  name: "MenuList",
  data() {
    return {
      menu: [],
    };
  },
  created() {
    this.fetchMenu();
  },
  methods: {
    async fetchMenu() {
      try {
        const response = await axios.get("https://deine-api-url.com/menu"); // Ersetze mit deiner API-URL
        this.menu = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Menüdaten:", error);
        // Fallback: Nutze lokale Daten, falls API fehlschlägt
        this.menu = menuItems;
      }
    },
  },
};
</script>

<style scoped>
/* Deine bestehenden Stile */
.menu-list {
  padding: 2em;
}

.menu-category {
  margin-bottom: 3em;
}

.category-title {
  font-family: var(--font-thunder);
  font-size: 2em;
  color: var(--blue);
  margin-bottom: 1em;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 0.5em;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.menu-item {
  background-color: #fff;
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item.unavailable {
  opacity: 0.6;
  pointer-events: none;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
}

.item-name {
  font-family: var(--font-thunder);
  font-size: 1.5em;
  color: var(--blue);
}

.item-price {
  font-size: 1.3em;
  font-weight: bold;
  color: var(--gold);
}

.item-description {
  font-size: 1em;
  color: #555;
}

.item-details {
  font-size: 0.9em;
  color: #777;
  margin-top: 0.5em;
}

.item-unavailable {
  font-size: 0.9em;
  color: #ff0000;
  margin-top: 0.5em;
}

/* Responsives Design */
@media (max-width: 768px) {
  .category-title {
    font-size: 1.8em;
  }

  .item-name {
    font-size: 1.2em;
  }

  .item-price {
    font-size: 1.1em;
  }
}
</style>
