<template>
  <ul class="col-lg-4 list-group">
    <!-- 여기선 etag가 hash 값이라 item간 서로 안 겹치므로 key로 사용 -->
    <!-- :video="video" : 자식쪽으로 넘겨줄 때도 v-bind 사용 -->
    <video-list-item
      v-for="video in videos"
      :key="video.etag"
      :video="video"
      @videoSelect="onVideoSelect"> <!-- VideoListItem.vue의 onVideoSelect와 다른 onVideoSelect 이다. -->
    </video-list-item>
  </ul>
</template>

<script>
  import VideoListItem from './VideoListItem' // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이므로 VideoListItem 컴포넌트 등록은 여기서 한다!
  export default {
    name: 'VideoList',
    components: {
      VideoListItem,
    },
    methods: {
      onVideoSelect(video) {
        this.$emit('videoSelect', video)
      }
    },
    props: {
      videos: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style>

</style>