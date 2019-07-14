# 1. 딕셔너리 만들기(1)

print('====#1====')
lux = {
    'health': 490,
    'mana': 334,
    'melee': 550,
    'armor': 18.72
}
print(lux)

my_info = {
        'name': 'wally',
        'age': 12345,
        'skills': ['python', 'web'],
}
print(my_info)
"""
 - 딕셔너리의 키(key)는 문자열뿐만 아니라 정수, 실수, 불도 사용할 수 있으며 자료형을 섞어서 사용해도 된다.
 - 값(value)에는 리스트, 딕셔너리 등을 포함하여 모든 자료형을 사용할 수 있다.
 - 단, 키에는 리스트와 딕셔너리를 사용할 수 없다.
"""

x = {} # 빈 딕셔너리 만들기(1)
y = dict() # 빈 딕셔너리 만들기(2)


# 2. 딕셔너리 만들기(2)

print('\n====#2====')
menus = dict(한식집='김치찌개', 중국집='자장면', 일식집='초밥')
"""
<위 딕셔너리와 같은 의미를 같은 딕셔너리 구문>
 - menus = dict(zip(['한식집', '중국집', '일식집'], ['김치찌개', '자장면', '초밥']))
 - menus = dict([('한식집', '김치찌개'), ('중국집', '자장면'), ('일식집', '초밥')])
"""
print(menus)


# 3. 딕셔너리의 키에 접근하고 값 할당하기

print('\n====#3====')
school = {
    'class_A' : {
        'wally' : 27,
        'simpson' : 25,
        'diva' : 30
    }
}

# (1) simpson의 나이는?
print(school['class_A']['simpson'])
print(school.get('class_A').get('simpson')) # 둘이 같은 결과

# (2) class_A에 나이가 20살인 'dao' 추가하기
school['class_A']['dao'] = 20
print(school.get('class_A'))

# (3) class_A의 wally의 나이는 26으로 바꾸기
school['class_A']['wally']=26
print(school.get('class_A'))

# (4) school 딕셔너리 안에 class_A가 있는지 확인
print('class_A' in school)

# (5) class_A의 딕셔너리의 키 개수 구하기
print(len(school.get('class_A')))