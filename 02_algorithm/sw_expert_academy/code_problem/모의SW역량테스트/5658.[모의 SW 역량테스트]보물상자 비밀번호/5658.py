import sys
sys.stdin = open('input_5658.txt', 'r')

def checkNum(nums, qu):
    global convert_numbers
    for i in range(4):
        left_idx, right_idx = i * qu, (i + 1) * qu
        split_num = nums[left_idx : right_idx]
        convert_numbers.add(int(split_num, 16))

for tc in range(int(input())):
    N, K = map(int, input().split())
    numbers = input()
    convert_numbers = set()
    rotate_numbers = numbers
    for _ in range(N // 4):
        checkNum(rotate_numbers, N // 4)
        rotate_numbers = rotate_numbers[-1] + rotate_numbers[0 : N - 1]
    sorted_numbers = sorted(list(convert_numbers), reverse=True)
    print('#{} {}'.format(tc + 1, sorted_numbers[K - 1]))