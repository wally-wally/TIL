import sys
sys.stdin = open('input_1026.txt', 'r')

N = int(input())
A = sorted(list(map(int, input().split())))
B = sorted(list(map(int, input().split())), reverse=True)
print(sum([A[idx] * B[idx] for idx in range(N)]))