<template>
  <div class="menu-component">
    <b-menu id="">
      <b-menu-list label="Menu"> </b-menu-list>

      <b-menu-list>
        <b-menu-item
          label="Home"
          icon="link"
          tag="router-link"
          target=""
          to="/"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Login"
          icon="link"
          tag="router-link"
          target=""
          to="/login"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Timer"
          icon="link"
          tag="router-link"
          target=""
          to="/reloj"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Todo List"
          icon="link"
          tag="router-link"
          target=""
          to="/todolist"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Git Profile"
          icon="link"
          tag="router-link"
          target=""
          to="/git"
        ></b-menu-item>
      </b-menu-list>

      <b-menu-list label="Actions">
        <b-menu-item label="Logout"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>
  
  <script>
export default {
  name: "NavbarStatic",
  data() {
    return {
     
    };
  },
};
</script>

<style scoped>
.menu-component{
  padding: 22px;
  background-color: burlywood;
  height:100vh;
}
</style>