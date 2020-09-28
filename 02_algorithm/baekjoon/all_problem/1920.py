import sys
sys.stdin = open('input_1920.txt', 'r')

def binary_search(target_number, start, end):
    if start > end:
        return 0

    mid = (start + end) // 2

    if N_numbers[mid] == target_number:
        return 1
    elif N_numbers[mid] > target_number:
        end = mid - 1
    else:
        start = mid + 1
    
    return binary_search(target_number, start, end)


N = int(input())
N_numbers = sorted(list(map(int, input().split())))

M = int(input())
M_numbers = list(map(int, input().split()))

for number in M_numbers:
    print(binary_search(number, 0, N - 1))