import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListView from "../views/employees/ListView.vue";
import Employee from "../views/employees/Employee.vue";
import SaveView from "../views/employees/SaveView.vue";
import GameListView from "../views/games/GameListView.vue";
import Game from "../views/games/Game.vue";
import GameSaveView from "../views/games/GameSaveView.vue";
import ScheduleListView from "../views/schedules/ScheduleListView.vue";
import Schedule from "../views/schedules/Schedule.vue";
import ScheduleSaveView from "../views/schedules/ScheduleSaveView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/empleados', component: ListView },
    { path: '/empleados/:id', component: Employee },
    { path: '/empleados/nuevo', component: SaveView },
    { path: '/juegos', component:GameListView},
    { path: '/juegos/:id', component: Game},
    { path: '/juegos/nuevo', component: GameSaveView},
    { path: '/horarios', component: ScheduleListView},
    { path: '/horarios/:id', component:Schedule},
    { path: '/horarios/nuevo',component:ScheduleSaveView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router