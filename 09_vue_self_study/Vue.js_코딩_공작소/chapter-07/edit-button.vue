…
  </p>
  <button @click="edit">상품 수정</button>
  <router-view></router-view>
</div>
…
methods: {
  edit() {
      this.$router.push({name: 'Edit'})
   }
},
