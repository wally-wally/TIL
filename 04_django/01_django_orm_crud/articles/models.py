from django.db import models

# Create your models here.
class Article(models.Model): # models.Model 의 상속을 받는다.
    # id(프라이머리 키)는 기본적으로 처음 테이블 생성시 자동으로 만들어진다,.
    # id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=10)
    content = models.TextField() # 길이 제약X
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk}번글 - {self.title} : {self.content}'