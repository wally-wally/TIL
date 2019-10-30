def ssafy1(x):
    return x + 1

# Python에서 이름이 없는 함수로는 lambda 표현식이 있다.
# 한 줄의 함수식이 필요한 경우 사용된다.
ssafy2 = lambda x: x + 1
ssafy2(2)

list(map(ssafy1, [1, 2, 3])) # [2, 3, 4]가 출력
list(map(lambda x: x + 1, [1, 2, 3])) # 이렇게 해도 [2, 3, 4]가 출력