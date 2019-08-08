import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    line, fly_catcher = list(map(int, input().split()))
    arr = []
    for a in range(line):
        element = list(map(int, input().split()))
        arr.append(element)
    max_fly_count = 0
    for j in range(line-fly_catcher+1):
        for k in range(line-fly_catcher+1):
            fly_count = 0
            for m in range(j, fly_catcher+j):
                for n in range(k, fly_catcher+k):
                    fly_count += arr[m][n]
            max_fly_count = max(max_fly_count, fly_count)
    print('#{} {}'.format(i+1, max_fly_count))