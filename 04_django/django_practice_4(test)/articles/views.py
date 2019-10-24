from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import Article, Comment
from .forms import ArticleForm, CommentForm

# Create your views here.
def index(request):
    visits_num = request.session.get('visits_num', 0)
    request.session['visits_num'] = visits_num + 1
    request.session.modified = True
    articles = Article.objects.all()
    context = {'articles': articles, 'visits_num': visits_num,}
    return render(request, 'articles/index.html', context)

@login_required
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            # 아래 세 줄 기억!! (accounts의 signup view와 혼동되지 않도록 주의)
            article = form.save(commit=False)
            article.user = request.user
            article.save()
            return redirect('articles:index')
    else:
        form = ArticleForm()
    context = {'form': form,}
    return render(request, 'articles/form.html', context)

def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comments = article.comment_set.all()
    comment_form = CommentForm()
    context = {'article': article, 'comments': comments, 'comment_form': comment_form,}
    return render(request, 'articles/detail.html', context)

@require_POST
def delete(request, article_pk):
    if request.user.is_authenticated:
        article = get_object_or_404(Article, pk=article_pk)
        if request.user == article.user:
            article.delete()
        else:
            return redirect('articles:detail', article_pk)
    return redirect('articles:index')

@login_required
def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        if request.method == 'POST':
            form = ArticleForm(request.POST, instance=article)
            if form.is_valid():
                form.save()
                return redirect('articles:detail', article_pk)
        else:
            form = ArticleForm(instance=article)
    else:
        return redirect('articles:index')
    context = {'form': form, 'article': article,} # form 인자 말고 article 인자도 반드시 context로 넘겨줘야 form에서 기존의 내용이 유지되게 출력된다.
    return render(request, 'articles/form.html', context)

@require_POST
def comments_create(request, article_pk):
    if request.user.is_authenticated:
        article = get_object_or_404(Article, pk=article_pk)
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.article_id = article.pk
            comment.save()
    return redirect('articles:detail', article_pk) # 들여쓰기 위치 : 가장 바깥 쪽!

# 댓글 삭제 view 전체 다시 보기
@require_POST
def comments_delete(request, article_pk, comment_pk):
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        if request.user == comment.user:
            comment.delete()
        return redirect('articles:detail', article_pk)

@login_required
def like(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user in article.like_users.all():
        article.like_users.remove(request.user)
    else:
        article.like_users.add(request.user)
    return redirect('articles:index')