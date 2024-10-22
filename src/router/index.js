import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/Home.vue';
import SignupForm from "@/components/SignupForm.vue";
import NotFound from "@/components/NotFound.vue";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/signup",
        component: SignupForm
    },
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