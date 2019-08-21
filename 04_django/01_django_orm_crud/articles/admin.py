from django.contrib import admin
from .models import Article # 명시적 상대 경로 표현

# Register your models here.
class ArticleAdmin(admin.ModelAdmin):
    # 튜플이나 리스트로 작성한다.
    list_display = ('pk', 'title', 'content', 'create_at', 'updated_at',) # 이게 가장 중요
    list_filter = ('create_at',) # 원소가 하나인 튜플 생성시 마지막에 ,(콤마) 반드시 찍어준다.
    list_display_links = ('content',)
    list_editable = ('title',)
    list_per_page = 2 # 이건 안 넣으면 기본값 = 100

admin.site.register(Article, ArticleAdmin)