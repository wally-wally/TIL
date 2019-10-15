def solution(numbers, target):
    answer_list = [0]
    for i in numbers:
        temp_list = []
        for j in answer_list:
            temp_list.append(j + i)
            temp_list.append(j - i)
        answer_list = temp_list
    answer = answer_list.count(target)
    return answer

print([1, 1, 1, 1, 1], 3)