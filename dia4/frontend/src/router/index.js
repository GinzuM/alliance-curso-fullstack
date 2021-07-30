import Vue from 'vue'
import VueRouter from 'vue-router'

import clientes from '@/components/clientes/ListaClientes'

Vue.use(VueRouter)

const routes = [{
        path: '/clientes',
        name: 'clientes',
        component: clientes
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router