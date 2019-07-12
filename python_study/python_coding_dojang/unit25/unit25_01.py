# 1. 딕셔너리에 키와 기본값 저장하기

x = {'a': 10, 
     'b': 20,
     'c': 30,
     'd': 40
    } # 딕셔너리 선언
x.setdefault('e', 123)
print('====#1====')
print(x)


# 2. 딕셔너리에서 키의 값 수정하기
print('\n====#2====')

x.update(e=50)
print(x)

x.update(e=40, f=100)
print(x)

x.update([['a', 'ONE'], ['b', 'TWO']]) # 리스트를 이용하기
print(x)

x.update(zip(['c', 'd'], ['apple', 'grape'])) # zip 객체 이용하기
print(x)

"""
 - setdefault : 키-값 쌍 추가O, 수정X
 - update : 키-값 쌍 추가O, 수정X
"""


# 3. 딕셔너리에 내용 추가하기
print('\n====#3====')

x['g'] = 'goal'
print(x)


# 4. 딕셔너리에서 키-값 쌍 삭제하기
print('\n====#4====')

x.pop('a') # 키 'a'를 삭제한 뒤 10을 반환
print(x)

x.pop('s', 0) # 키가 없을 때는 지정한 기본값만 반환
print(x)

del x['c']
print(x)


# 5. 딕셔너리에서 키-값 쌍 모두 가져오기
print('\n====#5====')

print(x.items())
print(x.keys())
print(x.values())


# 6. 딕셔너리에서 특정 값 가져오기(ex. 'f'에 해당하는 값은?)
print('\n====#6====')

print(x.get('f'))


# 7. 리스트와 튜플로 딕셔너리 만들기
list_test = ['k', 'l', 'm', 'n']
li_01=dict.fromkeys(list_test, 300)

print('\n====#7====')

print(li_01)


# 심화내용. lambda 표현식을 사용하여 기본값 생성 함수 만들기
from collections import defaultdict
z = defaultdict(lambda: 'I am default.')
z['a']

print('\n====upgrade01====')
print(z)