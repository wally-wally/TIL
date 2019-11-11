<template>
  <div v-if="video" class="col-lg-8"> <!-- console에 출력되는 error를 처리하기 위해 video에 데이터가 있을 때만 출력! -->
    <div class="embed-responsive embed-responsive-16by9">
      <iframe :src="videoUrl" frameborder="0" class="embed-responsive-item"></iframe>
    </div>
    <div class="details">
      <!--
        특수문자 인코딩 깨지는 것을 막기 위해
        h4 태그 안에 작성했던 <h4>{{ video.snippet.title }}</h4>을
        v-html을 이용해 <h4 v-html="video.snippet.title"></h4>로 작성한다.
      -->
      <h4 v-html="video.snippet.title"></h4>
      <p>{{ video.snippet.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VideoDetail',
    props: {
      video: {
        type: Object,
      }
    },
    computed: {
      videoUrl() {
        const videoId = this.video.id.videoId
        return `http://www.youtube.com/embed/${videoId}`
      }
    }
  }
</script>

<style scoped>
  .details {
    margin-top: 10px;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
  }
</style>