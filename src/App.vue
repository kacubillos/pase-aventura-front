<template>
  <nav class="navbar navbar-expand-lg sticky-top" v-if="router.currentRoute.value.path != '/login'">
    <div class="container">
      <a class="navbar-brand d-block d-md-none" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-md-flex align-items-center justify-content-between" id="navbarNav">
        <a class="navbar-brand d-none d-md-block" href="#">Navbar</a>
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <router-link class="nav-link" :class="{ 'active': item.to === itemActive }"
              @click="() => itemActive = item.to" :to="{ path: item.to }">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown" v-if="token != null">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <div class="img-container m-0">
                <img
                  src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                  alt="profile image">
              </div>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <div class="dropdown-container">
                <li>
                  <p class="title">¡Hola, Kevin!</p>
                </li>
                <li>
                  <p class="role text-muted">Admin</p>
                </li>
                <li><a class="dr-link">Ver mi perfil</a></li>
              </div>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-container dr-link text-danger" @click="logout">Cerrar sesion</a></li>
            </ul>
          </li>
          <li v-else>
            <router-link class="btn btn-login" to="/login">Iniciar sesión</router-link>
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
import { useRouter } from 'vue-router';
import useAuthStore from './store/auth';
import role from './helpers/role';

const router = useRouter();

const navItems = ref([]);

let itemActive = ref('');

const defaultItems = [
  { name: 'Inicio', to: '/' }
];

const adminItems = [
  { name: 'Inicio', to: '/home' },
  { name: 'Empleados', to: '/empleados' },
];

const empItems = [
  { name: 'Inicio', to: '/home' }
];

const auth = useAuthStore();
const { token } = storeToRefs(auth)

const setitems = () => {
  if (auth.token != null)
    auth.currentUser.role === role.admin ? navItems.value = adminItems : navItems.value = empItems;
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

<style scoped>
.dropdown-container {
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.role {
  font-size: 0.9rem;
  margin: 0;
}

.dr-link {
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}

.img-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px;
  cursor: pointer;
}

.img-container > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-login {
  padding: var(--padding-button-3);
  background-color: var(--color-black-1);
  color: var(--color-white);
  box-shadow: var(--shadow-xs) var(--color-black-1-shadow-3);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-short);
}

.btn-login:hover {
  background-color: var(--color-black-3);
  color: var(--color-white);
  box-shadow: var(--shadow-xs) var(--color-black-1-shadow-2);
  transform: scale(0.95);
}</style>
