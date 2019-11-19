from rest_framework.response import Response
from django.http import HttpResponseForbidden
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.authentication import JSONWebTokenAuthentication
from django.contrib.auth import get_user_model
from .serializers import TodoSerializer, UserCreationSerializer, UserSerializer
from .models import Todo

User = get_user_model()

@api_view(['POST'])
# settings.py 에 DEFAULT 로 설정했기 때문에 아래 두 데코레이터는 설정하지 않아도 된다.
# 인증받은 사용자만 허가(로그인 여부만 체크)
# @permission_classes((IsAuthencated, )) # 이거는 반드시 튜플로 넣어줘야 한다.
# jwt 인증
# @authentication_classes((JSONWebTokenAuthentication, ))
def todo_create(request):
    serializer = TodoSerializer(data=request.POST)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(status=400)

@api_view(['PUT', 'DELETE'])
def todo_update_delete(request, id): # api 만들 때는 pk 보다는 id 라고 작성하자.
    todo = get_object_or_404(Todo, pk=id)
    if request.method == 'PUT':
        serializer = TodoSerializer(todo, data=request.data) # 왼쪽 인자 : 기존의 todo, 오른쪽 인자 : 새로 작성한 todo
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        todo.delete()
        # 204 : 해당하는 컨텐츠가 없는 경우(삭제를 했기 때문에 해당 데이터가 이제 존재하지 않음을 알려줌)
        return Response(status=204)


@api_view(['POST'])
# 이 경우 회원가입 하는 경우에만 로그인여부를 판단하지 않도록 @permission_classes 데코레이터를 사용하고
# AllowAny를 튜플형태로 추가해준다.
@permission_classes((AllowAny, ))
def user_signup(request):
    serializer = UserCreationSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        # print(serializer.data)
        return Response({'message': '회원가입이 성공적으로 완료되었습니다.'})


@api_view(['GET'])
def user_detail(request, id):
    user = get_object_or_404(User, pk=id)
    if request.user != user:
        return HttpResponseForbidden()
        # return Response(status=403) 으로 작성해도 위와 같은 동작
    serializer = UserSerializer(user)
    return Response(serializer.data)