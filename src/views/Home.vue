<template>
  <div>
    <!-- Header-Row mit H1 und Blase -->
    <div class="header-row">
      <h1 class="title-base big-title">herz, küche,</h1>
      <div class="looping-bubble">
        <span class="bubble-text">Moin!</span>
        <img
          src="@/assets/fish.svg"
          alt="Fisch Icon"
          class="fisch-icon"
        />
      </div>
    </div>

    <!-- Bildcontainer mit H2 -->
    <div class="image-container">
      <h2 class="title-base big-title big-title-2">tisch</h2>
      <div class="home-container">
        <img
          src="@/assets/images/1.jpg"
          alt="Haus Hamburg"
          class="inverted-radius"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '../styles/Home.css'

export default {
  name: 'Home'
}
</script>
