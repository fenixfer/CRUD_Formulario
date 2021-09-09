<template>
  <Navbar />
  <!--Para separar un poco el imput hacemos un container
  y introducimos el router (para que quede enmedio)-->
  <div class='container'>
    <router-view/>
  </div>
</template>

<script>
  //Llamamos al componente Navbar
  import Navbar from './components/Navbar.vue'
  export default {
    components: {
      Navbar
    }
  }
</script>