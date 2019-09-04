T = int(input())

for i in range(T):
    num_list = list(map(int, input().split()))
    print('#{} {}'.format(i+1, max(num_list)))