from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser): # 그냥 User는 빈 클래스이므로 AbstractUser를 import 해준다.
    # followers : 내가 팔로우한 사람 / followings : 나를 팔로우하는 사람
    # django는 맞춤 모델을 참조하는 AUTH_USER_MODEL 설정 값을 제공함으로써
    # 기본 User 모델을 오버라이드(덮어씌우기)하도록 할 수 있다.
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="followings")