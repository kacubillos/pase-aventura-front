import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListView from "../views/employees/ListView.vue";
import Employee from "../views/employees/Employee.vue";
import SaveView from "../views/employees/SaveView.vue";
import GameListView from "../views/games/GameListView.vue";
import Game from "../views/games/Game.vue";
import GameSaveView from "../views/games/GameSaveView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/empleados', component: ListView },
    { path: '/empleados/:id', component: Employee },
    { path: '/empleados/nuevo', component: SaveView },
    { path: '/juegos', component:GameListVie},
    { path: '/juegos/:id', component: Game},
    { path: '/juegos/nuevo', component: GameSaveView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router