# :notebook_with_decorative_cover: 06_Javascript - Day04

<br>

## 4. 11월04일(4일차) - `04_django` > `07_django_axios`

---

:heavy_plus_sign: `좋아요` 기능 비동기적으로 구현하기(axios 적용) 

---

<br>

### :heavy_check_mark: `XMLHttpRequest`(XHR)

- 브라우저는 `XMLHttpRequest` 객체를 이용하여 Ajax 요청을 생성하고 전송
- 서버가 브라우저의 요청에 대해 응답을 반환하면 같은 XHR 객체가 그 결과를 처리
- (참고) 단, IE 5, 6 에서는 `ActiveXobject` 를 사용해야 한다.

<br>

### :heavy_check_mark: 기능 구현하기(1) - `좋아요 버튼 색깔 비동기적으로 바뀌게 구현`

- `base.html`에서 `fontawesome` 구문 아래에 구문 추가

  ```html
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  ```

- `_article.html`에서 아래 구문 삭제

  a 태그 안에 있던 if문은 그대로 유지한다.

  ```django
  <a href="{% url 'articles:like' article.pk %}">
  </a>
  ```

- `_article.html`

  `querySelector`를 위해 class에 `like-button` 추가

  ```django
  <i class="fas fa-heart like-button" style="color: crimson;"></i>
  <i class="fas fa-heart like-button" style="color: black;"></i>
  ```

- `index.html`

  가장 맨 아래 `{% endfor %}` 아래에 script 구문 추가

  (참고로 django 안에서 javascript 구문을 작성하기 때문에 자동완성이 안 된다. 그러므로 천천히 작성하자!)

  ```django
  <script>
    // 1. 각 게시글별로 좋아요 버튼이 있으니 모두 선택해야 한다.
    const likebuttons = document.querySelectorAll('.like-button')
  
    // 2. forEach를 사용해서 각각의 좋아요 버튼을 클릭
    likebuttons.forEach(button => {
      button.addEventListener('click', function (event) {
        console.log(event)
        // 항상 처음에는 console로 function의 인자를 찍어보고 어디로 들어가야 하는지 반드시 파악하자
      })
    })
  </script>
  ```

- 로그인 후 좋아요 버튼을 누르면 chrome console 창에서 이벤트 객체가 발생한다.

  그 중 target의 dataset을 볼 수 있다.

  ![01](https://user-images.githubusercontent.com/52685250/68095729-416fde00-feef-11e9-8729-c3562268dc8f.JPG)

- 어떤 게시글의 좋아요인지 알기 위해 `_article.html`에 `data-id` 속성을 추가한다.

  <b>`data-id`를 통해 각 객체에 접근할 수 있다.</b>

  구별할 수 있는 `article.pk`를 빌려와 사용한다.

  ```django
  <i class="fas fa-heart like-button" style="color: crimson;" data-id="{{ article.pk }}"></i>
  <i class="fas fa-heart like-button" style="color: black;" data-id="{{ article.pk }}"></i>
  ```

- `dataset` 을 통해 개별적인 객체에 접근이 가능하다.

  콘솔창에서 id가 새로 생성됨을 확인할 수 있다.

  ```
  dataset: DOMStringMap {id: "4"}
  ```

- `views.py` > `like` view 함수

  기존 redirect 로 인해 `index.html` 로 페이지가 로딩되는 것이 아닌 JSON 형태로 응답결과를 반환 받기로 변경한다.

  JSON 데이터에 liked 변수를 만들어서 template 에서 좋아요를 취소할지 추가할지를 판단할 수 있도록 한다.

  그래서 True False 값을 통해 좋아요 버튼의 style 값(여기서는 버튼의 색깔)을 변경한다.

  ```python
  return redirect('articles:index') # 구문 삭제
  
  # 앞으로는 json 파일에 담아서 같이 보낸다.
  from django.http import JsonResponse # 구문 추가
  ```

  ```python
  # 수정된 like view 함수
  
  @login_required
  def like(request, article_pk):
      article = get_object_or_404(Article, pk=article_pk)
      if article.like_users.filter(pk=request.user.pk).exists():
          article.like_users.remove(request.user)
          liked = False
      else:
          article.like_users.add(request.user)
          liked = True
      context = {'liked': liked,}
      return JsonResponse(context)
  ```

- 다시 console 창을 찍어보면 data 안에 liked가 생겼음을 확인할 수 있다.

  ![02](https://user-images.githubusercontent.com/52685250/68096007-40d84700-fef1-11e9-9c85-1646ba3bce05.JPG)

- 좋아요 색깔을 변경하기 위해 `console.log(event)`로 다시 확인한다.

  `event` > `target` > `style` > `color`에 색깔 정보가 있다.

- 지금까지의 `index.html` script 코드 상황

  좋아요 버튼 누를 때마다 버튼의 색깔만 바뀌고 좋아요 개수는 아직 변하지 않는다.

  ```html
  <script>
    // 1. 각 게시글별로 좋아요 버튼이 있으니 모두 선택해야 한다.
    const likebuttons = document.querySelectorAll('.like-button')
  
    // 2. forEach를 사용해서 각각의 좋아요 버튼을 클릭
    likebuttons.forEach(button => {
      button.addEventListener('click', function (event) {
        // 항상 처음에는 console로 function의 인자를 찍어보고 어디로 들어가야 하는지 반드시 파악하자
        // console.log(event)
  
        // event.target.dataset.id 의 value는 data-id 값이 들어 있다.
        const articleId = event.target.dataset.id // 이와 같이 사용하기 위해 console로 찍어서 경로를 확인해야 한다!
        axios.get(`/articles/${articleId}/like/`) // 해당 상세 게시글의 좋아요 요청을 보낸다.(url주소는 urls.py 참고)
          .then(response => {
            // console.log(response) // 반드시 console로 먼저 확인
            if (response.data.liked) {
              // 좋아요 색깔을 빨갛게
              event.target.style.color = 'crimson'
            } else {
              // 좋아요 색깔을 까맣게
              event.target.style.color = 'black'
            }
          })
          .catch(error => console.log(error)) // 반드시 console로 먼저 확인)
      })
    })
  </script>
  ```

<br>

### :heavy_check_mark: 기능 구현하기(2) - `좋아요 개수도 함께 출력` 

- `like` view 함수의 `context` 안에 `'count': article.like_users.count(),` 추가

- `_article.html`에서 구문 수정

  span 태그로 숫자 부분만 감싸고 id 속성을 추가한다.

  각각이 다른 id 값을 가져야 하므로 id 작성시 article.pk 이용

  ```django
  <b>{{ article.like_users.all|length }}</b>명이 이 글을 좋아합니다. <!-- before -->
  <b><span id="like-count-{{ article.pk }}">{{ article.like_users.all|length }}</span></b>명이 이 글을 좋아합니다. <!-- after -->
  ```

- `index.html`

  .then 구문 안에 다음과 같은 구문 추가

  id 속성에 접근하므로 `.querySelector` 안에 작성시 #을 꼭 붙여준다.

  ```javascript
  document.querySelector(`#like-count-${articleId}`).innerText = response.data.count
  ```

- `index.html` - `post` 방식으로 보내기

  `axios.get(~)`을 `axios.post(~)`로 바꾸면 403 error(forbidden)가 발생한다.

  ```javascript
  axios.get(`/articles/${articleId}/like/`) // before
  axios.post(`/articles/${articleId}/like/`) // after
  ```

  이를 해결하기 위해 쿠키에 csrf를 담아서 보내줘야 한다. <a href="https://docs.djangoproject.com/en/2.2/ref/csrf/#setting-the-token-on-the-ajax-request" target="_blank">(공식 문서)</a>

  ```javascript
  // axios.post(~) 이전에 아래 두 줄 추가
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  ```

- (추가사항)요청이 ajax 요청일 때만 받아들이게 하기

  ```python
  # views.py
  
  from django.http import JsonResponse, HttpResponseBadRequest
  
  @login_required
  def like(request, article_pk):
      if request.is_ajax(): # if문으로 분기
          article = get_object_or_404(Article, pk=article_pk)
          if article.like_users.filter(pk=request.user.pk).exists():
              article.like_users.remove(request.user)
              liked = False
          else:
              article.like_users.add(request.user)
              liked = True
          context = {'liked': liked, 'count': article.like_users.count(),}
          return JsonResponse(context)
      else:
          return HttpResponseBadRequest()
  ```

- 하지만 현재 상황은 django가 ajax 요청인지 아직 모른다.

  django측에 ajax 요청임을 알려줘야 한다.

  axios 공식 문서의 `Request Config`에서 `headers: {'X-Requested-With': 'XMLHttpRequest'},` 구문을 찾아 `index.html`에 붙여넣어야 한다. <a href="https://github.com/axios/axios#request-config" target="_blank">(공식 문서)</a>

  추가로 `.headers.common`도 붙여줘야 한다. <a href="https://github.com/axios/axios#global-axios-defaults" target="_blank">(공식 문서)</a>

  ```javascript
  const articleId = event.target.dataset.id
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest' // ajax 요청임을 알려주는 구문 (이거 추가)
  axios.defaults.xsrfCookieName = 'csrftoken' // POST 요청임을 알려주는 구문1 (이거 추가)
  axios.defaults.xsrfHeaderName = 'X-CSRFToken' // POST 요청임을 알려주는 구문2 (이거 추가)
  axios.post(`/articles/${articleId}/like/`)
  ...
  ```

