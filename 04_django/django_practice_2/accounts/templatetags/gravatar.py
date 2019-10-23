import hashlib
from django import template

register = template.Library()

@register.filter # 기존의 템플릿 라이브러리에 아래의 함수(custom filter)가 추가된다는 의미인 decorator
def makemd5(email): # {{ email | ssafy }} 와 같은 경우 필터 앞에 있는 왼쪽에 있는 값
    return hashlib.md5(email.encode('utf-8').lower().strip()).hexdigest()