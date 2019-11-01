def solution(N, stages):
    answer = []
    fail_rate = [[0, n] for n in range(N + 1)]
    sorted_stages = sorted(stages)
    length = len(stages)
    for stage in range(1, N + 1):
        if stage in stages:
            cnt = sorted_stages.count(stage)
            fail_rate[stage][0] = cnt / length
            length -= cnt
    for value in sorted(fail_rate[1:], key=lambda x: (x[0], -x[1]), reverse=True):
        answer.append(value[1])
    return answer


print(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]))
print(solution(4, [4, 4, 4, 4, 4]))