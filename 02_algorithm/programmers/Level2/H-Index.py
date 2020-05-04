def solution(citations):
    answer = 0
    count_arr = [0] * 10001
    for citation in citations:
        count_arr[citation] += 1
    for idx in range(10000, -1, -1):
        if sum(count_arr[idx : 10001]) >= idx:
            answer = idx
            break
    return answer


print(solution([3, 0, 6, 1, 5]))