<template>
  <div id="app">
    <Navbar class="Menu"/> 
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import Navbar from './components/NavbarStatic.vue'

export default {
  name: 'App',
  components:{
    Navbar //Utilice un componente menu como navbar
  }

}
</script>

<style src="./styles/style.css">

</style>
