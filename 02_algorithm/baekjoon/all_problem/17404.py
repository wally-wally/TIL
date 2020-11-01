import sys
sys.stdin = open('input_17404.txt', 'r')

def RGB_distance(color_idx, n):
    for idx in range(3):
        DP[0][idx] = arr[0][idx] if color_idx == idx else  0xffffffff
    for i in range(1, n):
        for j in range(3):
            DP[i][j] = min(DP[i - 1][(j + 1) % 3], DP[i - 1][(j + 2) % 3]) + arr[i][j]
    return DP[-1]

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
answer = 0xffffffff

# 첫 번째 집의 색이 R, G, B일 때 각각 모두 고려
# color_idx = 0(R), 1(G), 2(B)
for color_idx in range(3):
    DP = [[0, 0, 0] for _ in range(N)]
    for (idx, value) in enumerate(RGB_distance(color_idx, N)):
        if color_idx != idx:
            answer = min(answer, value)
print(answer)