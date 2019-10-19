import sys
sys.stdin = open('input_1551.txt', 'r')

N, K = map(int, input().split())
A_list = list(map(int, input().split(',')))
B_list = []
for _ in range(K):
    for idx in range(len(A_list) - 1):
        B_list.append(A_list[idx + 1] - A_list[idx])
    A_list, B_list = B_list, []
for i in range(len(A_list)):
    if i != len(A_list) - 1:
        print(A_list[i], end=',')
    else:
        print(A_list[i])