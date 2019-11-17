<template>
  <li @click="onVideoSelect" class="list-group-item"> <!-- 이 구문의 onVideoSelect는 methods에 선언된 함수 이름 -->
    <img :src="thumbnailUrl" alt="img">
    <div class="media-body" v-html="video.snippet.title"></div>
  </li>
</template>

<script>
export default {
  name: 'VideoListItem',
  props: {
    video: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onVideoSelect() {
      this.$emit('videoSelect', this.video) // 여기서 videoSelect는 VideoList.vue에서 작성되는 이벤트 이름이다.
    }
  },
  computed: {
    thumbnailUrl() {
      return this.video.snippet.thumbnails.default.url
    }
  }
}
</script>

<style scoped>
  li {
    display: flex;
    cursor: pointer;
  }

  li:hover {
    background-color: #eee;
  }
</style>