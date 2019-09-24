import sys
sys.stdin = open('input_5207.txt', 'r')

def binary_search(lo, hi, num, direct):
    global result
    mid = (lo + hi) >> 1
    if lo > hi:
        return
    if num == list_A[mid]:
        result += 1
        return
    else:
        if num < list_A[mid]:
            if direct == 0 or direct == 2:
                direct = 1
                binary_search(lo, mid - 1, num, direct)
                return
            else:
                return
        elif num > list_A[mid]:
            if direct == 0 or direct == 1:
                direct = 2
                binary_search(mid + 1, hi, num, direct)
                return
            else:
                return

for test_case in range(int(input())):
    N, M = map(int, input().split())
    list_A = sorted(list(map(int, input().split())))  # 문제 좀 똑바로 읽자...
    list_B = list(map(int, input().split()))
    result = 0
    for m_number in list_B:
        direction = 0
        if m_number in list_A:
            binary_search(0, N - 1, m_number, direction)
    print('#{} {}'.format(test_case + 1, result))