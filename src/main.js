import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// import com from './common'
import lodash from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Router from 'vue-router'
import service from "./http"
import dayjs from 'dayjs'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }


Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.prototype.$lodash = lodash


Vue.use(mavonEditor)
Vue.use(VCharts)
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')