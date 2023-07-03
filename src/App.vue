<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <router-link class="nav-link active" :to="{ path: item.to }">{{ item.name }}</router-link>
          </li>
          <button v-if="token != null" @click="logout">Cerrar sesión</button>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import useAuthStore from './store/auth';
  import role from './helpers/role';
  import router from './router';

  const navItems = ref([]);

  const defaultItems = [
    { name: 'Inicio', to: '/' },
    { name: 'Iniciar sesión', to: '/login' }
  ];

  const adminItems = [
    { name: 'Inicio', to: '/home' },
    { name: 'Empleados', to: '/empleados' },
  ];

  const empItems = [
    { name: 'Inicio', to: '/home' },
    { name: 'Juegos', to: '/juegos'},
    { name: 'Horarios', to: '/horarios'}
  ];

  const auth = useAuthStore();
  const { token } = storeToRefs(auth)

  const setitems = () => {
    if(auth.token != null)
      auth.currentUser.role === role.admin ? navItems.value = adminItems :  navItems.value = empItems;
    else
      navItems.value = defaultItems;
  }

  onMounted(() => {
    setitems();
  });

  watch(token, () => {
    setitems();
  });

  const logout = () => {
    auth.logout();
    router.push('/login');
  }
</script>

<style scoped></style>
