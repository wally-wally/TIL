from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Todo

User = get_user_model()
# 이 아래부터는 get_user_model() 대신에 User 라고 쓰면 된다.

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'user', 'title', 'completed',)


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password',)


class UserSerializer(serializers.ModelSerializer):
    # 없을 수도 있지만 기본적으로 여러 개 들어가므로 many=True 속성을 써준다.
    todo_set = TodoSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'todo_set',)