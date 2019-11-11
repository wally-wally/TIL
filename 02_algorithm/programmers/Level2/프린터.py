def solution(priorities, location):
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
    return answer

print(solution([2, 1, 3, 2], 2))
print(solution([1, 1, 9, 1, 1, 1], 0))
print(solution([3, 3, 4, 2], 3))