from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import update_session_auth_hash
from .forms import CustomUserCreationForm

# Create your views here.
def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index') # 로그인 되어 있으면 회원가입할 필요 없음
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user) # 위에서 form.save()를 user라는 변수를 지정한 후
            # 회원가입 동시에 로그인 상태가 유지되도록 구현함
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)

def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST) # 인자 두개 들어가며 순서 주의
        if form.is_valid():
            auth_login(request, form.get_user()) #
            return redirect('articles:index')
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
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST) # 인자 순서 주의
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user) # 비번변경후 로그인 상태 유지
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user) #인자 하나 들어감 주의
    context = {'form': form,}
    return render(request, 'accounts/auth_form.html', context)