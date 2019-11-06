<template>
  <div id="app">
    <h1>여기는 최상위 컴포넌트 입니다.</h1>
    <!-- 이하 component 사용 구문 -->
    <!-- 3. 사용 -->
    <todo-list category="취업특강"></todo-list>
    <todo-list category="SSAFY"></todo-list>
    <todo-list category="기타"></todo-list>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoList,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
