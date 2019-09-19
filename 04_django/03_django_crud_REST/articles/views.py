from IPython import embed
from django.core.exceptions import ValidationError
from django.shortcuts import render, redirect
from .models import Article, Comment

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


def detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    comments = article.comment_set.all()
    # Comment.objects로 가져오면 전체 댓글을 다 가져오므로 이건 틀린 구문
    context = {
        'article': article,
        'comments': comments,
    }
    return render(request, 'articles/detail.html', context)


def delete(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    # POST 방식으로 올 때만 삭제할 수 있도록 구문 수정 (즉, 주소창에 직접 입력하여 지울려고 하면 GET 방식으로 삭제할 수 없다.)
    if request.method == 'POST':
        article.delete()
        return redirect('articles:index')
    else:
        return redirect(article)


def update(request, article_pk):
    article = Article.objects.get(pk=article_pk) # UPDATE, EDIT 둘 다 필요하므로 if문 밖에 작성하여 반복 제거
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


def comments_create(request, article_pk):
    # 댓글을 달 게시글
    article = Article.objects.get(pk=article_pk)
    if request.method == 'POST':
        # form 에서 넘어온 댓글 정보
        content = request.POST.get('content') # get 안의 content는 detail.html의 input 태그의 name에 해당한다.
        # 댓글 생성 및 저장
        comment = Comment(article=article, content=content)
        comment.save()
        return redirect(article) # get_absolute_url 구현 시 이걸로 사용
        # return redirect('articles:detail' article.pk)
        # return redirect('articles:detail' article_pk)
    else:
        return redirect(article)


def comments_delete(request, article_pk, comment_pk):
    # article = Article.objects.get(pk=article_pk)
    comment = Comment.objects.get(pk=comment_pk)
    if request.method == 'POST':
        comment.delete()
    # return redirect(article)
    return redirect('articles:detail', article_pk)