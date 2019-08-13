import sys
sys.stdin = open('input.txt', 'r')

N, C = map(int, input().split())
home_position = []
for i in range(N):
    data = int(input())
    home_position.append(data)
sorted_home = sorted(home_position)
print(sorted_home)

start, end = sorted_home[0], sorted_home[N-1]
final_judge = [0]
re_C = C
for j in range(N - re_C):
    compare_list = []
    vir_max_interval = (start + end) / (re_C - 1)
    print(start, end, re_C, vir_max_interval)
    if not j:
        criteria_num = start + vir_max_interval
    else:
        criteria_num = vir_max_interval
    for k in range(N):
        compare_list.append(abs(criteria_num - sorted_home[k]))
    print(compare_list)
    start_position = compare_list.index(min(compare_list))
    final_judge.append(start_position)
    if re_C != 3:
        re_C -= 1
        start = sorted_home[start_position]
    else:
        break
final_judge.append(N-1)
print(final_judge)

distance_list = []
for m in range(C-1):
    distance_list.append(sorted_home[final_judge[m+1]] - sorted_home[final_judge[m]])
print(distance_list)
print(min(distance_list))