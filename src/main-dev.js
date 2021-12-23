import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import axios from 'axios'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入Nprogress包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* 配置请求的根路径 */
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 在request拦截器中展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器中关闭进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YW5nIiwiY3JlYXRlZCI6MTQ4OTA3OTk4MTM5MywiZXhwIjoxNDg5Njg0NzgxfQ.RC-BYCe_UZ2URtWddUpWXIp4NMsoeq2O6UF-8tVplqXY1-CI9u1-a-9DAAJGfNWkHE81mpnR3gXzfrBAB3WUAg'
Vue.component('tree-table', TreeTable)

Vue.use(VueQuillEditor)

Vue.filter('dataFormat', function (originVal) {
  const df = new Date(originVal)
  const y = df.getFullYear()
  const m = (df.getMonth() + 1 + '').padStart(2, '0')
  const d = (df.getDay() + '').padStart(2, '0')
  const hh = (df.getHours() + '').padStart(2, '0')
  const mm = (df.getMinutes() + '').padStart(2, '0')
  const ss = (df.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
