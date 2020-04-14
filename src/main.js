// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import VueClipboard from 'vue-clipboard2'
import 'lib-flexible/flexible.js'
import api from './api/index.js'
import store from "./store/store.js"
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { MessageBox } from 'mint-ui'

Vue.use(Vuex)
Vue.use(api)
Vue.use(VueRouter)
Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.use(MintUI)
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');