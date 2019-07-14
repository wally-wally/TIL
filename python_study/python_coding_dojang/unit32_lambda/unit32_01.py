# 1. 람다 표현식으로 함수 만들기
print('====#1====')
plus_ten = lambda x: x + 10
print(plus_ten(1))

"""
 - lanbda 표현식은 이름이 없는 함수 즉, 익명 함수 이므로 이를 호출하려면 변수에 할당해주면 된다.
"""


# 2. 람다 표현식 자체를 호출하기
print('====#2====')
result_02 = (lambda x: x + 10)(1)
print(result_02)

# cf) 람다 표현식 안에서는 변수를 만들 수 없다.(반드시 람다 표현식 밖에서 선언!)
print('====#2-(cf)====')
y = 10
result_03 = (lambda x: x + y)(1)
print(result_03)


# 3. 람다 표현식을 인수로 사용하기
print('====#3====')
def add_ten(x):
    return x + 10

list_03 = list(map(add_ten, [1, 2, 3]))
print(list_03)
