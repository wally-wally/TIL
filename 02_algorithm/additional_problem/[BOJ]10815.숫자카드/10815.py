import sys
sys.stdin = open('input.txt', 'r')

N = int(input())
number_list = list(map(int, input().split()))
M = int(input())
judge_list = list(map(int, input().split()))

for i in range(M):
    for j in range(N):
        if judge_list[i] == number_list[j]:
            judge_list[i] = '1'
            break
        if j == N-1 :
            judge_list[i] = '0'
print(' '.join(judge_list))