import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/all.scss'
import './style.css'

import App from './App.vue'
import HomePage from './views/Home.vue'

import AboutPage from './views/About.vue'
import SingUpPage from './views/Singup.vue'
import LoginForm from './views/Singin.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/singin', component: LoginForm },
  { path: '/singup', component: SingUpPage },
  { path: '/about', component: AboutPage },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
