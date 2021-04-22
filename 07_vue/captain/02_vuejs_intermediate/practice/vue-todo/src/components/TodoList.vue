<template>
  <div>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in this.storedTodoItems" :key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check" :class="{checkBtnCompleted: todoItem.completed}"
          @click="toggleComplete({todoItem, index})"></i>
        <span :class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <span class="removeBtn" @click="removeTodo({todoItem, index})">
          <i class="fas fa-trash"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      // 인자 선언을 하지 않아도 removeTodo({todoItem, index})와 같이 인자를 넘긴다.
      // 단, template의 메서드 선언한 부분에서 두 개의 인자로 작성한 부분을 {}로 감싸서 하나의 객체 인자로 destructuring 해준다.
      removeTodo: 'removeOneItem',
      toggleComplete: 'toggleOneItem'
    })
    // removeTodo(todoItem, index) {
    //   this.$store.commit('removeOneItem', {todoItem, index})
    // },
    // toggleComplete(todoItem, index) {
    //   this.$store.commit('toggleOneItem', {todoItem, index})
    // }
  },
  computed: {
    ...mapGetters(['storedTodoItems'])
    // todoItems() {
    //   return this.$store.getters.storedTodoItems
    // }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0px;
    text-align: left;
  }

  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }

  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }

  .checkBtn {
    line-height: 50px;
    color: #62acde;
    margin-left: 5px;
  }

  .checkBtnCompleted {
    color: #b3adad;
  }

  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }

  /* 리스트 아이템 트랜지션 효과 */
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>