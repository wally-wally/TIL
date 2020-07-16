import itertools
import copy

def calc(num_1, num_2, oper):
    if oper == '+':
        return num_1 + num_2
    elif oper == '-':
        return num_1 - num_2
    else:
        return num_1 * num_2


def temp_calc(numbers, operators, operator_rank):
    for oper in operator_rank:
        while oper in operators:
            oper_idx = operators.index(oper)
            temp_value = calc(numbers[oper_idx], numbers[oper_idx + 1], oper)
            numbers[oper_idx + 1] = temp_value
            numbers.pop(oper_idx)
            operators.pop(oper_idx)
    return abs(numbers[0])


def solution(expression):
    answer = 0
    numbers, operators = [], []
    temp_num = ''
    for express in expression:
        if express not in ['+', '-', '*']:
            temp_num += express
        else:
            numbers.append(int(temp_num))
            operators.append(express)
            temp_num = ''
    numbers.append(int(temp_num))
    for comb in itertools.permutations(set(operators), len(set(operators))):
        original_nums, original_opers = copy.deepcopy(numbers), copy.deepcopy(operators)
        answer = max(answer, temp_calc(numbers, operators, comb))
        numbers, operators = original_nums, original_opers
    return answer


print(solution('100-200*300-500+20'))
print(solution('50*6-3*2'))