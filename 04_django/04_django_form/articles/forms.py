from django import forms
from .models import Article, Comment

# class ArticleForm(forms.Form):
#     title = forms.CharField(
#         max_length=10,
#         label='제목',
#         widget=forms.TextInput(
#             attrs={
#                 'class': 'my-title',
#                 'placeholder': 'Enter the title',
#             }
#         )
#     )
#     content = forms.CharField(
#         label='내용',
#         widget=forms.Textarea(
#             attrs={
#                 'class': 'my-content',
#                 'placeholder': 'Enter the content',
#                 'rows': 5,
#                 'cols': 50,
#             }
#         )
#     ) 
#     # form 에서는 max_length를 적지 않고 CharField를 선언하면 TextField와 동일하다.

class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        label='제목',
        max_length=10,
        widget=forms.TextInput(
            attrs={
                'class': 'my-title',
                'placeholder': 'Enter the title'
            }
        )
    )
    content = forms.CharField(
        label='내용',
        widget=forms.Textarea(
            attrs={
                'class': 'my-content',
                'placeholder': 'Enter the content',
                'rows': 5,
                'cols': 50,
            }
        )
    ) 

    class Meta:
        model = Article # 이 모델은 models.py에 만들어놓은 Article에 의해 만들어질꺼라는 의미
        # fields = ('title', 'content',)
        fields = '__all__' # 전체 입력 column(field)을 가져온다.
        # exclude = ('title',) # title를 뺀 field를 사용한다.

class CommentForm(forms.ModelForm):
    
    class Meta:
        model = Comment
        fields = ('content',)