from IPython import embed
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

# Create your views here.
def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        # embed()
        if form.is_valid():
            # form.save()를 통해 반환된 User 클래스의 인스턴스를 auth_login의 인자로 전달하게 된다.
            user = form.save()
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = UserCreationForm()
    context = {'form': form,}
    return render(request, 'accounts/signup.html', context)

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
    return render(request, 'accounts/login.html', context)

def logout(request):
    auth_logout(request)
    return redirect('articles:index')