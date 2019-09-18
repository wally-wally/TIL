from django.urls import reverse
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        # return f'/articles/{self.pk}/'
        # args는 리스트로 넣는다.
        # kwargs는 딕셔너리로 넣는다.
        # return reverse('articles:detail', args=[self.pk])
        return reverse('articles:detail', kwargs={'pk': self.pk}) # 딕셔너리의 key는 views.py의 detail 함수의 pk이다.
        # reverse 함수에 args랑 kwargs 를 동시에 인자로 보낼 수 없다.
