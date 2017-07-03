import Vue from 'vue'
import App from './App.vue'

//加载路由
import router from './router/index.js'

// 引入elejs
import ElementUI from 'element-ui'

// 引入ele css
import 'element-ui/lib/theme-default/index.css'

// 引入axios的配置
import $http from './config/axios.js'
// 在vue的原型上挂载$http
Vue.prototype.$http = $http

// ele JS需要use
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
