import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ListView from "../views/employees/ListView.vue";
import EmployeeView from "../views/employees/Employee.vue";
import SaveView from "../views/employees/SaveView.vue";
import useAuthStore from "../store/auth.js";
import Role from "../helpers/role.js";
import Customer from "../views/customers/customers.vue";
import newCustomer from "../views/customers/NewCustomer.vue";
import EditCustomer from "../views/customers/EditCustomer.vue";

const routes = [
    {
        path: '/',
        component: LandingView,
        meta: { requireAuth: false, role: [ Role.default ] }
    },
    {
        path: '/login',
        component: LoginView,
        meta: { requireAuth: false, role: [ Role.default ] }
    },
    {
        path: '/home',
        component: HomeView,
        meta: { requireAuth: true, role: [ Role.admin, Role.emp ] }
    },
    {
        path: '/empleados',
        component: ListView,
        meta: { requireAuth: true, role: [ Role.admin ] }
    },
    {
        path: '/empleados/:id',
        component: EmployeeView,
        meta: { requireAuth: true, role: [ Role.admin ] }
    },
    {
        path: '/empleados/nuevo',
        component: SaveView,
        meta: { requireAuth: true, role: [ Role.admin ] }
    },
    
    {
        path: '/compradores',
        component: Customer,
        meta: { requireAuth: true, role: [ Role.admin ] }
    },
    {
        path: '/compradores/nuevo',
        component: newCustomer,
        meta: { requireAuth: true, role: [ Role.admin ] }
    },
    {
        path: '/compradores/editar/:id',
        component: EditCustomer,
        meta: { requireAuth: true, role: [ Role.admin ] }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const isAuth = auth.token;
    const userRole = auth.currentUser.role;

    if(to.meta.requireAuth) {
        if(isAuth == null)
            return next({ path: '/login', query: { returnUrl: to.path } });

        if(!to.meta.role.includes(userRole))
            return next('/home');

        return next();
    } else {
        if(isAuth != null)
            return next('/home')

        return next();
    }
});

export default router