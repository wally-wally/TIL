import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

// render: h => h(App) 이 코드는 아래 코드와 동일한 역할
// var App = {
//   template: '<div>app</div>'
// }

// components: {
//   'app': App
// }
