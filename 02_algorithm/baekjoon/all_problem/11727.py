import sys
sys.stdin = open('input_11727.txt', 'r')

# 1 정답 숫자 보고 규칙찾기
N = int(input())
num = 0
result = 1
sign = -1
while True:
    num += 1
    if N == num:
        print(result % 10007)
        break
    else:
        value = result
        sign *= -1
        result = value * 2 + sign

# 2 DP(가장 바람직한 방법)
N = int(input())
DP = [0] * (N + 1)
DP[0] = DP[1] = 1
for i in range(2, N + 1):
    DP[i] = (DP[i - 1] + DP[i - 2] * 2) % 10007
print(DP[N])