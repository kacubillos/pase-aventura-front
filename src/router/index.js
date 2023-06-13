import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListView from "../views/employees/ListView.vue";
import Employee from "../views/employees/Employee.vue";
import SaveView from "../views/employees/SaveView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/empleados', component: ListView },
    { path: '/empleados/:id', component: Employee },
    { path: '/empleados/nuevo', component: SaveView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router