import sys
sys.stdin = open('input_17140.txt', 'r')

r, c, k = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(3)]
calc_time = 0
while calc_time <= 100:
    if (len(arr) >= r and len(arr[0]) >= c) and (arr[r - 1][c - 1] == k): break
    calc_time += 1
    num_cnt_distributions, max_criteria = [], 0
    if len(arr) >= len(arr[0]):  # (1) R 연산
        for r_idx in range(len(arr)):
            num_cnt_distribution = []
            for num in set(filter(lambda x: x != 0, arr[r_idx])):
                num_cnt_distribution.append([num, arr[r_idx].count(num)])
            max_criteria = max(max_criteria, len(num_cnt_distribution) * 2)
            if max_criteria > 100:
                max_criteria = 100
            num_cnt_distributions.append(sorted(num_cnt_distribution, key=lambda x: (x[1], x[0])))
        new_arr = []
        for num_dist in num_cnt_distributions:
            temp_row_line = []
            for nums in num_dist:
                temp_row_line.extend(nums)
                if len(temp_row_line) == 100:
                    break
            temp_row_line += [0] * (max_criteria - len(temp_row_line))
            new_arr.append(temp_row_line)
    else:  # (2) C 연산
        for c_idx in range(len(arr[0])):
            numbers = []
            for r_idx in range(len(arr)):
                if arr[r_idx][c_idx] > 0:
                    numbers.append(arr[r_idx][c_idx])
            num_cnt_distribution = []
            for num in set(numbers):
                num_cnt_distribution.append([num, numbers.count(num)])
            max_criteria = max(max_criteria, len(num_cnt_distribution) * 2)
            if max_criteria > 100:
                max_criteria = 100
            num_cnt_distributions.append(sorted(num_cnt_distribution, key=lambda x: (x[1], x[0])))
        new_arr = [[] for _ in range(max_criteria)]
        for num_dist in num_cnt_distributions:
            row_idx = 0
            for nums in num_dist:
                new_arr[row_idx].append(nums[0])
                row_idx += 1
                new_arr[row_idx].append(nums[1])
                row_idx += 1
                if row_idx == 100:
                    break
            if row_idx < max_criteria:
                for i in range(row_idx, max_criteria):
                    new_arr[i].append(0)
    arr = new_arr

print(calc_time if calc_time <= 100 else -1)