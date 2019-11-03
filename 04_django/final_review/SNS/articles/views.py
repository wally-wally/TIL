from django.shortcuts import render, redirect, get_object_or_404
from .models import Article, Comment, Hashtag
from .forms import ArticleForm, CommentForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib.auth import get_user_model

# Create your views here.
def index(request):
    visit_num = request.session.get('visit_num', 0) #
    request.session['visit_num'] = visit_num + 1 #
    request.session.modified = True #
    articles = Article.objects.all()
    context = {'articles': articles, 'visit_num': visit_num,}
    return render(request, 'articles/index.html', context)


@login_required
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False) #
            article.user = request.user #
            article.save() #
            # 해시태그 기능
            for word in article.content.split():
                if word.startswith('#'): #
                    hashtag, created = Hashtag.objects.get_or_create(content=word) #
                    article.hashtags.add(hashtag)
                    # hashtag = Hashtag.objects.get_or_create(content=word)
                    # article.hashtags.add(hashtag[0])
            return redirect(article)
    else:
        form = ArticleForm()
    context = {'form': form,}
    return render(request, 'articles/form.html', context)


def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comments = article.comment_set.all() #
    comment_form = CommentForm()
    person = get_object_or_404(get_user_model(), pk=article.user_id) #
    context = {'article': article, 'comments': comments, 'comment_form': comment_form, 'person': person}
    return render(request, 'articles/detail.html', context)


@require_POST
def delete(request, article_pk):
    if request.user.is_authenticated: #
        article = get_object_or_404(Article, pk=article_pk)
        if request.user == article.user:
            article.delete()
        else:
            return redirect(article)
    return redirect('articles:index')


@login_required
def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        if request.method == 'POST':
            form = ArticleForm(request.POST, instance=article)
            if form.is_valid():
                form.save()
                article.hashtags.clear() #
                for word in article.content.split():
                    if word.startswith('#'):
                        hashtag, created = Hashtag.objects.get_or_create(content=word)
                        article.hashtags.add(hashtag)
                return redirect(article)
        else:
            form = ArticleForm(instance=article)
    else:
        return redirect('articles:index')
    context = {'form': form, 'article': article,}
    return render(request, 'articles/form.html', context)


@require_POST
def comments_create(request, article_pk):
    if request.user.is_authenticated:
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False) #
            comment.article_id = article_pk #
            comment.user = request.user #
            comment.save() #
    return redirect('articles:detail', article_pk)


@require_POST
def comments_delete(request, article_pk, comment_pk):
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        comment.delete()
    return redirect('articles:detail', article_pk)


@login_required
def like(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if article.like_users.filter(pk=request.user.pk).exists(): #
    # if request.user in article.like_users.all():
        article.like_users.remove(request.user) #
    else:
        article.like_users.add(request.user) #
    return redirect('articles:index')


@login_required
def follow(request, article_pk, user_pk):
    person = get_object_or_404(get_user_model(), pk=user_pk) #
    if person != request.user:
        if request.user in person.followers.all(): #
        # if person.followers.filter(pk=user_pk).exists():
            person.followers.remove(request.user) #
        else:
            person.followers.add(request.user) #
    return redirect('articles:detail', article_pk)


# 해시태그 모아보기
def hashtag(request, hash_pk):
    hashtag = get_object_or_404(Hashtag, pk=hash_pk)
    articles = hashtag.article_set.order_by('-pk') #
    context = {'hashtag': hashtag, 'articles': articles,}
    return render(request, 'articles/hashtag.html', context)