T = int(input())
for i in range(T):
    sum = 0
    for j in list(map(int, input().split())):
        sum += j
    print('#{} {}'.format(i+1, round(sum/10)))