# 1. 세트 만들기

print('====#1====')
animals = {'dog', 'cat', 'pig', 'cow', 'horse'}
print(animals)

fruits = {'apple', 'apple', 'watermelon'}
print(fruits) # 세트에 들어가는 요소는 중복될 수 없으므로 두 개 넣어도 실제로는 한 개만 들어간다.

"""
 - 세트는 리스트, 튜플, 딕셔너리와는 달리 [](대괄호)로 특정 요소만 출력할 수 없다.
 - print(animals[0])과 같이 'dog'만을 출력할 수 없다.
"""

print('dog' in animals)
print('zebra' not in animals)
print('grape' in fruits)
print('peach' not in fruits)


# 2. set를 사용하여 세트 만들기

print('\n====#2====')
a = set('apple') # 영문 문자열을 세트로 만들면 유일한 문자인 'a', 'p', 'l', 'e'만 세트로 만들어진다.
print(a)
print(sorted(a)) # 세트의 내용을 정렬하고 싶으면 sorted를 사용한다.(단, 자료형은 리스트형으로 바뀐다.)
b = set(range(5))
print(b)
c = set() # 빈 세트를 만들기 위해서는 {} 대신에 set()을 사용한다.({}은 딕셔너리로 인식될 수 있기 때문)

"""
 - 세트는 리스트, 딕셔너리와 달리 세트 안에 세트를 넣을 수 없다.
 - a = {{1, 2}, {3, 4}}와 같이 작성 불가능
"""


# 3. 프로즌 세트(frozenset) == 내용을 변경할 수 없는 세트

"""
 - frozenset은 집합 연산과 메소드에 요소를 추가하거나 삭제하는 연산, 메소드는 사용할 수 없다.
 - frozenset은 세트 안에 세트를 넣고 싶을 때 사용한다.(단, frozenset만 넣을 수 있고, 일반 set은 넣을 수 없다.)
"""
print('\n====#3====')
d = frozenset(range(7))
print(d)
e = frozenset({frozenset({1, 2}), frozenset({3, 4})})
print(e)