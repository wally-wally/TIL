# 1. 람다 표현식에서 조건부 표현식 사용하기
# lambda 매개변수들: 식1 if 조건식 else 식2
print('====#1====')
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
a_01 = list(map(lambda x: str(x) if x % 3 == 0 else x, a))
print(a_01)
# [주의!]람다 표현식 안에서 조건부 표현식 if, else를 사용할 때는 :(콜론)을 붙이지 않는다!
# [주의!]람다 표현식에서 if를 사용했다면 반드시 else를 사용해야 하고, elif를 사용할 수 없다.

b = [11, 12, 13, 14, 15, 16, 17]
b_01 = list(map(lambda x: str(x) if x == 11 else float(x) if x == 12 else x + 100, b))
print(b_01)

# 억지로 람다 표현식을 사용하기 보다는 그냥 def 함수를 만들고 if, elif, else를 사용하는 것을 권장한다.
c = [100, 200, 300, 400, 500, 600]
def f(k):
    if k == 100:
        return str(k)
    elif k % 3 == 0:
        return k + 10
    else:
        return float(k)
c_01 = list(map(f, c))
print(c_01)


# 2. map에 객체를 여러 개 넣기
m = [1, 2, 3, 4, 5]
n = [2, 4, 6, 8, 10]
mn_01 = list(map(lambda x, y: x * y, m, n))
print('\n====#2====')
print(mn_01)


# 3. filter 사용하기
# filter(함수, 반복_가능한_개체) : 반복 가능한 개체에서 특정 조건에 맞는 요소만 가져오는데 filter에 지정된 함수의 반환값이 true일 때만 해당 요소를 가져온다.
def func(x):
    return x > 5 and x < 10
p = [8, 3, 2, 10, 15, 7, 1, 9, 0, 11]
p_01 = list(filter(func, p))
print('\n====#3====')
print(p_01)
# list(filter(lambda x: x > 5 and x < 10, p))와 같은 의미


# 4. reduce 사용하기
"""
from functools import reduce
reduce(함수, 반복_가능한_개체)
 - 반복 가능한 개체의 각 요소를 지정된 함수로 처리한 뒤 이전 결과에 누적해서 반환하는 함수
 - reduce는 functools 모듈에서 reduce 함수를 가져와야 한다.
"""
from functools import reduce
def function(x, y):
    return x + y
q = [1, 2, 3, 4, 5]
q_01 = reduce(function, q)
print('\n====#4====')
print(q_01)
# reduce(lambda x, y: x + y, a)와 같은 의미

# 실제로는 reduce 대신에 for 반복문으로 표현하는 것이 좋다.
q = [1, 2, 3, 4, 5]
r =  q[0]
for i in range(len(q) - 1):
    r = r + q[i + 1]
print(r)