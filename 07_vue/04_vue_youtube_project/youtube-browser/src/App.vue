<template>
  <div id="app">
    <!-- 만약 inputChange 이벤트가 일어나면 onInputChange 라는 method 가 실행 됨 -->
    <search-bar @inputChange="onInputChange"></search-bar> <!-- 태그의 규칙 반드시 지키자! (kabab-case) -->
    <div class="row">
      <video-detail :video="selectedVideo"></video-detail>
      <video-list @videoSelect="onVideoSelect" :videos="videos"></video-list> <!-- :videos의 videos는 이름이 바뀌어도 되고, 오른쪽 videos는 이름이 바뀔 수 없다. -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY // process.env.는 vue 공식 문서에 나와 있음
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'App', // 최상단 컴포넌트기 때문에 이름이 없어도 되지만 명시적으로 작성한다.
  components: {
    SearchBar, // 실제로는 SearchBar: SearchBar와 같이 만들지만 ES6+ 이후부터 SearchBar만 써도 된다.
    VideoList,
    VideoDetail,
  },
  data() {
    return {
      // [주의!!] Vue component에서는 return을 할 때만 이름공간을 분리해줘야 한다!! - return {} 으로 작성
    // return이 Object를 리턴하는 함수이다!!
      videos: [],
      selectedVideo: null, // 올라온 video를 넣어줘야 하므로 새로운 변수 선언 / 선택 안 된 기본상태가 필요하므로 null 선언
    }
  },
  methods: {
    onVideoSelect(video) {
      // console.log(video)
      this.selectedVideo = video
    },
    onInputChange(inputValue) { // 하위 컴포넌트로부터 넘어온 데이터가 있으므로 인자가 있다. inputValue = e.target.value
      // console.log(inputValue)
      axios.get(API_URL, {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: inputValue, // https://www.youtube.com/results?search_query=애플 에서 search_query 부분(q로 써도 인식함)
        }
      })
      .then(response => { // onInputChange 함수 안에 있으므로 arrow function으로 작성한다.
        // console.log(response)
        this.videos = response.data.items
      })
      .catch(err => { // onInputChange 함수 안에 있으므로 arrow function으로 작성한다.
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
