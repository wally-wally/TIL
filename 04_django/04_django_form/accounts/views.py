from IPython import embed
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from .forms import CustomUserChangeForm, CustomUserCreationForm
from articles.models import Article, Comment

# Create your views here.
def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        # embed()
        if form.is_valid():
            # form.save()를 통해 반환된 User 클래스의 인스턴스를 auth_login의 인자로 전달하게 된다.
            user = form.save()
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)

def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST) # request 인자 부터 쓰는 것 주의!(들어가는 순서가 form마다 다르다!)
        # 이 자리에서는 embed()해도 아무 소용이 없다.
        if form.is_valid():
            # embed()
            # 세션 만드는 과정(https://docs.djangoproject.com/en/2.2/topics/auth/default/#how-to-log-a-user-in)
            auth_login(request, form.get_user()) # form.get_user() : user 정보
            # get_user() 메서드는 AuthenticationForm으로 만든 form에서만 사용 가능
            # embed()
            return redirect(request.GET.get('next') or 'articles:index')
    else:
        form = AuthenticationForm()
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)

def logout(request):
    auth_logout(request)
    return redirect('articles:index')

@require_POST
def delete(request):
    request.user.delete()
    return redirect('articles:index')

@login_required
def update(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user) # 키워드 인자이므로 instance를 반드시 명시해줘야 한다.
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user) # 키워드 인자이므로 instance를 반드시 명시해줘야 한다.
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)

@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST) # 인자 순서 주의!!!(이거만 request.user가 먼저 나옴)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user) # 인자 순서 주의!!!
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)

def profile(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    # person.article_set.all(), person.comment_set.all()을 view에서 context로 안 보내고
    # profile.html template에서 for문의 iterable한 객체로 바로 넣어도 된다.
    # 이미 context로 person을 보냈으므로 인식이 가능!
    context = {'person': person,}
    return render(request, 'accounts/profile.html', context)