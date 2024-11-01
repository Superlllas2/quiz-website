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
        component: TopicChoice
    },
    {
        path: "/game",
        component: Game
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

export default router;