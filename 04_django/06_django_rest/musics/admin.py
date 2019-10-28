from django.contrib import admin
from .models import Artist, Music, Comment

admin.site.register(Artist)
admin.site.register(Music)
admin.site.register(Comment)