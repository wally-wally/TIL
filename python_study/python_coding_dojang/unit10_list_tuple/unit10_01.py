# 1. 리스트 만들기

a = [38, 'hello', False, 185.3124]
print('====#1====')
print(a)

b_01 = []
print(b_01)
b_02 = list()
print(b_02)
# b_01과 b_02 모두 빈 리스트 만드는 구문

c_01 = list(range(10))
print(c_01)
c_02 = list(range(1, 11))
print(c_02)
c_03 = list(range(10, 0, -1))
print(c_03)


# 2. 튜플 사용하기

print('\n====#2====')
d_01 = (38, 'hello', False, 185.3124)
print(d_01)
d_02 = (37, ) # 요소가 한 개인 튜플 만들 때는 ,(콤마)를 붙인다.
print(d_02)

e_01 = tuple(range(5))
print(e_01)
e_02 = tuple(range(1, 6))
print(e_02)
e_03 = tuple(range(10, 0, -1))
print(e_03)


# 3. 튜플 <==> 리스트

print('\n====#3====')
f = [1, 2, 3]
print(tuple(f))
g = (4, 5, 6)
print(list(g))
h_01 = list('hello') # 문자열을 리스트에 넣으면 문자 하나하나가 리스트의 요소로 들어간다.(문자 리스트)
print(h_01)
h_02 = tuple('hello') # 문자열을 튜플에 넣으면 문자 하나하나가 튜플의 요소로 들어간다.(문자 튜플)
print(h_02)


# 4. 리스트와 튜플로 변수 만들기(리스트만 예시로 작성함)

print('\n====#4====')
p, q, r = [1, 2, 3]
print(p, q, r)

s = [7, 8, 9]
p, q, r = s
print(p, q, r)

k, m, n = input('숫자 세 개를 입력하세요: ').split()
print(k, m, n) # 이대로 출력하면 각 변수는 모두 str형 이므로 숫자로 사용하기 위해 map함수로 int형으로 바꿔줘야 한다.
print(type(k))

x, y, z = map(int, input('숫자 세 개를 입력하세요: ').split())
print(x, y, z)
print(type(x))