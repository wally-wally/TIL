from IPython import embed
from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from django.views.decorators.http import require_POST
from .models import Article, Comment
from .forms import ArticleForm, CommentForm

# Create your views here.
def index(request):
    articles = Article.objects.all()
    context = {'articles': articles,}
    return render(request, 'articles/index.html', context)


def create(request):
    # embed()
    if request.method == 'POST':
        # form 인스턴스를 생성하고 요청에 의한 데이터를 인자로 받는다. (binding 작업)
        # 이 처리과정은 binding 이라고 불리며 유효성 체크를 할 수 있도록 해준다.
        form = ArticleForm(request.POST) # request.POST로 데이터를 통째로 받아 알아서 매칭하게 해준다.
        # embed()
        # 유효성 검증
        # form 이 유효한지 체크한다. (ex. blank=False와 같은 DB와 관련된 유효성 내용들)
        if form.is_valid():
            article = form.save()
            # form.cleaned_data 로 정제된 데이터를 받는다.
            # title = form.cleaned_data.get('title')
            # content = form.cleaned_data.get('content')
            # article = Article.objects.create(title=title, content=content)  위에서 이미 유효성 검증이 끝났으므로 save() 필요없이 create()로 저장한다.
        # django form을 작성하면 아래 네 줄은 필요가 없다.
        # title = request.POST.get('title')
        # content = request.POST.get('content')
        # article = Article(title=title, content=content)
        # article.save()
            return redirect(article)
            # 원래는 'articles:detail', article.pk 라고 써야 하지만 get_absolute_url을 적용하면 article 그냥 객체 이름만 넣어도 된다.
    else:
        form = ArticleForm()
    # 상황에 따라 context에 넘어가는 2가지 form
    # 1. GET 방식일 때 form : 기본 form으로 넘겨줌
    # 2. POST 방식일 때 form : 검증에 실패 후의 form(is_valid == False인 경우)
    context = {'form': form,}
    return render(request, 'articles/form.html', context) # 반드시 이 줄과 윗 줄은 if~else문 밖으로 나와야 한다.

    
def detail(request, article_pk):
    # try:
    #     article = Article.objects.get(pk=article_pk)
    # except Article.DoesNotExist:
    #     raise Http404('No Article matches the given query.')
    # context = {'article': article,}
    # return render(request, 'articles/detail.html', context)
    article = get_object_or_404(Article, pk=article_pk)
    comments = article.comment_set.all() # article의 모든 댓글
    comment_form = CommentForm() # 댓글 form
    context = {'article': article, 'comment_form': comment_form, 'comments': comments,}
    return render(request, 'articles/detail.html', context)


@require_POST
def delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    article.delete()
    return redirect('articles:index')


def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article) # binding 작업 (instance : modelform에서 initial의 역할)
        if form.is_valid(): # 유효성 검증
            # article.title = form.cleaned_data.get('title') # 가져온 데이터(article.title)에 바꿔서 넣어준다.
            # article.content = form.cleaned_data.get('content') # 가져온 데이터(article.content)에 바꿔서 넣어준다.
            article = form.save()
            return redirect(article)
    else:
        # embed()
        # ArticleForm 을 초기화 (이전에 DB에 저장된 데이터를 넣어준 상태)
        # form = ArticleForm(initial={'title': article.title, 'content': article.content}) # initial : 기존의 값을 가져온다(딕셔너리 형태로!)
        # __dict__ : article 객체 데이터를 딕셔너리 자료형으로 변환
        # form = ArticleForm(initial=article.__dict__)
        form = ArticleForm(instance=article)
        # 위와 같이 복잡한 한 줄은 매직 머서드(__dict__)로 줄여서 쓸 수 있다.
    # 1. POST 방식일 때 넘어오는 form => 검증에 실패한 form(오류 메세지도 포함된 상태의 form)
    # 2. GET 방식일 때 넘어오는 form => 초기화된 form
    context = {'form': form, 'article': article,}
    return render(request, 'articles/form.html', context) # 서로 form을 쓰므로 create.html을 빌려와서 쓴다.(template은 공유하는 상태)


@require_POST
def comments_create(request, article_pk):
    comment_form = CommentForm(request.POST) # request.POST => POST방식으로 들어온 모든 데이터
    if comment_form.is_valid():
        # commit=False => 객체를 Create 하지만, db에 레코드는 작성하지 않는다.
        comment = comment_form.save(commit=False)
        comment.article_id = article_pk
        comment.save()
    return redirect('articles:detail', article_pk)


@require_POST
def comments_delete(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    comment.delete()
    return redirect('articles:detail', article_pk)