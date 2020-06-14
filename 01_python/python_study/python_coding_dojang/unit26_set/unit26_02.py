# 1. 집합 연산 사용하기

print('====#1====')
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b) # 합집합(union) 표현(1)
print(set.union(a, b)) # 합집합(union) 표현(2)

print(a & b) # 교집합(intersection) 표현(1)
print(set.intersection(a, b)) # 교집합(intersection) 표현(2)

print(a - b) # 차집합(difference) 표현(1)
print(set.difference(a, b)) # 차집합(difference) 표현(2)

print(a ^ b) # 대칭차집합(배타적 논리합, XOR)(symmetric_difference) 표현(1)
print(set.symmetric_difference(a, b)) # 대칭차집합(배타적 논리합, XOR)(symmetric_difference) 표현(2)


# 2. 집합 연산 후 할당 연산자 사용하기
"""
 - 세트 자료형에 |, &, -, ^ 연산자와 할당 연산자 =을 함께 사용하면 집합 연산의 결과를 변수에 다시 저장(할당)함.
 - 또는 update 메소드를 사용하여 할당함.
"""
print('\n====#2====')
a.update({6})
print(a)

a.intersection_update({0, 1, 2, 3, 4})
print(a)

c = {10, 20, 30, 40}
d = {30, 40, 50, 60}

c.difference_update({30})
print(c) # {10, 20, 40}

d.symmetric_difference_update(c)
print(d)


# 3. 세트가 겹치지 않는지 확인하기

print('\n====#3====')
e = {1, 2, 3, 4}
print(e.isdisjoint({5, 6, 7, 8}))
print(e.isdisjoint({3, 4, 5, 6}))


# 4. 세트 조작하기

print('\n====#4====')
k = {1, 2, 3, 4}
k.add(5) # 요소 추가
print(k)

k.remove(3) # 요소 제거
print(k)

k.discard(2) # 특정 요소 제거하고 요소가 없으면 그냥 넘어감
print(k)
k.discard(3)
print(k)

k.pop() # 임의의 요소를 삭제하고 해당 요소를 반환함. 만약 요소가 없으면 에러 발생
print(k)

print(f'세트의 길이는 {len(k)}') # 세트의 요소 개수(길이)

m = k.copy() # copy 메소드로 세트 k와 m을 완전히 같은 두 개로 만듬
print(m)