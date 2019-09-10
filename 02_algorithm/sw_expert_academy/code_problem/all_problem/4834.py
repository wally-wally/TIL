import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
for i in range(T):
    N = int(input())
    cards = input()

    arr = [0] * 10

    for card in cards:
        arr[int(card)] += 1

    max_location = 0
    max_count = arr[max_location]
    for j in range(1, 10):
        if arr[j] >= max_count:
            max_count = arr[j]
            max_location = j
    print('#{} {} {}'.format(i + 1, max_location, max_count))