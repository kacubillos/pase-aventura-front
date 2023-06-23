import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ListView from "../views/employees/ListView.vue";
import Employee from "../views/employees/Employee.vue";
import SaveView from "../views/employees/SaveView.vue";
import useAuthStore from "../store/auth.js";

const routes = [
    { path: '/', component: HomeView, meta: { requireAuth: false }},
    { path: '/login', component: LoginView, meta: { requireAuth: false }},
    { path: '/empleados', component: ListView, meta: { requireAuth: true }},
    { path: '/empleados/:id', component: Employee, meta: { requireAuth: true }},
    { path: '/empleados/nuevo', component: SaveView, meta: { requireAuth: true }},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const isAuth = auth.token;

    if(to.meta.requireAuth && isAuth == null)
        next('/login');
    else if(!to.meta.requireAuth && isAuth != null)
        next('/empleados')
    else
        next();
});

export default router