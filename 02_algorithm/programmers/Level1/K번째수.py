def solution(array, commands):
    answer = []
    count = len(commands)
    for a in range(count):
        i, j, k = commands[a][0], commands[a][1], commands[a][2]
        cutting_list = []
        for b in range(i - 1, j):
            cutting_list.append(array[b])
        sort_list = sorted(cutting_list)
        answer.append(sort_list[k - 1])
    return answer

print(solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]))