import sys
sys.stdin = open('input_1931.txt', 'r')

N = int(input())
all_time = sorted([list(map(int, input().split())) for _ in range(N)], key = lambda x: (x[1], x[0]))

criterion = all_time[0]
result = 1
for idx in range(1, N):
    if criterion[1] <= all_time[idx][0]:
        criterion = all_time[idx]
        result += 1
print(result)