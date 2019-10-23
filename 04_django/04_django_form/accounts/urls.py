from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [ # urlpatterns도 INSTALLED_APPS와 마찬가지로 위에서 아래로 코드를 읽기 때문에
    # path('<username>/', views.profile, name='profile'), # 이 위치에 있으면 username을 인식하지 못하여 아래 주소들이 실행하지 못한다.
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('delete/', views.delete, name='delete'),
    path('update/', views.update, name='update'),
    path('password/', views.change_password, name='change_password'),
    path('<username>/', views.profile, name='profile'), # 그래서 이 구문은 항상 아래에 있어야 한다.
]