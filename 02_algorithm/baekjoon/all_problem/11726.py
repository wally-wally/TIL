import sys
sys.stdin = open('input_11726.txt', 'r')

# 피보나치 함수를 DP로 구현하는 것과 동일한 원리
N = int(input())
DP = [0] * (N + 1)
DP[0] = DP[1] = 1
for i in range(2, N + 1):
    DP[i] = (DP[i - 1] + DP[i - 2]) % 10007
print(DP[N])