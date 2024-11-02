import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/Home.vue';
import SignupForm from "@/components/SignupForm.vue";
// import NotFound from "@/components/NotFound.vue";
import Game from "@/components/Game.vue";
import TopicChoice from "@/components/TopicChoice.vue";
import Login from "@/components/Login.vue"

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/signup",
        component: SignupForm
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/create",
        component: TopicChoice,
        meta: { requiresAuth: true }
    },
    {
        path: "/game",
        component: Game,
        meta: { requiresAuth: true }
    }
    // {
    //     path: '*',
    //     component: NotFound
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if a token is stored

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        // Redirect to log in if trying to access a protected route without being authenticated
        next('/login');
    } else {
        // Otherwise, proceed to the route
        next();
    }
});

export default router;