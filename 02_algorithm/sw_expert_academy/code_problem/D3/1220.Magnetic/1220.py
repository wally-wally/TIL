import sys
sys.stdin = open('input.txt', 'r')

for i in range(10):
    line = int(input())
    arr = [list(map(int, input().split())) for _ in range(line)]

    deadlock_count = 0
    for a in range(line):
        deadlock_start = 0
        for b in range(line):
            if arr[b][a] & 1:
                deadlock_start = 1
            if deadlock_start and arr[b][a] == 2:
                deadlock_count += 1
                deadlock_start = 0

    print('#{} {}'.format(i + 1, deadlock_count))