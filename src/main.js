import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './style/global.css'

Vue.config.productionTip = false

Vue.filter('currencyFormat', (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
