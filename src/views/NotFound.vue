<template>
  <div class="not-found">
    <h1>404 - Seite nicht gefunden</h1>
    <p>Die von dir gesuchte Seite existiert nicht.</p>
    <router-link to="/">Zurück zur Startseite</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.not-found h1 {
  font-size: 3rem;
  color: var(--blue);
}

.not-found p {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.not-found a {
  color: var(--gold);
  font-size: 1.2rem;
  text-decoration: none;
  border-bottom: 2px solid var(--gold);
}

.not-found a:hover {
  color: var(--beige);
}
</style>
