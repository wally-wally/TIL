from imagekit.models import ProcessedImageField, ImageSpecField
from imagekit.processors import Thumbnail
from django.urls import reverse
from django.db import models

def articles_image_path(instance, filename):
    return f'articles/{instance.pk}/images/{filename}'

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    # image = models.ImageField(blank=True)
    # image_thumbnail = ImageSpecField( # 처음엔 원본만 만들어주고 썸네일 관련해서 호출할 때만 썸네일로 저장된다.
    #     source='image', # 원본 ImageField 이름 (upload_to 대신 source를 사용)
    #     processors=[Thumbnail(200, 300)],
    #     format='JPEG',
    #     options={'quality': 90},
    # )

    image = ProcessedImageField(
        # ProcessedImageField 에 인자로 들어가 있는 값들은 migrations 이후에
        # 추가되거나 수정되더라도 makemigrations 를 하지 않아도 된다.
        processors=[Thumbnail(200, 300)], # processors : 처리할 작업 목록
        format='JPEG', # 저장 포맷 (JPEG가 퀄리티를 낮췄을 때 이미지가 덜 깨진다.)
        options={'quality': 90}, # 추가 옵션들
        upload_to='articles/images', # 저장 위치(MEDIA_ROOT/articles/images)
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        # return f'/articles/{self.pk}/'
        # args는 리스트로 넣는다.
        # kwargs는 딕셔너리로 넣는다.
        # return reverse('articles:detail', args=[self.pk])
        return reverse('articles:detail', kwargs={'article_pk': self.pk}) # 딕셔너리의 key는 views.py의 detail 함수의 pk이다.
        # reverse 함수에 args랑 kwargs 를 동시에 인자로 보낼 수 없다.


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-pk'] # 이렇게 model에서 선언하면 views.py에서 ordey_by('-pk') 안 쓰고 .all()로 가져와도 역순으로 출력할 수 있다.

    def __str__(self):
        # return self.content
        return f'<Article({self.article_id}): Comment({self.pk})-{self.content}'