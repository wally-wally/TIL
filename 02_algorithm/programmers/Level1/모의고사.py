def solution(answers):
    answer = []
    patterns = [[1, 2, 3, 4, 5], [2, 1, 2, 3, 2, 4, 2, 5], [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]]
    answer_cnt = []
    for pattern in patterns:
        count = 0
        for idx in range(len(answers)):
            if answers[idx] == pattern[idx % len(pattern)]:
                count += 1
        answer_cnt.append(count)
    max_value = max(answer_cnt)
    for person_number in range(3):
        if answer_cnt[person_number] == max_value:
            answer.append(person_number + 1)
    return answer

print(solution([1,2,3,4,5]))
print(solution([1,3,2,4,2]))