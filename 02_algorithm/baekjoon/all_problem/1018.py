import sys
sys.stdin = open('input.txt', 'r')

M, N = map(int, input().split())
arr = []
for _ in range(M):
    arr.append(input())
# print(arr)

case = [['WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW'],
        ['BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB']]

painting_count = 64 # 8 X 8 체스판을 모두 색칠해야하는 경우가 max라고 초기값 설정 후 시작

for i in range(M - 8 + 1): # 시작위치 설정
    for j in range(N - 8 + 1): # 시작위치 설정
        compare_list = []
        for k in range(i, i + 8):
            compare_list.append(arr[k][j : j + 8])
        # print(compare_list)
        for x in range(2):
            now_painting = 0
            for a in range(8):
                for b in range(8):
                    if compare_list[a][b] != case[x][a][b]:
                        now_painting += 1
            painting_count = min(painting_count, now_painting)

print(painting_count)