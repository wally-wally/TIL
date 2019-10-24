from django import forms
from .models import Article, Comment

class ArticleForm(forms.ModelForm):
    title = forms.CharField(label='제목')
    content = forms.CharField(label='내용')

    class Meta:
        model = Article
        fields = ('title', 'content',)

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('content',)