<template>
  <div>
    <ul>
      <!-- <item v-for="item in items" :key="item.slice(item.length - 1, item.length)">
        {{ item }}
      </item> -->
      <!-- slot을 이용하면 DOM 구조와 스타일을 새로 적용할 수 있다. -->
      <item>
        아이템 1
      </item>
      <item>
        아이템 2 <button>click me</button>
      </item>
      <item>
        <div>
          아이템 3
        </div>
        <img src="./assets/endgame.png" alt="어벤져스 엔드게임" width="200px" height="100px">
      </item>
      <item>
        <div style="color: blue; font-size: 20px;">아이템 4</div>
      </item>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  components: {
    Item,
  }
}
</script>