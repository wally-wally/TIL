# C-style
S = [0] * 3  # 저장소
top = -1     # 마지막에 저장된 자료의 인덱스

def push(item):
    global top
    # 넣기 전에 full 상태를 체크
    if top == 2:
        return
    top += 1
    S[top] = item

def pop():
    global top
    # empty 상태 체크
    if top == -1:
        return
    ret = S[top]
    top -= 1
    return ret

for i in range(3): # 3 대신 4로 하면 Error 발생
    push(i)

print(pop())
print(pop())
print(pop()) # pop 한 번 더 하면 Error 발생

############################

# Python-style
import time
start = time.time()
S = []

def push(item):
    S.append(item)

def pop(): # pop을 할 때는 항상 empty 상태를 체크한다.
    return S.pop()

def isEmpty(): # 직접 이렇게 함수를 안 만들고 empty 상태를 체크해도 된다.
    return len(S) == 0

for i in range(3):
    push(i)

while not isEmpty():
    pop()

print('실행 시간 = ', time.time() - start)


##################################


# 데크 사용
from collections import deque
import time
start = time.time()
S = deque()
N = 1000000
for i in range(N):
    S.append(i)
while S:
    S.pop()
print('실행 시간 = ', time.time() - start)