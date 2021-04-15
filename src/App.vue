<template>
  <div id="app">
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
export default {
  name: "App",
  components: {
    Footer
  }
}
</script>


<style lang="scss">
  html, body, #app {
    width: 100%;
    padding: 0;
    margin: 0;
    background: #eeeeee;
  }
</style>
