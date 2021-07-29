<template>
  <div id="app">
    <ListaClientes />
  </div>
</template>

<script>
import ListaClientes from './components/ListaClientes.vue'
//import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    ListaClientes
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
