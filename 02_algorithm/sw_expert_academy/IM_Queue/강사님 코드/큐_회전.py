
T = int(input())
for tc in range(1, T+1):
    N, M = map(int, input().split())
    arr = list(map(int, input().split()))          # 수열을 리스트에 저장
    for i in range(M):                             # M번 숫자 이동 반복
        t = arr.pop(0)                             # 맨 앞 원소를 꺼내
        arr.append(t)                              # 맨 뒤에 추가
    print('#{} {}'.format(tc, arr.pop(0)))
    

  
