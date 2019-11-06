// Vue 인스턴스를 최종으로 만드는 파일

// 1. 설치된 vue를 추가
// (내가 판든 파일 아닌 경우) 현재 위치에서 vue 이름을 가진 폴더가 없음 => 자동으로 node_modules 에서 가져옴
import Vue from 'vue'

// 2. 최상위 컴포넌트 추가(App.vue)
// (내가 만든 파일인 경우) 상대 경로 표시를 해야 함
import App from './App.vue'

new Vue({
  render: h => h(App)// 보통 createElement를 h로 줄인다.
}).$mount('#app') // .$mount('#app')는 el: '#app'과 유사한 역할 수행