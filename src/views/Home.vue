<template>
    <div id="app">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <NavbarStatic class="navBard"/>
    </div>
  </template>
  
  <script>
  import HelloWorld from '../components/HelloWorld.vue'
  import NavbarStatic from "../components/NavbarStatic.vue";
  
  export default {
    name: 'PageHome',
    components: {
      HelloWorld,
      NavbarStatic
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .navBard{
    width: 300px;
  }
  </style>
  