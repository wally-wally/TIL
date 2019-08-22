from IPython import embed
from django.core.exceptions import ValidationError
from django.shortcuts import render, redirect
from .models import Article

# Create your views here.
def index(request):
    # articles = Article.objects.all()
    articles = Article.objects.order_by('-pk') # [권장]역순출력 방법1. DB 가 변경하여 역순
    # articles = Article.objects.all()[::-1] # 역순출력 방법2. python 이 변경하여 역순
    context = {'articles': articles,}
    return render(request, 'articles/index.html', context)


def new(request):
    return render(request, 'articles/new.html')


def create(request):
    # embed() # 서버 잠깐 일시정지
    try:
        title = request.POST.get('title')
        content = request.POST.get('content')

        # # 1
        # article = Article()
        # article.title = title
        # article.content = content
        # article.save()

        # 2
        article = Article(title=title, content=content)
        article.full_clean()
    except ValidationError:
        raise ValidationError('Error')
    else: # try에서 아무 오류 없이 동작되었을 때 아래 구문 실행
        article.save()

    # # 3
    # Article.objects.create(title=title, content=content)
        return redirect(f'/articles/{article.pk}/') # 메인 페이지
    # POST방식은 render 대신에 redirect를 사용한다.


def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {'article': article,}
    return render(request, 'articles/detail.html', context)


def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('/articles/') # 페이지를 보낼 필요가 없고 DB를 건드렸기 때문에 페이지 반환인 render보다 redirect가 더 적절하다.


def edit(request, pk):
    article = Article.objects.get(pk=pk)
    context = {'article': article,}
    return render(request, 'articles/edit.html', context)


def update(request, pk):
    article = Article.objects.get(pk=pk)
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect(f'/articles/{article.pk}/')