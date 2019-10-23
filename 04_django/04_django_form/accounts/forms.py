from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth import get_user_model

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = get_user_model() # return User
        fields = ('email', 'first_name', 'last_name',)

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model() # auth.User를 바라보고 있는 것을 accounts.User를 바라볼 수 있도록 오버라이드 하게 해 줌.
        fields = UserCreationForm.Meta.fields + ('email',)