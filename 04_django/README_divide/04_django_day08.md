# :notebook_with_decorative_cover: 04_django - Day08

<br>

## 8. 9월20일(08일차) - `STATIC` / `MEDIA`

### 8.1 static file 정의하기

- 기존 templates 파일 경로 : `app_name/templates/app_name/index.html`
- static 파일 경로 : `app_name/static/app_name/sample.png`
- 아래 사진과 같이 절대 경로를 만들어준다.(`static` > `articles` > `images` > `sea.jpg`)

<img src="https://user-images.githubusercontent.com/52685250/65289788-23405f80-db87-11e9-9737-3ca514a722ab.JPG">

> `index.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %} <!-- 반드시 extends 밑에 작성해야 한다. -->
> 
> {% block content %}
>   <img src="{% static 'articles/images/sea.jpg' %}" alt="sample_img">
> {% endblock %}
> ```

> `settings.py`
>
> - 맨 아래에 아래와 같은 구문 추가하여 커스텀 경로 만들기
> - <b>개발 단계에서 사용하는 실제 정적 파일이 위치한 경로를 지정하는 설정.</b>
> - django는 기본적으로 app 내부의 static 파일을 찾을 수 있는데, 프로젝트 내부의 static 파일을 찾기 위해 아래와 같이 경로를 작성해 줘야 한다.
> - 주로, bootstrap, 외부 템플릿 등을 저장하기 위해 경로를 만듬.
>
> ```python
> STATICFILES_DIRS = [
>      os.path.join(BASE_DIR, 'crud', 'assets'),
> ]
> ```
>
> - [추가사항] `STATIC_URL = '/static/'` 의 의미(기본적으로 `setting.py` 에 작성되어 있음.)
>   - 실제 파일이나 디렉토리가 아니고 URL 로만 존재하는 단위.

> - 아래와 같이 프로젝트 내부에 assets 파일경로를 만든다.(`assets` > `images` > `apple.png`)
>
> <img src="https://user-images.githubusercontent.com/52685250/65290094-a0200900-db88-11e9-9535-67744c7ff995.JPG">
>
> `create.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <!-- assets 이후의 경로를 써야 이미지 파일을 가져올 수 있다. -->
>   <img src="{% static 'images/apple.png' %}" alt="asset_img">
> {% endblock %}
> ```

<br>

### 8.2 image upload <a href="https://docs.djangoproject.com/en/2.2/howto/static-files/">(django 공식 문서)</a>

#### (1) 이미지 파일 업로드하기

- `models.py`에 `image = models.ImageField()` 구문 추가
- 하지만 이미 테이블이 만들어져 있으므로 image 컬럼을 그냥 추가하면 `NOT NULL` 무결성 조건에 위배된다.
- 그러므로 `blank=True`를 추가해야 에러가 발생하지 않는다. (`image = models.ImageField(blank=True)`)

------

:heavy_check_mark: <b>`NULL` vs `blank`</b>

- `NULL`
  - 기본 값 : `False`
  - <b>DB</b>와 관련되어 있다.(Databased-related)
  - 주어진 컬럼이 NULL 값을 가질 것인지를 결정.
- `blank`
  - 기본 값 : `False`
  - <u><b>데이터 유효성</b></u>과 관련되어 있다.(Validation-related)
  - `full_clean()` / `is_valid()` 처럼 유효성 검사 메서드가 호출될 때  유효성 검사에 사용
- `null=True, blank=False` : DB 내에서는 해당필드가 NULL을 사용하지만, 웹 사이트에서는 HTML INPUT 태그에 `required` 속성이 필요하다라는 것을 의미한다.
  - `required` 속성 : 반드시 입력해야 다음 단계로 넘어갈 수 있음을 의미

<br>

:warning: <b>주의사항</b>

- <b>문자열 기반 필드(CharField, TextField...)에는 `null=True` 금지(`blank=True`를 차라리 주자)</b>
- 이렇게 정의하게 되면 문자열 기반 필드는 `데이터 없음`에 대한 값이 2가지가 된다. <b>None과 빈 문자열</b>을 갖게 된다.
- 데이터 없음에 대한 조건이 2가지이면 중복이기 때문에 문자열 기반 필드는 NULL이 아닌 빈 문자열을 사용하는게 django의 convention이다.

```python
class Person(models.Model):
    name = models.TextField(blank=True) # null=True는 금지
    birth = models.DateField(null=True, blank=True)
    # 문자열 기반 필드가 아닌 숫자 필드이기 때문에 가능.
```

------

- 단, 이미지를 쓸 때 `Pillow`를 설치해야 한다.
  - image 필드를 사용할 때 필수로 필요한 패키지이다.
- `models.py`의 내용이 수정되었으므로 `migration` 과정을 다시 해 준다.

<img src="https://user-images.githubusercontent.com/52685250/65290871-efb40400-db8b-11e9-94ec-f320144bff92.JPG">

```sql
CREATE TABLE "new__articles_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "image" varchar(100) NOT NULL, "title" varchar(20) NOT NULL, "content" text NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
INSERT INTO "new__articles_article" ("id", "title", "content", "created_at", "updated_at", "image") SELECT "id", "title", "content", "created_at", "updated_at", '' FROM "articles_article";
DROP TABLE "articles_article";
ALTER TABLE "new__articles_article" RENAME TO "articles_article";
COMMIT;
```

- 위 SQL 구문에서 `"image" varchar(100) NOT NULL`와 같이 실제로는 image의 URL 경로가 저장된다.(max_length default 값 : 100)

> `views.py` > `create 함수`
>
> - `image = request.FILES.get('image')` 추가
> - `article = Article(title=title, content=content, image=image)` 로 수정

> `create.html`
>
> - 파일을 올릴 때는 `enctype="multipart/form-data"`를 반드시 추가해줘야 한다.
> - MDN 공식문서(form - enctype)
>
> <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/form"><img src="https://user-images.githubusercontent.com/52685250/65291516-add88d00-db8e-11e9-8bde-359c805ab56b.JPG"></a>
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <img src="{% static 'images/apple.png' %}" alt="asset_img">
>   <h1 class="text-center">CREATE</h1>
>   <form action="{% url 'articles:create' %}" method="POST" enctype="multipart/form-data">
>      {% csrf_token %}
>      <label for="title">TITLE</label>
>      <input type="text" name="title" id="title" required><br>
>      <label for="content">CONTENT</label>
>      <textarea name="content" id="content" cols="30" rows="5"></textarea><br>
>      <label for="image">IMAGE</label>
>      <!-- 아래 두 줄 추가 -->
>      <!-- accept="image/*"는 시멘틱한 요소로 파일 선택 눌렀을 때 이미지 파일로 바로 연결 할 수 있게 해준다.-->
>      <input type="file" name="image" id="image" accept="image/*">
>      <input type="submit" value="submit">
>   </form>
> {% endblock %}
> ```

```bash
In [1]: image
Out[1]: <InMemoryUploadedFile: sea.jpg (image/jpeg)>

In [2]: dir(image)
Out[2]:
[
 ...
 'charset',
 'chunks',
 'close',
 'closed',
 'content_type',
 'content_type_extra',
 'encoding',
 'field_name',
 'file',
 'fileno',
 'flush',
 'isatty',
 'multiple_chunks',
 'name',
 'newlines',
 ...
]

In [3]: image.field_name
Out[3]: 'image'

In [4]: image.name
Out[4]: 'sea.jpg'

In [5]: article.image
Out[5]: <ImageFieldFile: sea.jpg>

In [6]: article.image.url
Out[6]: 'sea.jpg'
```

- `img src` 쓸 때 `article.image.url`로 반드시 써야 한다.

> `detail.html`
>
> - `<img src="{{ article.image.url }}" alt="{{ article.image }}">` 구문 추가
> - 하지만 이 상태에서는 업로드한 이미지가 나오지 않는다. 미디어 파일 경로를 설정해 줘야 한다.

<br>

#### (2) 미디어 파일 경로 설정

> `settings.py` (맨 아래에 두 줄 추가)
>
> ```python
> # STATIC_URL 과 비슷한 역할을 한다.
> # 업로드 된 파일(stored files)의 URL 주소를 만들어주는 역할.
> # 주의사항 : STATIC_URL 과 값이 달라야 한다.
> MEDIA_URL = '/media/'
> 
> # STATICFILES_DIRS 와 비슷한 역할을 한다.
> # 실제 파일이 업로드 되면 어디에 저장될 지 정하는 실제 경로.
> # 주의사항 : STATICFILES_DIRS 와 값이 달라야 한다.
> # 개발 단계에서 사용하는 경로이므로 실제 배포 단계에서는 다른 경로 설정을 해야 한다.
> MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
> ```

> `crud`의 `urls.py`
>
> - 첫 번째 인자(`settings.MEDIA_URL`) : 어떤 url을 정적으로 추가할지 (Media file url)
> - 두 번째 인자(`document_root=`) : 실제 해당 미디어 파일이 어디에 존재하는지
>
> ```python
> from django.contrib import admin
> from django.urls import path, include
> from django.conf import settings
> from django.conf.urls.static import static
> 
> urlpatterns = [
>      path('jobs/', include('jobs.urls')),
>      path('articles/', include('articles.urls')),
>      path('admin/', admin.site.urls),
> ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
> 
> # urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
> ```

------

:warning: <b>문제점 발생(1)</b>

- 이미지도 edit을 통해 새로운 이미지로 수정할 수는 있지만, text 와는 다르게 수정할 때 이미지를 무조건 업로드하지 않으면 에러가 발생한다. (글만 수정하는 건 안 된다는 의미.)
  - 이미지는 바이너리 데이터(하나의 덩어리)라서 텍스트처럼 <b>일부만 수정하는게 불가능.</b>
  - 그렇기 때문에 html input 태그의 value 속성으로 수정하는 방식이 아니고, 새로운 사진으로 덮어 씌우는 방법을 사용.
  - `<input type="file">` 가 `value=""` 를 지원하지 않는다.
  - 정말 글만 수정하고 싶다면 이전과 똑같은 이미지를 업로드하면 된다.

> `views.py`의 `update` 함수에 `article.image = request.FILES.get('image')` 추가
>
> `update.html` 에 두 줄 추가
>
> ```html
> <label for="image">IMAGE</label>
> <input type="file" name="image" id="image" accept="image/*"><br>
> ```

> `admin.py`
>
> ```python
> class ArticleAdmin(admin.ModelAdmin):
>      list_display = ('pk', 'title', 'content', 'image', 'created_at', 'updated_at',)
> 
>     admin.site.register(Article, ArticleAdmin)
> ```

------

:warning: <b>문제점 발생(2)</b>

- 이미지 필드 설정 이전에 작성했던 게시글의 detail 페이지가 동작하지 않는다.
  - `article.image.url` 을 불러오지 못하기 때문이다.
- 해결방법1
  - static 파일로 이미지가 없을 때 대신 사용할 이미지를 미리 넣어둠.
  - `static` > `articles` > `images` 에 대체 이미지 저장
- 해결방법2
  - 템프릿에서 `{% if %}` 문으로 `article.image` 가 존재하는 경우(True인 경우)만 이미지를 출력하도록 설정

> `detail.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <h1 class="text-center">DETAIL</h1>
>   {% if article.image %}
>     <img src="{{ article.image.url }}" alt="{{ article.image }}">
>   {% else %}
>     <img src="{% static 'articles/images/no_image.png' %}" alt="no_image">
>   {% endif %}
> <!-- 이하 동일 -->
> ```

> `update.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <h1 class="text-center">UPDATE</h1>
>   {% if article.image %}
>      <img src="{{ article.image.url }}" alt="sample">
>   {% else %}
>      <img src="{% static 'articles/images/no_image.png' %}" alt="no_image" width="200px">
>   {% endif %}
> <!-- 이하 동일 -->
> ```

<br>

### 8.3 image resizing

------

:checkered_flag: <b>준비 사항</b>

- `pillow`, `pilkit`, `django-imagekit`를 미리 설치해야 한다.
  - <font color="red"><b>설치 순서 : `pillow` -> `pilkit` -> `django-imagekit` (<u>반드시 지키자!!</u>)</b></font>
  - `pilkit` : `pillow` 를 쉽게 쓸 수 있도록 도와주는 라이브러리
  - `django-imagekit` : 이미지 helper를 제공하는 dango app
  - `settings.py` 에 `django-imagekit` app 등록 => `'imagekit',` 추가

------

#### (1) html 태그로 직접 사이즈 조정

- 원본은 그대로 저장되어 있고 보여지는 사이즈만 조정하는 것이기 때문에 근본적인 해결책이 아니다.

#### (2) 업로드 할 때 이미지 자체를 resizing 해서 저장

<img src="https://user-images.githubusercontent.com/52685250/65299698-880db100-dbab-11e9-85f0-5e69b8e28de9.jpg" alt="img_resizing_file_route">

##### ① 원본 X / 썸네일 O

> `models.py`
>
> - 맨 위에 두 줄 추가
>
> ```python
> from imagekit.models import ProcessedImageField
> from imagekit.processors import Thumbnail
> ```
>
> - ImageField 대신 다음 구문으로 작성
>   - `Thumbnail`은 이미지를 잘라서 저장되는 것이므로 원본 비율을 유지한채 작게 저장하고 싶으면 다른 것을 찾아서 쓰면 된다.
>
> ```python
> 	image = ProcessedImageField(
>      # ProcessedImageField 에 인자로 들어가 있는 값들은 migrations 이후에
>      # 추가되거나 수정되더라도 makemigrations 를 하지 않아도 된다.
>      processors=[Thumbnail(200, 300)], # processors : 처리할 작업 목록
>      format='JPEG', # 저장 포맷 (JPEG가 퀄리티를 낮췄을 때 이미지가 덜 깨진다.)
>      options={'quality': 90}, # 추가 옵션들
>      upload_to='articles/images', # 저장 위치(MEDIA_ROOT/articles/images)
>  )
> ```

##### ② 원본 O / 썸네일 O

> `models.py`
>
> - import 구문 수정
>
> ```python
> from imagekit.models import ProcessedImageField, ImageSpecField
> ```
>
> - image 필드 내용 수정
>   - 썸네일을 쓰겠다고 호출하는 순간에만 썸네일로 저장된다.
>   - 이 때는 image 필드를 다시 추가했으므로 migrations 과정을 다시 해줘야 한다.
>
> ```python
> 	image = models.ImageField(blank=True)
>  image_thumbnail = ImageSpecField( # detail.html에서 썸네일을 호출할 때만 불러온다.
>      source='image', # 원본 ImageField 이름 (upload_to 대신 source를 사용)
>      processors=[Thumbnail(200, 300)],
>      format='JPEG',
>      options={'quality': 90},
>  )
> ```

> `detail.html`
>
> - `{% block content %}` 내부에 아래 구문 추가
>
> ```django
> <img src="{{ article.image_thumbnail.url }}" alt="썸네일">
> ```

------

:heavy_check_mark: <b>[추가내용] 이미지 업로드 경로 커스터마이징</b>

> `models.py`
>
> - 맨 위에 두 줄로 `articles_image_path` 함수 추가(함수명은 내 마음대로 설정 가능)
>
> ```python
> def articles_image_path(instance, filename):
>  return f'articles/{instance.pk}/images/{filename}'
> 
> ...
> 
> 	image = ProcessedImageField(
>      # ProcessedImageField 에 인자로 들어가 있는 값들은 migrations 이후에
>      # 추가되거나 수정되더라도 makemigrations 를 하지 않아도 된다.
>      processors=[Thumbnail(200, 300)], # processors : 처리할 작업 목록
>      format='JPEG', # 저장 포맷 (JPEG가 퀄리티를 낮췄을 때 이미지가 덜 깨진다.)
>      options={'quality': 90}, # 추가 옵션들
>      upload_to=articles_image_path, # 저장 위치
>  )
> ```

- `instance.pk` 는 처음 레코드가 작성되는 순간에 pk 값이 없기 때문에 `None` 폴더로 생성된다.
- `media/articles/None/images` 로 저장이 되어버린다.

<img src="https://user-images.githubusercontent.com/52685250/65299923-7bd62380-dbac-11e9-8c99-84784ac31405.JPG">

- 실제 개발에서는 `instance.pk`로 하지 않고 로그인을 통해 유저 정보를 받고, `instance.user.pk` 또는 `instance.user.username` 처럼 업로드한 유저의 정보로 폴더를 구조화하는 경우가 많다.

------

<br>

### 8.4 favicon <a href="https://webdir.tistory.com/337">(all about favicon)</a>

- `static` > `articles` 안에 `favicon` 폴더 새로 생성한 후 다운받은 이미지 파일을 넣는다.

> `base.html`
>
> ```django
> {% load static %}
> <!DOCTYPE html>
> <html lang="ko">
> 
> <head>
>   <meta charset="UTF-8">
>   <meta name="viewport" content="width=device-width, initial-scale=1.0">
>   <meta http-equiv="X-UA-Compatible" content="ie=edge">
>   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
>  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
>   <link rel="shortcut icon" href="{% static 'articles/favicon/notebook.png'%}">
>   <title>Document</title>
> </head>
> ```