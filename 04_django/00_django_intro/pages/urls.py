from django.urls import path

from . import views

urlpatterns = [
    # app url 은 아래로 작성해 나간다.
    path('index/', views.index), # url 경로 마지막에 /를 반드시 붙임 | views.index : views.py의 index 함수로 연결
    path('introduce/<name>/<int:age>', views.introduce),
    path('dinner/', views.dinner),
    path('image/', views.image),
    path('hello/<str:name>/', views.hello), # str은 default 이므로 생략 가능
    path('times/<int:num1>/<int:num2>/', views.times),
    path('area/<int:r>/', views.area),
    path('template_language/', views.template_language),
    path('isitgwangbok/', views.isitgwangbok),
    path('throw/', views.throw),
    path('catch/', views.catch),
    path('art/', views.art),
    path('result/', views.result),
    path('user_new/', views.user_new),
    path('user_create/', views.user_create),
    path('static_example/', views.static_example),
]