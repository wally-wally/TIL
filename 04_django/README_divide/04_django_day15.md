# :notebook_with_decorative_cover: 04_django - Day15

<br>

## 15. 10월28일(15일차) - `REST API` 

### 15.1 REST, API <a href="https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html" target="_blank">(참고하면 좋은 페이지)</a>

#### (1) REST, API

- `REST(Repersentational State Transfer)` = `자원(URI)` + `행위(HTTP Method)` + `표현(Representations)`
  - 각 요청이 어떠한 동작&정보를 위한 것인지 <b><u>요청 형식 자체(주소)로 파악이 가능</u></b>한 것
  - 자원의 표현에 의한 상태 전달
  - `HTTP URI`를 통해 자원을 명시하고, `HTTP Method`를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것
- `API(Application Programming Interface)`
  - 데이터와 기능의 집합을 제공하여 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환 가능하도록 하는 것
- `REST API`
  - REST 기반으로 서비스 API를 구현한 것
  - 최근 Open API, 마이크로 서비스 등을 제공하는 업체 대부분은 REST API를 제공한다.

<br>

#### (2) REST 특징

- `Uniform` : Uniform Interface, 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 활용
- `Stateless(무상태성)` : 무상태성 성격을 가지고 있으며, 세션 정보나 쿠키 정보를 별도로 저장하지 않고 관리하여 단순하게 요청만을 처리
- `Cacheable(캐시가능)` : HTTP의 캐시 기능이 적용 가능함
- `Self-descriptiveness(자체표현구조)`
- `Client-Server 구조` : 클라이언트 서버에서 개발할 내용이 명확하고 의존성이 줄어듬
- `계층형 구조` : REST 서버는 다중 계층으로 구성될 수 있음

<br>

### 15.2 Django REST Framework <a href="https://www.django-rest-framework.org/" target="_blank">(공식 홈페이지)</a>

#### (1) install process

- project명 : `api`, app명 : `musics`

  ```bash
  pip install djangorestframework
  ```

  ```python
  INSTALLED_APPS = [
      ...
      'rest_framework', # settings.py의 INSTALLED_APPS에 추가
  ]
  ```

- modeling - `models.py`

  Artist : Music = 1 : N, Music : Comment = 1 : N 관계이다.

  ```python
  from django.db import models
  
  class Artist(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return self.name
  
  
  class Music(models.Model):
      artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
      title = models.TextField()
  
      def __str__(self):
          return self.title
  
  
  class Comment(models.Model):
      music = models.ForeignKey(Music, on_delete=models.CASCADE)
      content = models.TextField()
  
      def __str__(self):
          return self.content
  ```

- migrations 과정

  ```bash
  python manage.py makemigrations
  ```

  ```bash
  python manage.py migrate
  ```

- superuser 생성 후 `admin.py` 편집

  ```python
  from django.contrib import admin
  from .models import Artist, Music, Comment
  
  admin.site.register(Artist)
  admin.site.register(Music)
  admin.site.register(Comment)
  ```

- admin page에 들어가서 artist 2개, music는 artist당 2개, comment는 music당 2개씩 미리 dummy data를 생성하자.

<br>

#### (2) dump data <a href="https://docs.djangoproject.com/ko/2.2/ref/django-admin/#dumpdata" target="_blank">(공식 문서)</a>

- 공식 문서에는 `django-admin` commend로 입력해야하는데 각종 문제점이 있기 때문에 `python manage.py` commend로 사용한다.

- dump data 생성

  ```bash
  python manage.py dumpdata musics > dummy.json # 하지만 현재 상태는 데이터가 한 줄로 나와 있어 보기 불편하다.
  ```

  ```bash
  python manage.py dumpdata --indent 2 musics > dummy.json
  # 협업할 때 migrate하고 이 dump data를 받아 DB에 load해서 사용하면 된다.
  ```

- db 와 manage.py 가 위치한 동일선상에 `dummy.json` 파일이 생성된다. 

<br>

#### (3) load data <a href="https://docs.djangoproject.com/ko/2.2/ref/django-admin/#loaddata" target="_blank">(공식 문서)</a>

##### ① `fixture`

- 데이터베이스의 직렬화(serialized)된 내용을 포함하는 파일 모음이다.

- 각 fixture는 고유한 이름을 가지며, 이를 구성하는 파일은 여러 응용 프로그램에서 여러 디렉토리에 배포될 수 있다.

- [주의사항] django는 `loaddata` 시 설치된 모든 app 에서 `fixtures` 라고 하는 이름의 폴더를 찾는다.

  파일 구조 예시는 다음과 같다.

  ```python
  musics/ # app
  	fixtures/
  		musics/ # namespace 적용
  			dummy.json
  ```

<br>

##### ② load data하기

- `loaddata`를 위해 `db.sqlite3` 지우고 다시 `migrate` 과정만 한다. DB를 지웠기 때문에 createsuperuser를 다시한다.

- 위와 같은 파일구조가 되도록 폴더를 생성하고 `dummy.json`을 옮겨준다.

- load data하기

  ```bash
  python manage.py loaddata musics/dummy.json
  ```

- admin 페이지에 들어가면 동일한 데이터가 들어가 있음을 확인할 수 있다.

<br>

### 15.3 API 만들기

#### (1) Music 관련 API 만들기

> `api` project의 `urls.py`
>
> - 아래와 같이 URL 을 설정하는 이유는 모든 모델들에 대한 정보를 표현할 것이기 때문에, `musics/` 로 시작하지 않는다.
> - 일반적인 API들은 URL을 이렇게 버전을 명시해서 작성한다.
>
> ```python
> from django.contrib import admin
> from django.urls import path, include
> 
> urlpatterns = [
>        path('api/v1/', include('musics.urls')),
>        path('admin/', admin.site.urls),
> ]
> ```

> `serializers.py`
>
> - serialize할 수 있는 python 파일 생성(사용자가 보기 편한 데이터를 만들어 주는 역할)
> - 사용자에게 보기 편한 <b>응답이 아니라 데이터만 주는 것</b>으로, json 형식을 활용해서 반환한다. 
>
> ```python
> from rest_framework import serializers
> from .models import Music
> 
> class MusicSerializer(serializers.ModelSerializer):
>        class Meta:
>            model = Music
>            fields = ('id', 'title', 'artist_id')
> ```

> view 작성 <a href="https://www.django-rest-framework.org/api-guide/views/#function-based-views">(공식 문서)</a>
>
> ```python
> from django.shortcuts import render, get_object_or_404
> from rest_framework.decorators import api_view
> from rest_framework.response import Response
> from .serializers import MusicSerializer
> from .models import Music
> 
> # 먼저 요청 들어온 것은 다음과 같이 어떠한 HTTP method 대해서 처리할 것인지 정의한다.
> @api_view(['GET'])
> def music_list(request):
>        musics = Music.objects.all()
>        serializer = MusicSerializer(musics, many=True)
>        # 단일 객체가 아닌 여러 개를 가져올 경우 many=True를 작성
>        # Serializer는 musics 라고 하는 queryset을 json 타입으로 바꿔준다.
>        return Response(serializer.data)
> 
> 
> @api_view(['GET']) # GET만 허용할 경우
> def music_detail(request, music_pk):
>        music = get_object_or_404(Music, pk=music_pk)
>        serializer = MusicSerializer(music) # 단일 객체이므로 music만 작성
>        return Response(serializer.data)
> ```

> `urls.py`
>
> ```python
> from django.urls import path
> from . import views
> 
> urlpatterns = [
>        path('musics/', views.music_list),
>        path('musics/<int:music_pk>/', views.music_detail),
> ]
> ```

:checkered_flag: **API result screenshot**

- 전체를 조회할 때는 `list`로 출력된다!(`many=True`가 있기 때문에)

![33](https://user-images.githubusercontent.com/52685250/67647760-bd5da980-f976-11e9-9de7-a3a51901d533.JPG)

- 하나를 조회할 때는 `dictionary`로 출력된다.

![44](https://user-images.githubusercontent.com/52685250/67647960-7d4af680-f977-11e9-865e-da9e5825032c.JPG)

<br>

#### (2) API Document(명세서) 작성 <a href=" https://github.com/axnsan12/drf-yasg" target="_blank">(drf-yasg 문서)</a>

- install process

  ```bash
  pip install -U drf-yasg
  ```

  ```python
  INSTALLED_APPS = [
     ...
     'drf_yasg',
     ...
  ]
  ```

  `musics` app의 `urls.py`

  ```python
  from rest_framework import permissions
  from drf_yasg.views import get_schema_view
  from drf_yasg import openapi
  from django.urls import path
  from . import views
  
  schema_view = get_schema_view(
     openapi.Info( # 이 부분은 custom 가능
        title="Music API", # title은 필수 인자
        default_version='v1', # default_version은 필수 인자
        # 아래 주석인 선택 인자임
        # description="음악 관련 API 서비스 입니다.",
        # terms_of_service="https://www.google.com/policies/terms/",
        # contact=openapi.Contact(email="wallys0213@gmail.com"),
        # license=openapi.License(name="SSAFY License"),
     ),
     public=True,
     permission_classes=(permissions.AllowAny,),
  )
  
  urlpatterns = [
      path('musics/', views.music_list),
      path('musics/<int:music_pk>/', views.music_detail),
      # python 1 버전(github페이지에는 정규표현식으로 나와있다)이 아닌 2 버전에 맞게 url 주소 작성
      path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
      path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
  ]
  ```

:checkered_flag: **API result screenshot**

- 2가지 종류로 document를 지원한다.
  - `/docs/` : ReDoc 스타일
  - `/swagger/` : Swagger 스타일

![01](https://user-images.githubusercontent.com/52685250/67648517-407fff00-f979-11e9-9489-9bf4cac81bf0.JPG)
![02](https://user-images.githubusercontent.com/52685250/67648518-407fff00-f979-11e9-91bd-a281c279aeb7.JPG)

<br>

#### (3) Artist 관련 API 만들기

:heavy_check_mark: **Artist 관련 전체 API 만들기**

> `serializers.py`
>
> ```python
> class ArtistSerializer(serializers.ModelSerializer):
>        class Meta:
>            model = Artist
>            fields = ('id', 'name')
> ```

> `views.py`
>
> ```python
> @api_view(['GET'])
> def artist_list(request):
>        artists = Artist.objects.all()
>        serializer = ArtistSerializer(artists, many=True)
>        return Response(serializer.data)
> ```

> `urls.py`
>
> - `urlpatterns`에 다음 구문 추가
>
> ```python
> path('artists/', views.artist_list),
> ```

:checkered_flag: **API result screenshot**

- 아래 사진과 같이 좌측 메뉴에 `artists`가 새로 생성됨을 확인할 수 있다.

![03](https://user-images.githubusercontent.com/52685250/67648755-f77c7a80-f979-11e9-850b-f0ae21fcd633.JPG)

:heavy_check_mark: **특정 Artist 정보만 가져오는 API 만들기**

> `views.py`
>
> ```python
> def artist_detail(request, artist_pk):
>        artist = get_object_or_404(Artist, pk=artist_pk)
>        serializer = ArtistSerializer(artist)
>        return Response(serializer.data)
> ```

> `urls.py`
>
> ```python
> path('artists/<int:artist_pk>/', views.artist_detail), # 구문 추가
> ```

<br>

#### (4) 1 : N 관계 적용된 API 만들기

- (3)번 까지의 현재 상태는 artist 가 가지고 있는 music 들이 출력되지 않는다.
- music 에는 artist 정보가 있지만, artist 에는 music 정보가 없기 때문이다. (N 에서만 1 의 정보를 가지고 있기 때문)
- 1:N 관계에서 실제 데이터베이스에는 N인 music 에만 artist 의 외래 키 값이 저장되어 있을 뿐이기 때문이다.
- DetailSerializer 를 작정해보자. Serializer는 데이터의 형식을 지정해주는 것과 동일한데, 기존의 Artist 오브젝트에 추가적인 내용이 필요하기 때문이다.

> `serializers.py`
>
> ```python
> class ArtistDetailSerializer(ArtistSerializer):
>        music_set = MusicSerializer(many=True) # 음악들에 해당하는 필드명
> 
>        class Meta(ArtistSerializer.Meta): # model은 굳이 쓸 필요가 없다(이미 상속 받고 있음)
>            fields = ArtistSerializer.Meta.fields + ('music_set',)
> ```

> `views.py`
>
> ```python
> @api_view(['GET'])
> def artist_detail(request, artist_pk):
>        artist = get_object_or_404(Artist, pk=artist_pk)
>        # ArtistSerailizer => ArtistDetailSerializer로 수정
>        serializer = ArtistDetailSerializer(artist)
>        return Response(serializer.data)
> ```

- `ArtistDetailSerializer`의 `music_set` 이름 변경하기

  - [방법1] - `models.py`에서 (대신 이 방법은 작성 후 마이그레이션 작업이 필요함)

    ```python
    class Music(models.Model):
        artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='musics')
        title = models.TextField()
    
        def __str__(self):
            return self.title
    ```

  - [방법2] - `serializers.py`에서

    ```python
    class ArtistDetailSerializer(ArtistSerializer):
        musics = MusicSerializer(source='music_set', many=True)
    
        class Meta(ArtistSerializer.Meta):
            fields = ArtistSerializer.Meta.fields + ('musics',)
    ```

<br>

#### (5) `Create Comment`

> `serializers.py`
>
> ```python
> class CommentSerializer(serializers.ModelSerializer):
>        class Meta:
>            model = Comment
>            fields = ('id', 'content', 'music_id')
>         
> class MusicDetailSerializer(MusicSerializer):
>        comments = CommentSerializer(source='comment_set', many=True)
>        class Meta(MusicSerializer.Meta):
>            fields = MusicSerializer.Meta.fields + ('comments',)
> ```

> `views.py`
>
> -  `raise_exception=True` 는 검증에 실패하면 400 Bad Request 오류를 발생시킨다. 
>
> ```python
> @api_view(['POST']) # 글이 작성되는 것이므로 POST이다.
> def comments_create(request, music_pk):
>        serializer = CommentSerializer(data=request.data)
>        if serializer.is_valid(raise_exception=True):
>            serializer.save(music_id=music_pk)
>        return Response(serializer.data)
> ```
>
> ```python
> # music_detail view의 MusicSerializer를 MusicDetailSerializer로 변경
> serializer = MusicDetailSerializer(music)
> ```

> `urls.py`
>
> ```python
> path('musics/<int:music_pk>/comments/', views.comments_create), # 구문 추가
> ```

:checkered_flag: **API result screenshot**

- 아래 사진과 같이 각 음악에 대한 댓글들이 출력됨을 볼 수 있다.

  ![04](https://user-images.githubusercontent.com/52685250/67653361-695dbf80-f98c-11e9-87b0-6d84804a4c6b.JPG)

- POST  방식으로 보내기 위해 POSTMAN을 설치하고 POST방식으로 댓글을 작성하여 보내준다.

  URL 주소 입력 시 1, 2, 3, ...와 같이 매번 숫자를 입력하는 대신에 `:`을 붙여 `:music_pk`를 사용해 보낼 수 있다.

  <b>POST 요청은 url 마지막에 반드시 `/`가 있어야 한다.</b>

  `Body`에서 KEY에 `content`, VALUE에 작성할 댓글 내용을 쓴다.

  ![10](https://user-images.githubusercontent.com/52685250/67653895-d2decd80-f98e-11e9-9080-ad244c8fa184.JPG)

  Params의 Path Variables의 VALUE에 숫자를 입력하면 된다.
  
  ![11](https://user-images.githubusercontent.com/52685250/67653896-d3776400-f98e-11e9-8e79-eaa97529fc7b.JPG)
  ![12](https://user-images.githubusercontent.com/52685250/67653897-d3776400-f98e-11e9-966f-af1bb7c62907.JPG)

<br>

#### (6) Update & Delete Comment

> `views.py`
>
> - 같은 주소로 다른(PUT, DELETE) http method 로 요청을 보내서 수정 삭제를 같은 주소로 구현 해보자.
> - 수정은 `PUT`, 삭제는 `DELETE` method를 사용한다.
>
> ```python
> @api_view(['PUT', 'DELETE']) # PUT : 수정, DELETE : 삭제
> def comments_update_and_delete(request, comment_pk):
>        comment = get_object_or_404(Comment, pk=comment_pk)
>        if request.method == 'PUT':
>            serializer = CommentSerializer(data=request.data, instance=comment)
>            if serializer.is_valid(raise_exception=True):
>                serializer.save()
>                return Response({'message': 'Comment has been updated !'})
>        else:
>            comment.delete()
>            return Response({'message': 'Comment has been deleted!'})
> ```

> `urls.py`
>
> ```python
> path('comments/<int:comment_pk>/', views.comments_update_and_delete),
> ```

:checkered_flag: **API result screenshot**

- DELETE 동작

![20](https://user-images.githubusercontent.com/52685250/67654213-20a80580-f990-11e9-9933-8b6dfcace732.JPG)

- PUT 동작

![30](https://user-images.githubusercontent.com/52685250/67654378-b6439500-f990-11e9-864d-adfd7ec92e86.JPG)
![31](https://user-images.githubusercontent.com/52685250/67654379-b6dc2b80-f990-11e9-88e6-9d2aed12d1d0.JPG)

- 만약 view에서 정의하지 않은 방식이 들어올 경우 아래 사진과 같이 허용되지 않는다는 문구가 출력된다.

![789](https://user-images.githubusercontent.com/52685250/67654721-d45dc500-f991-11e9-880c-dc7e9ac429f2.JPG)

<br>

#### (7) Custom API - 추가 데이터 제공하기

> `serializer.py`
>
> - 음악 개수를 의미하는 `musics_count` 라는 완전히 새로운 필드를 만든다.
>
> ```python
> class ArtistDetailSerializer(ArtistSerializer):
>        musics = MusicSerializer(source='music_set', many=True)
>        musics_count = serializers.IntegerField(source='music_set.count')
>        class Meta(ArtistSerializer.Meta):
>            fields = ArtistSerializer.Meta.fields + ('musics', 'musics_count')
> ```

:checkered_flag: <b>API result screenshot</b>

![40](https://user-images.githubusercontent.com/52685250/67654566-4c77bb00-f991-11e9-8ae5-767d3e5a09cb.JPG)