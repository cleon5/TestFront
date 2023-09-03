<template>
  <div id="app">
    <Navbar class="Menu"/> //Utilice un componente menu como navbar
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import Navbar from './components/NavbarStatic.vue'

export default {
  name: 'App',
  components:{
    Navbar
  }

}
</script>

<style src="./styles/style.css">

</style>
