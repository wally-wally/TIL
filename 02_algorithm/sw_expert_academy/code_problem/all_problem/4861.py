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
            if arr[b][i : i + M] == arr[b][i : i + M][::-1]:
                print('#{} {}'.format(a + 1, arr[b][i : i + M]))
                break

    if not result: # 가로줄로만 검사했는데도 회문이 안 나온 경우 세로줄 회문 검사 수행
        for j in range(N):
            for k in range(N - M + 1):
                col_data = ''
                for c in range(k, k + M):
                    col_data += arr[c][j]
                # print(col_data)
                if col_data == col_data[::-1]:
                    print('#{} {}'.format(a + 1, col_data))
                    break

'''
# 회문 조사 방법
# 가능한 모든 경우를 조사하는 방법
arr = []
N = M = 0 # N : 행의 길이, M : 찾을 회문 길이
# 시작위치 0 ~ N-M
for row in range(N):
    for start in range(N - M + 1):
        end = start + M - 1
        for i in range(M//2):
            if arr[row][start + i] != arr[row][end - i]:
                break
        else:
            # 회문을 찾음.
'''