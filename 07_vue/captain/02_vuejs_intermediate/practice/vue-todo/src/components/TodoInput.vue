<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" @keyup.enter="addTodo">
    <span class="addContainer" @click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>

    <Modal v-if="showModal" @close="showModal = false">
      <!-- slot: 특정 컴포넌트의 일부 UI들을 재사용할 수 있는 속성 -->
      <h3 slot="header">
        경고!
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
      </h3>
      <div slot="body">
        내용을 입력하세요.
      </div>
    </Modal>

  </div>
</template>

<script>
import Modal from '@/components/common/Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      newTodoItem: '',
      showModal: false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== '') {
        const text = this.newTodoItem.trim()
        this.$store.commit('addOneItem', text)
        this.clearInput()
      } else {
        this.showModal = !this.showModal
      }
    },
    clearInput() {
      this.newTodoItem = ''
    }
  }
}
</script>

<style scoped>
  input:focus {
    outline: none;
  }

  .inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }

  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }

  .addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }

  .addBtn {
    color: white;
    vertical-align: middle;
  }

  .closeModalBtn {
    color: #42b983;
  }
</style>