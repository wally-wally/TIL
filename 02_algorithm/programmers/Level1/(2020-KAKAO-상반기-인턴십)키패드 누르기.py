def compare_distance(left_hand, right_hand, num, hand):
    move_left_hand, move_right_hand, result = left_hand, right_hand, ''
    left_dist = abs(left_hand[0] - key_pad[num][0]) + abs(left_hand[1] - key_pad[num][1])
    right_dist = abs(right_hand[0] - key_pad[num][0]) + abs(right_hand[1] - key_pad[num][1])
    if left_dist < right_dist or (left_dist == right_dist and hand == 'left'):
        move_left_hand, result = key_pad[num], 'L'
    elif left_dist > right_dist or (left_dist == right_dist and hand == 'right'):
        move_right_hand, result = key_pad[num], 'R'
    return move_left_hand, move_right_hand, result

key_pad = {
    1: [0, 0], 2: [0, 1], 3: [0, 2],
    4: [1, 0], 5: [1, 1], 6: [1, 2],
    7: [2, 0], 8: [2, 1], 9: [2, 2], 0: [3, 1]
}
def solution(numbers, hand):
    answer = ''
    left_hand, right_hand = [3, 0], [3, 2]
    for number in numbers:
        if number in [1, 4, 7]:
            answer += 'L'
            left_hand = key_pad[number]
        elif number in [3, 6, 9]:
            answer += 'R'
            right_hand = key_pad[number]
        else:
            left_hand, right_hand, temp_result = compare_distance(left_hand, right_hand, number, hand)
            answer += temp_result
    return answer


print(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'))
print(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left'))
print(solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 'right'))