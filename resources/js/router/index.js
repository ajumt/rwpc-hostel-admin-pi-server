import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/',
            name:'login',
            component:()=>import('@/js/pages/Login.vue'),
        },
        {
            path:'/Home',
            name:'home',
            component:()=>import('@/js/pages/Home.vue'),
        }
    ]
})

export default router;