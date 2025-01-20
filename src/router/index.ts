import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/views/auth/Login.vue'
import NoteList from '@/views/notes/NoteList.vue'
import CreateNote from '@/views/notes/CreateNote.vue'
import EditNote from '@/views/notes/EditNote.vue'
import Register from "@/views/auth/Register.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { title: 'Login' },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { title: 'Register' },
    },
    {
        path: '/',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Note List',
                component: NoteList,
                meta: { title: 'Note List' },
            },
            {
                path: '/create-note',
                name: 'Create Note',
                component: CreateNote,
                meta: { title: 'Create Note' },
            },
            {
                path: '/edit-note/:id',
                name: 'Edit Note',
                component: EditNote,
                meta: { title: 'Edit Note' },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
