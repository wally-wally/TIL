# :notebook_with_decorative_cover: 04_django - Day13

<br>

## 13. 10월23일(13일차)

### 13.1 user의 프로필 페이지 만들기

> `accounts` app
>
> - `get_user_model`, `get_object_or_404` import 구문 추가
>
> ```python
> def profile(request, username):
>  person = get_object_or_404(get_user_model(), username=username)
>  context = {'person': person,}
>  return render(request, 'accounts/profile.html', context)
> ```

> `urls.py`
>
> ```python
> path('<username>/', views.profile, name='profile'),
> ```

> `profile.html`
>
> ```html
> {% extends 'articles/base.html' %}
> 
> {% block content %}
> <h1 class="text-center">{{ person.username }}'s Profile</h1> <!-- username -->
> <hr>
> <h3 class="text-center">{{ person.username }}이(가) 작성한 글</h3> <!-- username -->
> 
> <div class="row">
> {% with articles=person.article_set.all %}
>  <!-- 이 유저가 작성한 게시글, 댓글만 가져오기(정렬은 모두 최근에 작성한 것부터 => models.py에서 이미 최신순으로 가져올 수 있게 모델링되어 있다.) -->
>  <!-- 그래서 view에서 order_by('-pk')를 할 필요가 없다. -->
>  {% for article in articles %}
>  <div class="col-4 my-2">
>    <div class="card">
>      <div class="card-body">
>        <h5 class="card-title">{{ article.content }}</h5> <!-- 게시글 내용 -->
>        <p class="card-text">{{ article.like_users.all|length }}명이 좋아하는 글</p> <!-- article.like_users.count도 가능 -->
>        <p class="card-text">{{ article.comment_set.all|length }}개의 댓글</p> <!-- article.comment_set.count도 가능 -->
>        <a href="{% url 'articles:detail' article.pk %}" class="btn btn-primary">Go to article</a> <!-- 게시글 보기(link 설정) -->
>      </div>
>    </div>
>  </div>
>  {% endfor %}
> {% endwith %}
> </div>
> 
> <hr>
> 
> <h3 class="text-center">{{ person.username }}이(가) 작성한 댓글</h3>
> <div class="row">
> {% with comments=person.comment_set.all%}
>  {% for comment in comments %}
>  <div class="col-12 my-2">
>    <div class="card">
>      <div class="card-body">
>        <blockquote class="blockquote mb-0">
>          <p>{{ comment.content }}</p> <!-- 댓글의 내용-->
>          <footer class="blockquote-footer">{{ comment.created_at|date:"SHORT_DATE_FORMAT" }}</footer> <!-- 댓글의 작성 날짜 -->
>        </blockquote>
>      </div>
>    </div>
>  </div>
>  {% endfor %}
> {% endwith %}
> </div>
> {% endblock  %}
> ```

<br>

---

:heavy_check_mark: [선택사항] <b>`with` template tag</b> => 시험출제X

- 복잡한 변수를 더 간단한 이름으로 저장(캐시)하며, 여러 번 DB를 조회할 때(특히 비용이 많이 드는) 유용하게 사용가능하다.

> `before`
>
> ```django
> {% for article in person.article_set.all %}
> 	...
> {% endfor %}
> ```
>
> `after`
>
> ```django
> {% with articles=person.article_set.all %}
>  {% for article in articles %}
> 	...
> 	{% endfor %}
> {% endwith %}
> ```

:warning: <b>주의사항</b>

- <b>조기 최적화는 프로그래밍에서 악의 근원이다.</b>
- <b>코드는 코드 자체적으로도 빨라야 하지만, 더 중요한 것은 다른 개발자들이 읽기 쉬워야한다.</b>

---

<br>

### 13.2 `팔로우(Follow)` 기능 구현하기 - `M:N(User:User)관계`

#### (1) 맞춤 User 모델 대체하기

> `settings.py`
>
> ```python
> AUTH_USER_MODEL = 'accounts.User' # 맨 마지막에 추가
> ```

> `accounts` > `models.py`
>
> - django는 맞춤 모델을 참조하는 AUTH_USER_MODEL 설정 값을 제공함으로써 기본 User 모델을 오버라이드(덮어씌우기)하도록 할 수 있다.
> - <b>User 모델 대체 작업을 프로젝트 중간에 할 경우 모두 DB 초기화(<u>기존의 db.sqlite3, migrations 파일 모두 삭제</u>)하고 다시 진행한다.</b> <a href="https://docs.djangoproject.com/ko/2.2/topics/auth/customizing/#substituting-a-custom-user-model" target="_blank">(공식 문서)</a>
> - 새로 생긴 `accounts_user_followers` table이 중개모델 역할을 하게 된다.
>   - `id`, `to_user_id`, `from_user_id` 새로운 컬럼명이 생긴다.
>
> ```python
> from django.db import models
> from django.conf import settings
> from django.contrib.auth.models import AbstractUser
> 
> class User(AbstractUser):
>  followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="followings")
> ```

> `accounts` app > `admin.py`
>
> ```python
> from django.contrib import admin
> from django.contrib.auth.admin import UserAdmin
> from .models import User
> 
> # Register your models here.
> admin.site.register(User, UserAdmin)
> ```

- 현재 상태에서 새로 회원가입 하는 순간 아래와 같은 오류가 발생한다.

  ```
  AttributeError at /accounts/signup/
  Manager isn't available; 'auth.User' has been swapped for 'accounts.User'
  ```

- <a href="https://docs.djangoproject.com/ko/2.2/topics/auth/customizing/#custom-users-and-the-built-in-auth-forms" target="_blank">(공식 문서)</a> 에 의해 `UserCreationForm`과 `UserChangeForm`을 Custom을 해야 한다.

  `CustomUserCreationForm`에 다음과 같은 구문을 추가한다.

  `auth.User`를 바라보고 있는 것을 `accounts.User`를 바라볼 수 있도록 오버라이드 하게 해 준다.

  ```python
  model = get_user_model()
  ```

<br>

#### (2) 팔로우 구현하기

> `articles` app > `follow` view 생성
>
> ```python
> def follow(request, article_pk, user_pk):
>  person = get_object_or_404(get_user_model(), pk=user_pk) # person = 게시글 유저
>  user = request.user # user = 접속 유저
>  # 내(request.user)가 게시글 유저(person) 팔로워 목록에 이미 존재 한다면,
>  if person.followers.filter(pk=user.pk).exists():
>      person.followers.remove(user)
>  else:
>      person.followers.add(user)
>  return redirect('articles:detail', article_pk)
> ```
>
> `detail` view에 다음 두 줄 구문 추가
>
> ```python
> person = get_object_or_404(get_user_model(), pk=article.user_id) # template에서 person을 사용하기 위해 추가함
> context = {'article': article, 'comment_form': comment_form, 'comments': comments, 'person': person,}
> ```

> `urls.py`
>
> ```python
> path('<int:article_pk>/follow/<int:user_pk>/', views.follow, name='follow'),
> ```

> `_follow.html` (`detail.html` 맨 아래에 `{% include 'articles/_follow.html' %}` 구문 추가)
>
> ```django
> <div class="jumbotron text-center">
> <h1 class="display-4">{{ person.username }}</h1> {# article.user로도 가능하다. #}
> <p class="lead">
>  팔로잉 : {{ person.followings.all|length }} / 팔로워 : {{ person.followers.all|length }}
> </p>
> <hr class="my-4">
> {% if user != article.user %} {# 요청된 유저가 게시글의 유저랑 달라야 팔로우 기능이 보인다. #}
>  {% if user in person.followers.all %} {# user는 request.user이다. #}
>    <a class="btn btn-primary btn-lg" href="{% url 'articles:follow' article.pk person.pk %}" role="button">Unfollow</a>
>  {% else %}
>    <a class="btn btn-primary btn-lg" href="{% url 'articles:follow' article.pk person.pk %}#" role="button">Follow</a>
>  {% endif %}
> {% endif %}
> </div>
> ```

![21312321](https://user-images.githubusercontent.com/52685250/67360060-e6112800-f59f-11e9-80ce-17c55a8efe64.JPG)

- 테이블로 직접 확인하면 1번 유저가 3번 유저에게 팔로우를 했다는 것을 볼 수 있다.