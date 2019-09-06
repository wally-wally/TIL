import sys
import queue

def find():
    pot = queue.Queue()
    
    for i in range(1, N+1):         # 화덕에 N개를 채움
        pot.put(i)
    idx = N+1                           # 아직 화덕에 넣지않은 피자
    t = 0
    while pot.empty()==False:
        t = pot.get()                   # 입구로 돌아온 피자를 꺼내 치즈 확인
        if arr[t]//2 != 0:              # 치즈가 남아있으면
            arr[t] //= 2
            pot.put(t)                  # 다시 넣고
        elif idx<=M:                 # 치즈가 다 녹았으면 남은 피자를 넣음
            pot.put(idx)
            idx += 1
    return t                            # 마지막으로 나온 피자 번호

sys.stdin = open('input.txt', 'r')
T = int(input())
for tc in range(1, T+1):
    N, M = map(int, input().split())
    arr = [0]+list(map(int, input().split()))
    print('#{} {}'.format(tc, find()))
    

  
