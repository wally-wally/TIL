import sys
sys.stdin = open('input_1966.txt', 'r')

for _ in range(int(input())):
    N, location = map(int, input().split())
    priorities = list(map(int, input().split()))
    answer = 1
    print_list = [[idx, priority]for idx, priority in enumerate(priorities)]
    while True:
        if len(print_list) == 1: break
        pop_print = print_list.pop(0)
        max_priority = sorted(print_list, key=lambda x: x[1])[-1][1]
        if pop_print[1] >= max_priority:
            if pop_print[0] == location: break
            answer += 1
        else:
            print_list.append(pop_print)
    print(answer)