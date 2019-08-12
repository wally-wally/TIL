import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    arr = []
    for count in range(N):
        arr.append(input())
    # print(arr)

    result = ''
    for b in range(N):
        for i in range(N - M +1): # 가로줄 회문 검사
            if arr[N][i : i + M] == arr[N][i : i + M][::-1]:
                print('#{} {}'.format(a + 1, arr[N][i : i + M]))
                break

    if not result: # 가로줄로만 검사했는데도 회문이 안 나온 경우 세로줄 회문 검사 수행
        for j in range(N - M + 1):
            col_data = ''
            for c in range(M):
                col_data += arr[j][c]
            if col_data == col_data[::-1]:
                print('#{} {}'.format(a + 1, col_data))
                break
