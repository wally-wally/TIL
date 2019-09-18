from IPython import embed
from django.core.exceptions import ValidationError
from django.shortcuts import render, redirect
from .models import Article

# Create your views here.
def index(request):
    articles = Article.objects.order_by('-pk') # DB 가 변경
    # articles = Article.objects.all()[::-1] # python 이 변경
    
    context = {'articles': articles,}
    return render(request, 'articles/index.html', context)


def create(request):
    # CREATE 동작
    if request.method == 'POST': 
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article(title=title, content=content)
        article.save()
        return redirect(article)
    # NEW 동작
    else:
        return render(request, 'articles/create.html')


def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {'article': article,}
    return render(request, 'articles/detail.html', context)


def delete(request, pk):
    article = Article.objects.get(pk=pk)
    # POST 방식으로 올 때만 삭제할 수 있도록 구문 수정 (즉, 주소창에 직접 입력하여 지울려고 하면 GET 방식으로 삭제할 수 없다.)
    if request.method == 'POST':
        article.delete()
        return redirect('articles:index')
    else:
        return redirect(article)


def update(request, pk):
    article = Article.objects.get(pk=pk) # UPDATE, EDIT 둘 다 필요하므로 if문 밖에 작성하여 반복 제거
    # UPDATE 동작
    if request.method == 'POST':
        article.title = request.POST.get('title')
        article.content = request.POST.get('content')
        article.save()
        return redirect(article)
    # EDIT 동작
    else:
        context = {'article': article,}
        return render(request, 'articles/update.html', context)