from django.shortcuts import render, redirect, get_object_or_404
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import get_user_model

# 1. 회원가입
def signup(request):
    if request.user.is_authenticated: #
        return redirect('articles:index')
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)


# 2. 로그인
def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST) #
        if form.is_valid():
            auth_login(request, form.get_user()) #
            return redirect('articles:index')
    else:
        form = AuthenticationForm()
    context = {'form': form,}
    return render(request, 'accounts/login.html', context)


# 3. 로그아웃
def logout(request):
    auth_logout(request)
    return redirect('articles:index')
    

# 4. 회원탈퇴
@require_POST
def delete(request):
    request.user.delete()
    return redirect('articles:index')    


# 5. 회원정보 수정
@login_required
def update(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user) #
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user) #
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)


# 6. 비밀번호 변경
@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST) #
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user) #
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user) #
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)


# 7. 내 프로필 페이지 -- articles app을 모두 구성한 후 마지막에 작성해보자
def profile(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    context = {'person': person,}
    return render(request, 'accounts/profile.html', context)