import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Commonality from '../views/commonality/Commonality.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: Home
    // },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/login/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/register/Register.vue')
    },
    {
        path: '/',
        component: Commonality,
        children: [{
            meta: {
                title: '首页'
            },
            path: '',
            name: 'home',
            component: () =>
                import ('../views/Home.vue'),
        }]
    },
    {
        path: '/table',
        component: Commonality,
        children: [{
            meta: {
                title: '分页表格'
            },
            path: '',
            name: 'table',
            component: () =>
                import ('../views/table/Table.vue'),
        }]
    },
    {
        path: '/tag',
        component: Commonality,
        children: [{
            meta: {
                title: '标签页'
            },
            path: '',
            name: 'tag',
            component: () =>
                import ('../views/tag/Tag.vue'),
        }]
    },
    {
        path: '/upload',
        component: Commonality,
        children: [{
            meta: {
                title: '图片上传'
            },
            path: '',
            name: 'upload',
            component: () =>
                import ('../views/upload/Upload.vue'),
        }]
    },
    {
        path: '/logout',
        component: Commonality,
        children: [{
            meta: {
                title: '退出登录'
            },
            path: '',
            name: 'logout',
            component: () =>
                import ('../views/logout/Logout.vue'),
        }]
    },
    {
        path: '/publish',
        component: Commonality,
        children: [{
            meta: {
                title: '已发表'
            },
            path: '',
            name: 'publish',
            component: () =>
                import ('../views/publish/Publish.vue'),
        }]
    },
    {
        path: '/markdown',
        component: Commonality,
        children: [{
            meta: {
                title: '发布文章'
            },
            path: '',
            name: 'markdown',
            component: () =>
                import ('../views/markdown/Markdown.vue'),
        }]
    },
    {
        path: '/statistics',
        component: Commonality,
        children: [{
            meta: {
                title: '统计'
            },
            path: '',
            name: 'statistics',
            component: () =>
                import ('../views/statistics/Statistics.vue'),
        }]
    },
    {
        path: '/excel',
        component: Commonality,
        children: [{
            meta: {
                title: '导出excel'
            },
            path: '',
            name: 'excel',
            component: () =>
                import ('../views/excel/Excel.vue'),
        }]
    },
    {
        path: '/detail',
        component: Commonality,
        children: [{
            meta: {
                title: '修改'
            },
            path: '',
            name: 'detail',
            component: () =>
                import ('../views/detail/Detail.vue'),
        }]
    },
    {
        path: '/check',
        component: Commonality,
        children: [{
            meta: {
                title: '查看'
            },
            path: '',
            name: 'check',
            component: () =>
                import ('../views/check/Check.vue'),
        }]
    },
    {
        path: '*',
        meta: {
            title: '出错啦'
        },
        component: () =>
            import ('../views/error/Error.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    let user = localStorage.getItem('adminUser')
    document.title = to.meta.title
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        user ? next() : next('/login')
    }
})
export default router