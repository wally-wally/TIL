# :notebook_with_decorative_cover: 07_Vue - Day04

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

---

<br>

## 4. 11월11일(4일차) - `Youtube 검색 기능(Youtube Thumbnail)`

---

:heavy_check_mark: <b>Project Structure</b>

<img src="https://user-images.githubusercontent.com/52685250/68567123-91284980-049b-11ea-9c7c-e1dff97cc768.JPG" width="700px">

<img src="https://user-images.githubusercontent.com/52685250/68567124-91284980-049b-11ea-9a3b-0ada5a70ff3c.JPG" width="600px">

---

:heavy_check_mark: <b>기본 세팅</b>

- `vue create youtube-browser` 로 vue cli 생성
- `default (babel, eslint)` 항목 선택(Enter)
- `cd youtube-browser`로 디렉토리 이동
- `npm run serve`로 서버 잘 켜지나 확인

---

<br>

:black_flag: <b>최상단 컴포넌트 기본 세팅</b>

> `App.vue`
>
> - 기본으로 작성된 구문 지우고 초기상태로 시작!
>
> ```vue
> <template>
>   <div id="app">
> 
>   </div>
> </template>
> 
> <script>
> 
> export default {
>   name: 'App', // 최상단 컴포넌트기 때문에 이름이 없어도 되지만 명시적으로 작성한다.
> 
> }
> </script>
> 
> <style>
> 
> </style>
> ```

<br>

### 4.1 SearchBar 컴포넌트 구성

> < 컴포넌트 기본 세팅 >
>
> `components` > `SearchBar.vue`
>
> ```vue
> <template>
>   <div>
>      <input type="text">
>   </div>
> </template>
> 
> <script>
> export default {
>    name: 'SearchBar'
>  
> }
> </script>
> 
> <style>
> 
> </style>
> ```

#### (1) `SearchBar` 컴포넌트 최상단 컴포넌트와 연결

- 최상단 컴포넌트에 App 등록

  `App.vue`

  ```vue
  <template>
    <div id="app">
      <!-- 태그의 규칙 반드시 지키자! (kabab-case) -->
      <search-bar></search-bar> <!-- 3단계 -->
    </div>
  </template>
  
  <script>
  import SearchBar from './components/SearchBar' // 1단계
  
  export default {
    name: 'App', // 최상단 컴포넌트기 때문에 이름이 없어도 되지만 명시적으로 작성한다.
    components: { // 2단계
      SearchBar,
    },
  }
  </script>
  ```

- 하위 컴포넌트에서 입력한 데이터가 어디에 있는지 console.log로 확인

  `SearchBar.vue`

  ```vue
  <template>
    <div>
      <input @change="onInput" type="text">
      <!-- @change : 입력 후 enter를 쳐야 onInput 함수가 실행 -->
    </div>
  </template>
  
  <script>
    export default {
      name: 'SearchBar',
      methods: {
        onInput(e) {
          console.log(e)
          // 하지만 Unexpected console statement 오류가 발생하므로 추가 설정을 해준다.
          // vue는 배포할 때 console.log(e)와 같은 구문을 작성하면 안 된다고 설정해 놓기 때문
          // 중요한 정보가 누출될 수 있기 때문
        }
      }
    }
  </script>
  
  <style>
  
  </style>
  ```

  `package.json`의 <b>rules</b>에 <b>`"no-console": "off"`</b> 구문 추가하고 서버를 껐다가 다시 켜면 오류 없이 console 창에서 볼 수 있다.

  `target` > `value`에 input에 입력한 데이터를 확인할 수 있다.

  ![213213](https://user-images.githubusercontent.com/52685250/68555186-b99a4e80-046f-11ea-9a9d-ab4c24fb4f1c.JPG)

---

:heavy_exclamation_mark: <b>지금까지의 과정 정리 및 진행할 내용</b>

- 사용자가 검색어 입력(SearchBar) => 검색 결과를 `App.vue`로 올려줄 것이다. => `emit` events
  - Information can be easily communicated up and down components
  - Information cannot easily be communicated between sibling components
- 상위 => 하위 : `props`, 하위 => 상위 : `emit`

---

<br>

#### (2) `emit` 으로 하위 컴포넌트에서 상위 컴포넌트로 데이터 보내기

<img src="https://user-images.githubusercontent.com/52685250/68567125-91284980-049b-11ea-9a9b-f2b230261a7d.JPG" width="600px">

- 하위 컴포넌트에서 상위 컴포넌트로 데이터가 보내지도록 `emit`을 설정하자

  `Searchbar.vue`

  ```vue
  <script>
    export default {
      name: 'SearchBar',
      methods: {
        onInput(e) {
          this.$emit('inputChange', e.target.value)
          // $emit(부모 컴포넌트에서 발생하는 이벤트 이름(event name), 보낼 데이터(arguments))
        }
      }
    }
  </script>
  ```

  ![332](https://user-images.githubusercontent.com/52685250/68555345-adfb5780-0470-11ea-9297-fd617e0808b4.JPG)

  

  `App.vue`

  ```vue
  <template>
    <div id="app">
      <!-- 만약 inputChange 이벤트가 일어나면 onInputChange 라는 method 가 실행 됨 -->
      <search-bar @inputChange="onInputChange"></search-bar>
    </div>
  </template>
  
  <script>
  import SearchBar from './components/SearchBar'
  
  export default {
    name: 'App',
    components: {
      SearchBar,
    },
    methods: {
      onInputChange(inputValue) { // 하위 컴포넌트로부터 넘어온 데이터가 있으므로 인자가 있다.
      // inputValue = e.target.value
        console.log(inputValue)
      }
    }
  }
  </script>
  ```

  아래 사진과 같이 input에 입력한 대로 console 창에 출력된다.

  ![123321](https://user-images.githubusercontent.com/52685250/68555456-3843bb80-0471-11ea-8d42-c864b9c0bb91.JPG)

---

:heavy_check_mark: <b>단방향 데이터 흐름의 이점</b>

- vue app 의 데이터 흐름을 쉽게 파악할 수 있음
- 부모 컴포넌트에서 업데이트가 일어나면 자식 컴포넌트는 자동 업데이트(즉, 자식 컴포넌트의 상태를 관리하지 않아도 된다.)
- 하위 컴포넌트가 실수로 부모의 상태를 변경하려 app 데이터의 흐름을 추론하기 어렵게 만드는 것을 방지할 수 있다.

---

- `emit` : 하위에서 상위로 데이터를 올려 보낼 때는 Event 를 발생시키는 방법을 사용한다.
- `props` 는 배열, 객체, 함수 등 무엇이든 내려보내는 속성(properties)이고, `emit event` 는 자식에서 부모로 <b>이벤트를 발생</b> 시키는 것

---

:heavy_exclamation_mark: <b>SearchBar => App</b>

1. 트리거 : input 값 변경(@input)
   - 인자 : event
   - 실행 함수 : onInput
2. 트리거 : input 내 $emit(inputChange)
   - 인자 : 변경된 값
   - 실행 함수 : onInputChange

---

<br>

### 4.2 Google Youtube API 받기 <a href=" https://console.developers.google.com/">(바로 이동)</a>

---

:heavy_check_mark: <b>API 키 발급 과정(간략하게 작성함)</b>

- 새 프로젝트 생성 => 사용자 인증 정보 만들기 => 사용자 인증 정보 선택 도움말
- 인증 정보 종류 : Youtube Data API V3 선택
- 어떤 사용자 인증 정보가 필요한가요?
  - API 호출 위치 : 웹 브라우저, 액세스할 데이터 : 공개 데이터
- 사용자 인증 정보 가져오기 선택하면 API 키 발급 완료

---

- `App.vue`의 `script` 부분 상단에 `const API_KEY = '~~~'` 작성 후 서버 끄고 `npm i axios`로 axios 설치

- `script` 최상단에 axios 사용하기 위해 `import axios from 'axios'` 작성

- API_URL 작성 <a href="https://developers.google.com/youtube/v3/docs/search/list#%EC%9A%94%EC%B2%AD" target="_blank">(참고 홈페이지)</a>

- 현재 까지 `App.vue` 상황

  ```vue
  <script>
  import axios from 'axios'
  import SearchBar from './components/SearchBar'
  const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY // process.env.는 기본으로 작성
  const API_URL = 'https://www.googleapis.com/youtube/v3/search'
  
  export default {
    name: 'App',
    components: {
      SearchBar,
    },
    methods: {
      onInputChange(inputValue) {
        axios.get(API_URL, {
          params: {
            key: API_KEY,
            type: 'video',
            part: 'snippet',
            q: inputValue,
            // https://www.youtube.com/results?search_query=애플 에서 search_query 부분(q로 써도 인식함)
          }
        })
        .then(response => { // onInputChange 함수 안에 있으므로 arrow function으로 작성한다.
          console.log(response)
        })
        .catch(err => { // onInputChange 함수 안에 있으므로 arrow function으로 작성한다.
          console.log(err)
        })
      }
    }
  }
  </script>
  ```

- API_KEY 가리기 (`.gitignore`와 같은 위치에 `.env.local` 파일 생성)

  <b>반드시 'VUE_APP_' 접두사로 시작해야 webpack이 이해할 수 있다!</b>

  ```
  VUE_APP_YOUTUBE_API_KEY=~~~
  ```

<br>

### 4.3 VideoList 컴포넌트 구성

---

:heavy_check_mark: SearchBar에서 emit으로 App.vue로 올려준 데이터를 VideoList 컴포넌트로 내려준다.

<br>

:heavy_exclamation_mark: <b>지금까지의 과정</b>

- `SearchBar`
  - 사용자가 input 에 값을 입력하면 onInput 함수가 실행
  - inputChange 이벤트와 사용자가 입력한 value 가 함께 상위 컴포넌트인 `App.vue` 로 event 와 input value 가 emit된다.
- `App`
  - SearchBar 에서 넘어온 이벤트 inputChange 로 인해 onInputChange 함수가 실행된다.
  - onInputChange 함수는 유튜브 API에 요청을 보내고 비디오 리스트를 응답 받는다.

:heavy_exclamation_mark: <b>앞으로 해야 할 과정</b>

- `VideoList`
  - 넘겨 받은 비디오 리스트를 videos 라는 배열에 저장한다.
  - `data` object가 (videos 배열이 있는 곳) 업데이트 되면, 해당 컴포넌트 (App.vue)가 템플릿을 다시 렌더링한다.
  - 그리고 바로 자식 컴포넌트들도 모두 다시 렌더링 된다.
  - `VideoList` 컴포넌트가 비디오 배열을 받아 화면에 보여주게 된다. => 현재는 배열의 길이를 출력함 (`{{ videos.length }}`)

---

- 기본 세팅

  - `VideoList.vue` 기본 작성

    ```vue
    <template>
      <ul>
        VideoList
      </ul>
    </template>
    
    <script>
      export default {
        name: 'VideoList',
      }
    </script>
    
    <style>
    
    </style>
    ```

  - 컴포넌트 등록 과정 : `App.vue`에 컴포넌트 등록, template 부분에 `<video-list></video-list>`작성

- `App.vue`의 data()에 videos 배열 생성 - return 이름 공간 분리

  <b>[주의!!] Vue component에서는 return을 할 때만 이름공간을 분리해줘야 한다!! - <u>return {}</u> 으로 작성</b>

  return이 <b>Object를 return하는 함수</b>이다!!

  ```vue
  <template>
    <div id="app">
      <search-bar @inputChange="onInputChange"></search-bar>
      <!-- :videos의 videos는 이름이 바뀌어도 되고, 오른쪽 videos는 이름이 바뀔 수 없다. -->
      <video-list :videos="videos"></video-list>
      <!-- [props] :videos="videos" => :자식컴포넌트에_작성한_props의_이름="보낼_데이터_변수명" -->
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import SearchBar from './components/SearchBar'
  import VideoList from './components/VideoList'
  // process.env.는 vue 공식 문서에 나와 있음
  const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
  const API_URL = 'https://www.googleapis.com/youtube/v3/search'
  
  export default {
    name: 'App',
    components: {
      SearchBar,
      VideoList,
    },
    data() {
      return {
      // [주의!!] Vue component에서는 return을 할 때만 이름공간을 분리해줘야 한다!! - return {} 으로 작성
      // return이 Object를 리턴하는 함수이다!!
        videos: [],
      }
    },
    methods: {
      onInputChange(inputValue) { 
        axios.get(API_URL, {
          params: {
            key: API_KEY,
            type: 'video',
            part: 'snippet',
            q: inputValue,
          }
        })
        .then(response => {
          this.videos = response.data.items
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  ```

- 받는 쪽(VideoList.vue)에서 props 명시

  ```vue
  <template>
    <ul>
      VideoList
      {{ videos.length }}
    </ul>
  </template>
  
  <script>
    export default {
      name: 'VideoList',
      props: {
        videos: {
          type: Array,
          required: true,
        }
      }
    }
  </script>
  ```

<br>

### 4.4 VideoListItem 컴포넌트 구성

> `VideoList.vue`
>
> ```vue
> <template>
>   <ul>
>    <!-- 여기선 etag가 hash 값이라 item간 서로 안 겹치므로 key로 사용 -->
>    <!-- :video="video" : 자식쪽으로 넘겨줄 때도 v-bind 사용 -->
>      <video-list-item v-for="video in videos" :key="video.etag" :video="video"></video-list-item>
>   </ul>
> </template>
> 
> <script>
> import VideoListItem from './VideoListItem' // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이므로 VideoListItem 컴포넌트 등록은 여기서 한다!
> export default {
>    name: 'VideoList',
>    components: {
>        VideoListItem,
>    },
>    props: {
>        videos: {
>          type: Array,
>          required: true,
>        }
>    }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `VideoListItem.vue`
>
> ```vue
> <template>
>   <li>
>      {{ video.snippet.title }}
>   </li>
> </template>
> 
> <script>
> export default {
>    name: 'VideoListItem', // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이다.
>    props: {
>        video: {
>          type: Object,
>          requried: true,
>        }
>    }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

![05](https://user-images.githubusercontent.com/52685250/68561953-017a9f00-048b-11ea-92d0-0d3a9b4b878c.JPG)

---

:art: <b>Bootstrap으로 디자인 정리</b>

- `public` > `index.html` 에 다음 구문(BootstrapCDN - CSS only) 추가

  ```html
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  ```

- `input` 태그에만 bootstrap 스타일 추가 => `SearchBar.vue`에만 style 적용하기 (`scoped`)

  ```vue
  <style scoped> /* scoped : 이 vue 에만 아래 style 적용 */
    input {
      width: 75%;
    }
  
    div {
      text-align: center;
      margin: 20px;
    }
  </style>
  ```

- `VideoList.vue` : class 추가

  ```vue
  <template>
    <ul class="list-group">
      <video-list-item v-for="video in videos" :key="video.etag" :video="video"></video-list-item>
    </ul>
  </template>
  ```

- `VideoListItem.vue` : class 추가

  ```vue
  <template>
    <li class="list-group-item">
      {{ video.snippet.title }}
    </li>
  </template>
  ```

![0001](https://user-images.githubusercontent.com/52685250/68562210-055af100-048c-11ea-99b2-b91b5c924b1c.JPG)

---

<br>

### 4.5 Thumbnail 이미지 출력

- Thumbnail 위치 : `video` > `snippet` > `thumbnails` > `default` > `url`

> `VideoListItem.vue`
>
> ```vue
> <template>
>   <li class="list-group-item">
>      <img :src="video.snippet.thumbnails.default.url">
>      {{ video.snippet.title }}
>   </li>
> </template>
> ```

- 하지만 `video.snippet.thumbnails.default.url`와 같이 길게 쓰는 것은 좋지 않아 미리 캐싱해두고 가져다가 쓰는 `computed`를 사용하자

> `VideoListItem.vue`
>
> ```vue
> <template>
>   <li class="list-group-item">
>      <!-- 여기서 computed는 ()를 쓰지 않고 watched는 ()를 써야 한다! -->
>      <img :src="thumbnailUrl" alt="img">
>      <div class="media-body"> <!-- 글자가 어긋나게 삐져나가지 않도록 div 태그로 감싼다. -->
>          {{ video.snippet.title }}
>      </div>
>   </li>
> </template>
> 
> <script>
> export default {
>    name: 'VideoListItem', // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이다.
>    props: {
>        video: {
>          type: Object,
>          requried: true,
>        }
>    },
>    computed: {
>        thumbnailUrl() {
>          return this.video.snippet.thumbnails.default.url // 이 곳에 미리 캐싱되어 있음
>        }
>    }
> }
> </script>
> 
> <style scoped>
>   li {
>      display: flex;
>      cursor: pointer;
>   }
> 
>   li:hover {
>      background-color: #eee; /* 마우스를 올렸을 때 회색 나게 한다. */
>   }
> </style>
> ```

![005](https://user-images.githubusercontent.com/52685250/68562720-39371600-048e-11ea-8c4e-adfb4a8c61d3.JPG)

<br>

### 4.6 VideoDetail 컴포넌트 구성(조금 어려움)

- 데이터 전달 과정(컴포넌트 간의 관계를 잘 생각하자!)
  - `VideoListItem.vue` 에서 `VideoList.vue`로 데이터를 올리고,  다시 이를 `App.vue`로 올린다.
  - 그리고 `VideoDetail.vue`로 데이터를 내려 보내준다.

> `VideoListItem.vue`
>
> - `v-html` 속성을 이용하면 특수문자 깨짐 현상을 막을 수 있다.
>
> ```vue
> <template>
>   <li @click="onVideoSelect" class="list-group-item">
>      <img :src="thumbnailUrl" alt="img"> <!-- 여기서 computed는 ()를 쓰지 않고 watched는 ()를 써야 한다! -->
>      <div class="media-body" v-html="video.snippet.title"> <!-- 글자가 어긋나게 삐져나가지 않도록 div 태그로 감싼다. -->
>      </div>
>   </li>
> </template>
> 
> <script>
> export default {
>    name: 'VideoListItem',
>    props: {
>        video: {
>          type: Object,
>          requried: true,
>        }
>    },
>    methods: {
>        onVideoSelect() {
>          this.$emit('videoSelect', this.video) // VideoList로 올려 보내므로 emit 추가
>        }
>    },
>    computed: {
>        thumbnailUrl() {
>          return this.video.snippet.thumbnails.default.url 
>        }
>    }
> }
> </script>
> ```

> `VideoList.vue`
>
> ```vue
> <template>
>   <ul class="list-group">
>      <video-list-item
>          v-for="video in videos"
>          :key="video.etag"
>          :video="video"
>          @videoSelect="onVideoSelect">
>      <!-- VideoListItem.vue의 onVideoSelect와 다른 onVideoSelect 이다. -->
>      </video-list-item>
>   </ul>
> </template>
> 
> <script>
> import VideoListItem from './VideoListItem'
> // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이므로 VideoListItem 컴포넌트 등록은 여기서 한다!
> export default {
>    name: 'VideoList',
>    components: {
>        VideoListItem,
>    },
>    methods: {
>        onVideoSelect(video) {
>          this.$emit('videoSelect', video) // App으로 올려 보내므로 emit 추가 
>        }
>    },
>    props: {
>        videos: {
>          type: Array,
>          required: true,
>        }
>    }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `App.vue`
>
> ```vue
> <template>
>   <div id="app">
>      <search-bar @inputChange="onInputChange"></search-bar>
>      <!-- selecteVideo를 VideoDetail로 보내주기 위해 바인딩해준다. -->
>      <video-detail :video="selectedVideo"></video-detail>
>      <video-list @videoSelect="onVideoSelect" :videos="videos"></video-list>
>   </div>
> </template>
> 
> <script>
> import axios from 'axios'
> import SearchBar from './components/SearchBar'
> import VideoList from './components/VideoList'
> import VideoDetail from './components/VideoDetail'
> const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
> const API_URL = 'https://www.googleapis.com/youtube/v3/search'
> 
> export default {
>   name: 'App',
>   components: {
>      SearchBar, 
>      VideoList,
>      VideoDetail,
>   },
>   data() {
>      return {
>          videos: [],
>          // 올라온 video를 넣어줘야 하므로 새로운 변수 선언
>          // 선택 안 된 기본상태가 필요하므로 null 선언
>          selectedVideo: null,
>      }
>   },
>   methods: {
>      onVideoSelect(video) { // emit으로 받은 video를 selectedVideo에 할당 후 selectedVideo를 하위 컴포넌트인 VideoDetail.vue로 넘겨준다.
>          this.selectedVideo = video
>      },
>      onInputChange(inputValue) {
>          axios.get(API_URL, {
>            params: {
>              key: API_KEY,
>              type: 'video',
>              part: 'snippet',
>              q: inputValue,
>            }
>          })
>          .then(response => {
>            this.videos = response.data.items
>          })
>          .catch(err => {
>            console.log(err)
>          })
>      }
>   }
> }
> </script>
> ```

> `VideoDetail.vue`
>
> ```vue
> <template>
>   <!-- console에 출력되는 error를 처리하기 위해 video에 데이터가 있을 때만 출력! -->
>   <div v-if="video" class="col-lg-8">
>      <div class="embed-responsive embed-responsive-16by9">
>          <iframe :src="videoUrl" frameborder="0" class="embed-responsive-item"></iframe>
>      </div>
>      <div class="details">
>        <!--
>          특수문자 인코딩 깨지는 것을 막기 위해
>          h4 태그 안에 작성했던 <h4>{{ video.snippet.title }}</h4>을
>          v-html을 이용해 <h4 v-html="video.snippet.title"></h4>로 작성한다.
>        -->
>          <h4 v-html="video.snippet.title"></h4>
>          <p>{{ video.snippet.description }}</p>
>      </div>
>   </div>
> </template>
> 
> <script>
> export default {
>    name: 'VideoDetail',
>    props: { // App.vue에서 데이터를 받으므로 props 선언
>        video: {
>          type: Object,
>        }
>    }
> }
> </script>
> 
> <style scoped>
>   .details {
>      margin-top: 10px;
>      padding: 10px;
>      border: 1px solid #ddd;
>      border-radius: 4px;
>   }
> </style>
> ```

- Youtube의 iframe을 이용해 동영상 띄우기 <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank">(참고 문서)</a>

> `VideoDetail.vue`
>
> ```vue
> <template>
>   <div v-if="video">
>      <div> <!-- iframe 태그를 div 태그로 감싸 추가 -->
>          <iframe :src="videoUrl" frameborder="0"></iframe>
>      </div>
>      ...
>   </div>
> </template>
> 
> <script>
> export default {
>    ...
>    computed: { // computed 구문 추가
>        videoUrl() {
>          const videoId = this.video.id.videoId
>          return `http://www.youtube.com/embed/${videoId}`
>        }
>    }
> }
> </script>
> ```

![0005](https://user-images.githubusercontent.com/52685250/68564897-3ee42a00-0495-11ea-8f6d-05efac1a4710.JPG)

---

:art: <b>반응형 웹페이지로 다듬기</b>

> `VideoDetail.vue`
>
> ```vue
> <template>
>   <div v-if="video" class="col-lg-8"> <!-- console에 출력되는 error를 처리하기 위해 video에 데이터가 있을 때만 출력! -->
>      <div class="embed-responsive embed-responsive-16by9">
>          <iframe :src="videoUrl" frameborder="0" class="embed-responsive-item"></iframe>
>      </div>
>     ...
> ```

> `App.vue`
>
> ```vue
> <template>
>   <div id="app">
>      <search-bar @inputChange="onInputChange"></search-bar>
>      <div class="row">
>          <video-detail :video="selectedVideo"></video-detail>
>          <video-list @videoSelect="onVideoSelect" :videos="videos"></video-list>
>      </div>
>   </div>
> </template>
> ```

> `VideoList.vue`
>
> ```vue
> <template>
>   <ul class="col-lg-4 list-group">
>    ..    
>   </ul>
> </template>
> ```

:checkered_flag: <b>최종 결과 화면</b>

![6045](https://user-images.githubusercontent.com/52685250/68565172-07c24880-0496-11ea-911f-42d8808d55e0.JPG)

---

:crown: <b>Youtube Project 전체 흐름도</b>

- 아래 흐름도에서 `emmiti`를 `emit`으로 수정

<img src="https://user-images.githubusercontent.com/52685250/68567126-91284980-049b-11ea-94da-5653a82a608c.JPG" width="700px">

---

:triangular_flag_on_post: 참고로 이번 Youtube 프로젝트에서는`watched`는 사용하지 않고 `computed` 만으로 작성했는데 실제로 프로젝트 만들 때 가급적이면 `watched` 보다는 `computed`를 사용하는 것이 좋다. 그렇다고 아예 `watched`가 안 쓰이는 것은 아니다.