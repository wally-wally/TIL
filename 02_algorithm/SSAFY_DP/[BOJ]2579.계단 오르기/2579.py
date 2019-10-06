import sys
sys.stdin = open('input_2579.txt', 'r')

stairs = int(input())
scores = [0] + [int(input()) for _ in range(stairs)]
DP = [0] * (stairs + 1)
for i in range(stairs + 1):
    if i <= 2:
        DP[i] = sum(scores[: i + 1])
    elif i == 3:
        DP[i] = max(scores[2] + scores[3], scores[1] + scores[3])
    else: # 이 부분이 중요 (i 번째 칸으로 올라올 수 있는 두 가지 경우 중 가장 큰 값을 선정)
        DP[i] = max(DP[i - 2] + scores[i], DP[i - 3] + scores[i - 1] + scores[i])
print(DP[stairs])