from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path
from . import views

schema_view = get_schema_view(
   openapi.Info( # 이 부분은 custom 가능
      title="Music API", # title은 필수 인자
      default_version='v1', # default_version은 필수 인자
      # 아래 주석인 선택 인자임
      # description="음악 관련 API 서비스 입니다.",
      # terms_of_service="https://www.google.com/policies/terms/",
      # contact=openapi.Contact(email="wallys0213@gmail.com"),
      # license=openapi.License(name="SSAFY License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('musics/', views.music_list),
    path('musics/<int:music_pk>/', views.music_detail),
    path('artists/', views.artist_list),
    path('artists/<int:artist_pk>/', views.artist_detail),
    path('musics/<int:music_pk>/comments/', views.comments_create),
    path('comments/<int:comment_pk>/', views.comments_update_and_delete),
    # python 1 버전(github페이지에는 정규표현식으로 나와있다)이 아닌 2 버전에 맞게 url 주소 작성
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]