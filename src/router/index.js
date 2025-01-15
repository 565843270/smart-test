// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/pages/Login.vue'
import AdminHome from '@/pages/AdminHome.vue'
import TesterHome from '@/pages/TesterHome.vue'
import NotFound from '@/pages/NotFound.vue'

// Admin 的子组件
import UserManage from '@/components/Admin/UserManage.vue'
import ModelManage from '@/components/Admin/ModelManage.vue'
import DatasetManage from '@/components/Admin/DatasetManage.vue'
import ServerManage from '@/components/Admin/ServerManage.vue'
import TestingManage from '@/components/Admin/TestingManage.vue'
import MainInfo from "@/components/Admin/MainInfo.vue";

// Tester 的子组件
import ModelList from '@/components/Tester/ModelList.vue'
import EnvironmentView from '@/components/Tester/EnvironmentView.vue'
import ParameterSetting from '@/components/Tester/ParameterSetting.vue'
import DatasetView from '@/components/Tester/DatasetView.vue'
import ApplyTest from '@/components/Tester/ApplyTest.vue'


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'AdminHome',
        component: AdminHome,
        meta: {requiresAuth: true, role: 'admin'},
        children: [
            {path: 'main-info', component: MainInfo},
            {path: 'user-manage', component: UserManage},
            {path: 'model-manage', component: ModelManage},
            {path: 'dataset-manage', component: DatasetManage},
            {path: 'server-manage', component: ServerManage},
            {path: 'testing-manage', component: TestingManage},
            // ... 其他管理员子路由
        ]
    },
    {
        path: '/tester',
        name: 'TesterHome',
        component: TesterHome,
        meta: {requiresAuth: true, role: 'tester'},
        children: [
            {path: 'model-list', component: ModelList},
            {path: 'environment', component: EnvironmentView},
            {path: 'parameter', component: ParameterSetting},
            {path: 'dataset', component: DatasetView},
            {path: 'apply-test', component: ApplyTest},
            // ... 其他测试人员子路由
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由导航守卫：用于鉴权
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role') // admin / tester

    if (to.meta.requiresAuth && !token) {
        // 未登录，跳转到登录页
        return next('/login')
    }
    // 如果访问的是管理员路由，但角色不是 admin，就拒绝
    if (to.meta.role === 'admin' && role !== 'admin') {
        return next('/login')
    }
    // 同理，如果访问的是测试人员路由，但角色不是 tester，就拒绝
    if (to.meta.role === 'tester' && role !== 'tester') {
        return next('/login')
    }
    next()
})

export default router
