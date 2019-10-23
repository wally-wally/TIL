### 1. `project, accounts app, articles app` 생성 후 기본 세팅

### 2. `articles`의 `models.py` 작성

```python
from django.db import models
from django.urls import reverse
from django.conf import settings

class Article(models.Model):
    title = models.CharField(max_length=15)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles', blank=True)

    class Meta:
        ordering = ('-pk',)

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-pk',)
```

- blank = True

<br>

### 3. `articles` app의 `forms.py` 작성

```python
from django import forms
from .models import Article, Comment

class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        max_length=15,
        label='제목',
        widget=forms.TextInput(
            attrs={
                'class': 'my-title',
                'placeholder': 'Enter the title'
            }
        )
    )
    content = forms.CharField(
        label='내용',
        widget=forms.Textarea(
            attrs={
                'class': 'my-content',
                'placeholder': 'Enter the content',
                'rows': 5,
                'cols': 30
            }
        )
    )

    class Meta:
        model = Article
        fields = ('title', 'content')

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('content',)
```

- `forms.py`는 TextField는 없고 CharField는 있다.

<br>

### 4. 게시글 - index

- 방문 횟수 기능
- 게시글 번호, 제목 표시
- DETAIL 버튼, 좋아요 버튼, 좋아요 개수

### 5. 게시글 - create(C)

- 제목, 내용 입력

### 6. 게시글 - detail(R)

- 글 제목, 내용, 생성일자, 갱신일자

### 7. 게시글 - delete(D)

- detail 페이지에서 DELETE 버튼 누르면 삭제
- 본인 게시글 일 때만 DELETE 버튼 보이게

### 8. 게시글 - update(U)

- detail 페이지에서 UPDATE 버튼 누르면 제목, 내용 유지한채 UPDATE form으로
- 본인 게시글 일 때만 UPDATE 버튼 보이게

### 9. 댓글 - comments_create(C)

- 로그인했을 때만 댓글 생성 가능하게

### 10. 댓글 - detail에 댓글 보는 기능 추가(R)

- 댓글의 총 개수
- `[ ]번 댓글 : [댓글 내용]`의 형태로 댓글들 출력

### 11. 댓글 - comments_delete(D)

- 내가 쓴 댓글 일 때만 삭제 가능

### 12. 회원가입

- 로그인 되어 있으면 회원가입할 필요 없음
- 회원가입 기능 구현
- ModelForm을 커스텀하여 이메일 입력란도 생기게 할 것

### 13. 로그인

- 로그인 되어 있으면 로그인 페이지 갈 필요 없음
- 로그인 기능 구현

### 14. 로그아웃

- 로그아웃 기능 구현

### 15. 회원탈퇴

- 회원탈퇴 기능 구현

### 16. 비번변경

- 비밀번호 변경 기능 구현
- 비번변경 후 로그인 상태 유지할 것

<br>

### 13~16 templates은 공통 form을 사용하고 상단의 제목만 변경