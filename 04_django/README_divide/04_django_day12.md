# :notebook_with_decorative_cover: 04_django - Day12

<br>

## 12. 10월22일(12일차)

### 12.1 User - Article 관계(1 : N 관계)

#### (1) `settings.AUTH_USER_MODEL`

> `articles` > `models.py`
>
> - `settings.py`에 `AUTH_USER_MODEL`에 대해 나와 있지 않음
> - `AUTH_USER_MODEL = 'auth.User'`가 기본값이기 때문이다.
>
> ```python
> from django.conf import settings
> 
> # Article 클래스에 추가
> user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
> ```

> `forms.py` > `ArticleForm`
>
> ```python
> fields = ('title', 'content',) # 구문 수정
> ```

- `get_user_model()` : return 값이 `class`
- `settings.AUTH_USER_MODEL` : return 값이 `str`

---

:black_flag: <b>[참고사항] django가 서버가 켜질 때 초기화 순서로 보는 <u>`models.py`에서 `get_user_model()`을 사용하지 못하는 이유</u></b>

① `INSTALLED_APPS`의 각 항목을 imports 한다. (단, 순서는 <b>`위에서 아래로`</b>)

- 이 과정에서 직접적, 간접적으로 모델을 import 해선 안 된다.
- ①번 단계에서 app을 import 하는 동안에 불필요한 제약들을 피하기 위해 이 단계에서는 모델을 가져오지 않는다.

② 각 어플리케이션의 `models.py`를 import 한다.

- <font color="red"><b><u>②번 단계가 완료가 되면</u></b></font>, `get_model()`과 같은 모델에서 작동하는 API들을 사용할 수 있게 된다.
- 그러므로 `models.py`에서 외래키 추가할 때 `get_user_model()`을 사용하지 못한다.

③ `AppConfig`의 ready() 메서드를 실행한다.

- <b>②번 단계가 완료된 후에야 `get_user_model()`을 사용할 수 있는데 아직 `accounts` app이 `INSTALLED_APP`의 작성 순서 때문에 아직 import가 되지 완료되지 않은 상황이라 `get_user_model()`이 어떤 `User` model을 return해야 하는지 django가 알 수 없는 상태이다.</b>

<br>

:arrow_forward: <b>결론</b>

- <b>모든 곳</b>에서 User model을 호출할 때는 <b>`get_user_model()`</b>
- 단, <b>`models.py`</b>에서만 <b>`settings.AUTH_USER_MODEL`</b>

---

- DB는 기본으로 `NOT NULL` 조건을 지켜야 하므로 새로운 컬럼 추가시 현재 이미 만들어져 있는 레코드에 대해 `user_id`의 기본값을 어떻게 설정할지 물어보는 구문이 다음과 같이 표시된다.
  - 아래와 같은 상황은 `user_id`를 `1`로 선택한 예시화면이다.

![model](https://user-images.githubusercontent.com/52685250/67252556-7111f580-f4ae-11e9-9c8d-ac9586a3fd39.JPG)

<br>

#### (2) Create Logic 수정

- 글의 작성자가 누구인지를 알기 위해 설정

> `views.py` > `create` view (구문 수정)
>
> ```python
> article = form.save(commit=False)
> article.user = request.user
> article.save()
> ```

<br>

#### (3) Update, Delete Logic 수정

- 자신의 게시글이 아니면 UPDATE, DELETE를 하지 못하도록 설정

> `detail.html` (구문 수정)
>
> ```django
> {% if request.user == article.user %}
>   <a href="{% url 'articles:update' article.pk %}">[UPDATE]</a>
>   <form action="{% url 'articles:delete' article.pk %}" method="POST", onclick="return confirm('진짜로 지우게??')">
>     {% csrf_token %}
>     <input type="submit" value="DELETE">
>   </form>
> {% endif %}
> ```

> `views.py` > `update` view
>
> ```python
> @login_required
> def update(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     if request.user == article.user: # 큰 if ~ else문 추가
>         if request.method == 'POST':
>             form = ArticleForm(request.POST, instance=article)
>                 article = form.save()
>                 return redirect(article)
>         else:
>             form = ArticleForm(instance=article)
>     else:
>         return redirect('articles:index')
>     context = {'form': form, 'article': article,}
>     return render(request, 'articles/form.html', context)
> ```
>
> `views.py` > `delete` view
>
> ```python
> @require_POST
> def delete(request, article_pk):
>     if request.user.is_authenticated:
>         article = get_object_or_404(Article, pk=article_pk)
>         if request.user == article.user: # 이 구문 추가
>             article.delete()
>         else:
>             return redirect(article)
>     return redirect('articles:index')
> ```

<br>

### 12.2 User - Comment(1 : N 관계)

> `models.py` > `Comment` Class
>
> ```python
> # 구문 추가
> user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
> ```

#### (1) comments_create logic 수정

> `views.py` > `comments_create` view
>
> ```python
> comment.user = request.user # 구문 추가
> ```

<br>

#### (2) 비로그인 유저 댓글 작성 form 숨기기

> `detail.html`
>
> ```django
> {% if user.is_authenticated %}
>   <form action="{% url 'articles:comments_create' article.pk %}" method="POST">
>     {% csrf_token %}
>     {{ comment_form }}
>     <input type="submit" value="submit">
>   </form>
>   <hr>
> {% else %}
>   <a href="{% url 'accounts:login' %}">[댓글을 작성하려면 로그인하세요]</a>
>   <hr>
> {% endif %}
> ```

<br>

#### (3) 내가 작성한 게시글에서만 DELETE 보이기

> `detail.html`
>
> ```html
> {% if request.user == comment.user %}
>   <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" style="display: inline;">
>     {% csrf_token %}
>     <input type="submit" value="DELETE">
>   </form>
> {% endif %}
> ```

> `views.py` > `comments_delete` view
>
> ```python
> @require_POST
> def comments_delete(request, article_pk, comment_pk):
>     if request.user.is_authenticated:
>         comment = get_object_or_404(Comment, pk=comment_pk)
>         if request.user == comment.user: # 이 조건 추가됨
>             comment.delete()
>         return redirect('articles:detail', article_pk)
>     return HttpResponse('You are Unauthorized', status=401)
> ```

<br>

### 12.3 프로필 이미지 기능 추가(gravatar 프로필 이미지)

#### (1) ModelForm Custom

> `accounts` > `forms.py`
>
> ```python
> from django.contrib.auth.forms import UserCreationForm
> 
> class CustomUserCreationForm(UserCreationForm):
>     class Meta(UserCreationForm.Meta):
>         fields = UserCreationForm.Meta.fields + ('email',)
> ```

> `signup` view
>
> - 기존에 import 했던 `UserCreationForm` 삭제, `CustomUserCreationForm` 추가
> - `UserCreationForm` -> `CustomUserCreationForm` 변경

<br>

> `index` view
>
> ```python
> import hashlib
> 
> def index(request):
>     if request.user.is_authenticated:
>         gravatar_url = hashlib.md5(request.user.email.encode('utf-8').lower().strip()).hexdigest()
>     else:
>         gravatar_url = None
>     visits_num = request.session.get('visits_num', 0)
>     request.session['visits_num'] = visits_num + 1
>     request.session.modified = True
>     articles = Article.objects.all()
>     context = {'articles': articles, 'visits_num': visits_num, 'gravatar_url': gravatar_url,}
>     return render(request, 'articles/index.html', context)
> ```

> `base.html` (구문 추가)
>
> ```django
> <img src="https://s.gravatar.com/avatar/{{ gravatar_url }}?s=80" alt="프로필이미지">
> ```

<br>

#### (2) Custom template tags and filters <a href=" https://docs.djangoproject.com/en/2.2/howto/custom-template-tags/" target="_blank">(django custome template tag 공식 문서)</a>

:heavy_check_mark: <b><u>모든 페이지에서 이미지가 나오도록 수정한다.</u></b>

> `accounts` app > `templatetags` folder 생성
>
> - 폴더 내부에 `__init__.py`, `gravatar.py` 생성

> `gravatar.py`
>
> ```python
> import hashlib
> from django import template
> 
> register = template.Library()
> 
> @register.filter # 기존의 템플릿 라이브러리에 아래의 함수(custom filter)가 추가된다는 의미인 decorator
> def makemd5(email): # {{ email | ssafy }} 와 같은 경우 필터 앞에 있는 왼쪽에 있는 값
>     return hashlib.md5(email.encode('utf-8').lower().strip()).hexdigest()
> ```

> `base.html`
>
> ```django
> {% load gravatar %} <!-- 가장 맨 위에 코드 추가 -->
> 
> <img src="https://s.gravatar.com/avatar/{{ request.user.email|makemd5 }}?s=80" alt="프로필이미지"> <!-- 코드 수정-->
> ```

> `index` view
>
> - (2)에서 새로 작성했던 코드가 굳이 있을 필요가 없다.
> - django custom template tag를 사용했기 때문이다.

<br>

### 12.4 Model relationships(M : N) - `05_model_relation`

---

:heavy_exclamation_mark: <b>User : Article = M : N</b>

- User는 여러 개의 Article에 LIKE 할 수 있고
- Article은 여러 User 로 부터 LIKE 받을 수 있다.

:heavy_exclamation_mark: <b>모델링은 현실 세계를 최대한 유사하게 반영하기 위해서 해야한다.</b>

---

:ballot_box_with_check: <b><u>환자와 의사의 예약 시스템을 구축하라는 프로젝트</u></b>

- 모델링(`models.py`)

  ```python
  from django.db import models
  
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  ```

#### (1) 1:N의 한계 (shell_plus로 객체 생성 후 확인)

- 불필요한 필드(같은 환자 이름을 가진 필드)를 또 만들어야 하는 문제점이 발생한다.

```shell
In [1]: doctor1 = Doctor.objects.create(name='justin')

In [2]: doctor2 = Doctor.objects.create(name='zzulu')

In [3]: patient1 = Patient.objects.create(name='tak', doctor=doctor1)

In [4]: patient2 = Patient.objects.create(name='harry', doctor=doctor2)

In [5]: doctor1
Out[5]: <Doctor: 1번 의사 justin>

In [6]: doctor2
Out[6]: <Doctor: 2번 의사 zzulu>

In [7]: patient1
Out[7]: <Patient: 1번 환자 tak>

In [8]: patient2
Out[8]: <Patient: 2번 환자 harry>

In [9]: patient3 = Patient.objects.create(name='tak', doctor=doctor2)

In [10]: patient3
Out[10]: <Patient: 3번 환자 tak>

In [11]: patient3.doctor.name
Out[11]: 'zzulu'

In [12]: patient4 = Patient.objects.create(name='harry', doctor=doctor1)

In [13]: patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor=doctor2)
  File "<ipython-input-13-2775590f4f3f>", line 1
    patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor=doctor2)
                                                                   ^
SyntaxError: keyword argument repeated
```

<br>

#### (2) 중개모델 생성 - `models.py`에 Reservation model 추가

![중개 모델](https://user-images.githubusercontent.com/52685250/67262400-9c610880-f4df-11e9-9904-a8ebb314966b.JPG)

- 1 : N 의 한계점을 해결하기 위해 중개모델을 생성하여 어느 의사가 어느 환자와 매칭되는지 알 수 있다.

- 기존의 `db.sqlite3`, `0001_initial.py` 삭제 후 다시 migration  과정 진행

```python
class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.doctor_id}번 의사의 {self.patient_id}번 환자'
```

- 중개 모델이 생겼으므로 `doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)` 이 구문은 필요가 없게 된다.

```shell
In [1]: doctor1 = Doctor.objects.create(name='justin')

In [3]: patient1 = Patient.objects.create(name='tak')

In [5]: Reservation.objects.create(doctor=doctor1, patient=patient1)
Out[5]: <Reservation: 1번 의사의 1번 환자>

In [6]: doctor1.reservation_set.all()
Out[6]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>

In [7]: patient1.reservation_set.all()
Out[7]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>

In [8]: patient2 = Patient.objects.create(name='harry')

In [9]: Reservation.objects.create(doctor=doctor1, patient=patient2)
Out[9]: <Reservation: 1번 의사의 2번 환자>

In [10]: doctor1.reservation_set.all()
Out[10]: <QuerySet [<Reservation: 1번 의사의 1번 환자>, <Reservation: 1번 의사의 2번 환자>]>

In [11]: for reservation in doctor1.reservation_set.all():
    ...:     print(reservation.patient.name)
    ...: 
tak
harry
```

<br>

#### (3) 중개 모델을 직접 거치지 않고 바로 가져오기

- `Through` option
  - 중개 모델을 거치지 않고 직접 서로 테이블을 참조하는 option
  - `ManyToManyField`는 실제적인 물리적인 필드가 DB에 생기는 것이 아니다.

> `models.py`
>
> ```python
> doctors = models.ManyToManyField(Doctor, through='reservation') # 구문 추가
> ```

> `shell_plus`
>
> ```shell
> In [1]: patient1 = Patient.objects.get(pk=1)
> 
> In [2]: patient1
> Out[2]: <Patient: 1번 환자 tak>
> 
> In [3]: patient1.reservation_set.all()
> Out[3]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>
> 
> In [4]: patient1.doctors.all()
> Out[4]: <QuerySet [<Doctor: 1번 의사 justin>]>
> 
> In [5]: doctor2 = Doctor.objects.create(name='zzulu')
> 
> In [6]: Reservation.objects.create(doctor=doctor2, patient=patient1)
> Out[6]: <Reservation: 2번 의사의 1번 환자>
> 
> In [7]: patient1.reservation_set.all()
> Out[7]: <QuerySet [<Reservation: 1번 의사의 1번 환자>, <Reservation: 2번 의사의 1번 환자>]>
> 
> In [8]: patient1.doctors.all()
> Out[8]: <QuerySet [<Doctor: 1번 의사 justin>, <Doctor: 2번 의사 zzulu>]>
> 
> In [10]: doctor2
> Out[10]: <Doctor: 2번 의사 zzulu>
> 
> In [11]: doctor2.patient_set.all()
> Out[11]: <QuerySet [<Patient: 1번 환자 tak>]>
> ```

<br>

#### (4) Doctor도 patients 를 참조할 수 없을까?

- `related_name`

  - 참조되는 대상이 참조하는 대상을 찾을 때(역참조), 어떻게 불러 올지에 정의한다.
  - MTOM(ManyToMany) 필드가 없는 테이블이 있는 테이블을 참조할 때 사용한다.
  - 필수적으로 사용하는 건 아니지만 필수적인 상황이 발생할 수 있다.

  ```python
  doctors = models.ManyToManyField(Doctor, related_name='patients') # 구문 추가
  # through='reservation'는 삭제
  ```

- 현재 `models.py` 상황

  ```python
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      doctors = models.ManyToManyField(Doctor, related_name='patients')
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  ```

- shell_plus로 확인

  ```shell
  In [1]: doctor1 = Doctor.objects.create(name='justin')
  
  In [3]: patient1 = Patient.objects.create(name='tak')
  
  In [4]: doctor1
  Out[4]: <Doctor: 1번 의사 justin>
  
  In [5]: patient1
  Out[5]: <Patient: 1번 환자 tak>
  
  In [6]: doctor1.patients.add(patient1)
  
  In [8]: doctor1.patients.all()
  Out[8]: <QuerySet [<Patient: 1번 환자 tak>]>
  
  In [9]: patient1.doctors.all()
  Out[9]: <QuerySet [<Doctor: 1번 의사 justin>]>
  
  In [10]: patient1.doctors.remove(doctor1)
  
  In [11]: patient1.doctors.all()
  Out[11]: <QuerySet []>
  
  In [12]: doctor1.patients.all()
  Out[12]: <QuerySet []>
  ```

- 위와 같은 상황일 때 `manytomany_patient_doctors` 테이블이 새로 생성된다.
- 중개 모델을 생성하지 않고 `doctor`에서는 `patients.all()`로, `patients`에서는 `doctors.all()`로 서로 접근할 수 있다.
- 그렇다면 중개모델은 필요가 없는가??? => :no_entry_sign:<b><u>아니다!</u></b>
  - 예약한 시간 정보를 담는다거나 하는 경우(= 추가적인 필드가 필요한 경우)에는 반드시 중개모델을 만들어서 진행을 해야되는 상황도 있다.
  - 다만 그럴 필요가 없는 경우 위와 같이 해결할 수 있다.

<br>

### 12.5 `좋아요(LIKE)` 기능 구현하기

---

- user는 여러 article에 좋아요(LIKE)를 누를 수 있고
- article은 여러 user로부터 좋아요(LIKE)를 받을 수 있다.

---

> `articles` app > `models.py` > `Article` model
>
> :heavy_check_mark: <b>[주의!]변수명 반드시 구분하기!</b>
>
> - ` article.user` => 게시글을 작성한 유저 --- `1 : N`
>
> - `article.like_users` => 게시글을 좋아요한 유저 --- `M : N`
> - `user.like_articles` => 유저가 좋아요를 누른 게시글(역참조, `related_name`) --- `M : N`
> - `user.article_set` => 유저가 작성한 게시글(역참조) --- `1 : N`
>
> ```python
> like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles', blank=True) # 구문 추가
> # blank=True : 이미 만들어진 필드에 대해서는 빈 값(빈 string)도 허용된다고 설정 (null=True 하고는 다른 개념)
> ```
>
> - `articles_article_like_user`라는 테이블이 생성됨(좋아요를 누를 때마다 데이터가 이 곳에 저장됨)

> `articles` app > `views.py` > `like` view 새로 생성
>
> ```python
> def like(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     # 해당 게시글에 좋아요를 누른 사람들 중에서 현재 접속유저가 있다면 좋아요를 취소
>     if article.like_users.filter(pk=request.user.pk).exists():
>     # .get()은 없을 때 오류가 발생하므로
>     # 키가 없어도 오류(DoesNotExistError) 발생을 막기 위해 .filter()를 사용한다.
>         article.like_users.remove(request.user)
>     else:
>         article.like_users.add(request.user)
>     # 위와 아래와 같은 구문임(어느 것을 써도 무방하다)
>     # if request.user in article.like_users.all():
>     #     article.like_users.remove(request.user) # 좋아요 취소
>     # else:
>     #     article.like_users.add(request.user) # 좋아요 선택
>     return redirect('articles:index')
> ```

> `urls.py`
>
> ```python
> path('<int:article_pk>/like/', views.like, name='like'), # 구문 추가
> ```

> `index.html` (구문 추가, fontawesome 적용)
>
> ```django
> <a href="{% url 'articles:like' article.pk %}">
>   {% if user in article.like_users.all %}
>     <i class="fas fa-heart" style="color: crimson;"></i>
>   {% else %}
>     <i class="fas fa-heart" style="color: black;"></i>
>   {% endif %}
> </a>
> <p>{{ article.like_users.all|length }}명이 이 글을 좋아합니다.</p>
> ```

<br>

### 12.6 template 분할 - `{% include %}`

> `articles` app > `index.html`
>
> - for문 안의 내용을 `_article.html`로 분할하여 작성
>
> ```django
> {% for article in articles %}
>   {% include 'articles/_article.html' %}
> {% endfor %}
> ```

> `articles` app > `_article.html`
>
> - 보통 분할된 template의 이름 앞에는 `_` 가 붙는다.
>
> ```django
> <!-- 기본적으로 index.html에서 for문안에 있으므로 article 이름 자체를 그대로 쓸 수 있다. -->
> 
> <div class="card mb-3">
>   <div class="card-header">
>     <p>작성자: <b>{{ article.user }}</b></p> <!-- 기본적으로 .user만 입력해도 user_name이 나온다. -->
>   </div>
>   <div class="card-body">
>     <h5 class="card-title"><p>글 제목: <b>{{ article.title }}</b></p></h5>
>     <p class="card-text">{{ article.pk }}</p>
>     <hr>
>     <p class="card-text">
>       <a href="{% url 'articles:like' article.pk %}">
>         {% if user in article.like_users.all %}
>           <i class="fas fa-heart" style="color: crimson;"></i>
>         {% else %}
>           <i class="fas fa-heart" style="color: black;"></i>
>         {% endif %}
>       </a>
>       <b>{{ article.like_users.all|length }}</b>명이 이 글을 좋아합니다.
>     </p>
>     <a href="{{ article.get_absolute_url }}" class="btn btn-primary">DETAIL</a>
>     <!-- 원래는 {# url 'articles:detail' article_pk #}이지만 get_absoulte_url에 의해 {{ article.get_absolute_url }}로 간결해진다. -->
>   </div>
> </div>
> ```

