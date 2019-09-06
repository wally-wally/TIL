import sys
sys.stdin = open('input.txt')

TC = int(input())

for tc in range(1, TC+1):
    N,M = map(int, input().split())
    Data = list(map(int, input().split()))
    Q = []
    for i in range(N):  # 화덕에 N개를 채움
        Q.append([Data[i], i])

    i = 0
    while len(Q)!=1:  # 큐에 하나가 남을때까지 반복
        Q[0][0] //= 2  # 치즈를 절반으로 줄임

        if Q[0][0] == 0:  # 치즈가 다 녹았으면
            if N+ i < M:
                Q.pop(0)
                Q.append([Data[N+i], N+i])  #새로운 피자 넣기
                i+=1
            elif N+i >= M:  # 더 넣을 피자가 없으면
                Q.pop(0)
        else:
            Q.append(Q.pop(0))

    print(f'#{tc} {Q[0][1]+1}')
