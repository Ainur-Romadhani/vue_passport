//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue')
    },
    {
        path: '/todolist/:id',
        name: 'datauser.todo',
        component: () => import('@/views/dashboard/todolist.vue')
    },
    {
        path: '/todolist/create/:id',
        name: 'todolist.create',
        component: () => import('@/views/todolist/create.vue')
    },
    {
        path: '/todolist/edit/:id',
        name: 'todolist.edit',
        component: () => import('@/views/todolist/edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router