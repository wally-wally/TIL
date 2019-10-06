import sys
sys.stdin = open('input_1463.txt', 'r')

N = int(input())
DP = [0, 0] + [0] * (N - 1)
for i in range(2, N + 1):
    DP[i] = DP[i - 1] + 1 # 1 빼는 연산 기본적으로 삽입 후 2로 나누는 연산과 3으로 나누는 연산일 때 연산 수행 횟수를 비교한다.
    if not i % 2:
        DP[i] = min(DP[i], DP[i // 2] + 1) # 2로 나누는 연산과 1 빼는 연산 횟수 중 최솟값
    if not i % 3:
        DP[i] = min(DP[i], DP[i // 3] + 1) # 3으로도 나눌 수 있는 경우가 있으므로 3으로 나누는 연산과 1 빼는 연산 횟수 중 최솟값
print(DP[N])