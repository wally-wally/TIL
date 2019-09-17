import sys
sys.stdin = open('input_5201.txt', 'r')

for test_case in range(int(input())):
    N, M = map(int, input().split())
    container_list = sorted(list(map(int, input().split())), reverse = True)
    truck_list = sorted(list(map(int, input().split())), reverse = True)
    result, k, j = 0, 0, 0
    for i in range(N):
        if container_list[i] <= truck_list[j]:
            result += container_list[i]
            j += 1
        if j == M: break
    print('#{} {}'.format(test_case + 1, result))