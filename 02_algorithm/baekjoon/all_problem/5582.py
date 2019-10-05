import sys
sys.stdin = open('input_5582.txt', 'r')

# pypy3
str_A = input()
str_B = input()
DP = [[0 for _ in range(len(str_B) + 1)] for __ in range(len(str_A) + 1)]
answer = 0
for i in range(1, len(str_A) + 1):
    for j in range(1, len(str_B) + 1):
        if str_A[i - 1] == str_B[j - 1]:
            DP[i][j] = DP[i - 1][j - 1] + 1
            answer = max(answer, DP[i][j])
print(answer)