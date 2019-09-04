import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    ingredient_count, max_cal = list(map(int, input().split()))
    data = []
    for j in range(ingredient_count):
        each_data = list(map(int, input().split()))
        data.append(each_data)
    n = len(data)
    max_satisfaction = 0
    for subset in range(1 << n):
        cal_sum = 0
        ingrdient_data = []
        cal_data = []
        for j in range(n + 1):
            if subset & (1 << j):
                ingrdient_data.append(data[j][0])
                cal_data.append(data[j][1])
        cal_sum = sum(cal_data)
        if cal_sum <= max_cal:
            max_satisfaction = max(sum(ingrdient_data), max_satisfaction)
            result = max_satisfaction  
    print('#{} {}'.format(i+1, result))