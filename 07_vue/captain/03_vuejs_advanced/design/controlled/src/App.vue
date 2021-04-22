<template>
  <check-box v-model="checked"></check-box> <!-- props 대신에 v-model로 하위 컴포넌트에 내려보자. -->
</template>

<script>
import CheckBox from './components/CheckBox.vue';

export default {
  components: {
    CheckBox
  },
  data(){
    return{
       checked: false
    }
  },
  
}
</script>