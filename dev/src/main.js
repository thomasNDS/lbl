import Vue from 'vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'
import Legal from './pages/Legal.vue'
import Disclaimer from './pages/Disclaimer.vue'
import Orga from './pages/Orga.vue'
import Countries from './pages/Countries.vue'
import Country from './pages/Country.vue'
import Interet from './pages/Interet.vue'
import Interets from './pages/Interets.vue'
import p404 from './pages/404.vue'

import Styles from './styles/main.scss'

import Meta from 'vue-meta'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(Meta)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.filter('date', function(value) {
  if (value) {
    return new Date(value).toLocaleDateString();
  }
})

Vue.filter('dateYMD', function(value) {
  if (value) {
    let valDate = new Date(value)
    return [
      valDate.getFullYear(),
      valDate.getMonth() > 8 ? valDate.getMonth() + 1 : '0' +  (valDate.getMonth() + 1), 
      valDate.getDate() > 9 ? valDate.getDate() : '0' + valDate.getDate(),  
      ].join('-')
  } else {return "NaN"}
})

Vue.filter('majuscule', function(value) {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
})

Vue.filter('countryname', function(value) {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().split(',')[0]
  }
})

Vue.filter('currency', function(value) {
  if (value) {
    return Number.parseFloat(value).toLocaleString();
  }
})
 

const store = {}
store.url = 'https://script.google.com/macros/s/AKfycbxqd3bFwVpmY1hGrq0HNheCGIwiXoVIXBUB7CcDnsQ-_6uKHO8l/exec?nav=u'
store.cacheUrl = 'https://lobbyland.eu/data/'
store.lang = "EN"
store.ctxDist = ctxDist
store.isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
store.clientSize = {"x" : document.body.clientWidth, "y" :  document.body.clientHeight}
const param = function(route) {

  if (["en", "fr","EN", "FR"].indexOf(route.query.lang) >= 0) {
    store.lang = route.query.lang.toUpperCase()
  }
 return { storage: store}
}

const routes = [
  { path: '/', component: Home, props: param},
  { path: '/orga/:id', component: Orga , props: param},
  { path: '/country/:id', component: Country , props: param},
  { path: '/countries', component: Countries , props: param},
  { path: '/activity/:id', component: Interet , props: param},
  { path: '/activities', component: Interets , props: param},
  { path: '/disclaimer', component: Disclaimer , props: param},
  { path: '/legal', component: Legal , props: param},
  { path: '/404', component: p404 , props: param},
  { path: '/contact', component: Contact , props: param}
]

const router = new VueRouter({
  routes, // short for `routes: routes`
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 115 }
  }
})

const app = new Vue({
  router,
  render(h) {
    return h(App, {
      props: {
        storage: store
        }
    })
  }
}).$mount('#app')

