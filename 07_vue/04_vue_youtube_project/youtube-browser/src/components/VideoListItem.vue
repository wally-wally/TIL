<template>
  <li @click="onVideoSelect" class="list-group-item">
    <img :src="thumbnailUrl" alt="img"> <!-- 여기서 computed는 ()를 쓰지 않고 watched는 ()를 써야 한다! -->
    <div class="media-body" v-html="video.snippet.title"> <!-- 글자가 어긋나게 삐져나가지 않도록 div 태그로 감싼다. -->
    </div>
  </li>
</template>

<script>
  export default {
    name: 'VideoListItem', // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이다.
    props: {
      video: {
        type: Object,
        requried: true,
      }
    },
    methods: {
      onVideoSelect() {
        this.$emit('videoSelect', this.video)
      }
    },
    computed: {
      thumbnailUrl() {
        return this.video.snippet.thumbnails.default.url // 이 곳에 미리 캐싱되어 있음
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
    background-color: #eee; /* 마우스를 올렸을 때 회색 나게 한다. */
  }
</style>