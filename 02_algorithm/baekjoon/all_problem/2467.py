import sys
sys.stdin = open('input_2467.txt', 'r')

N = int(input())
values = list(map(int, input().split()))
left_pointer, right_pointer = 0, len(values) - 1
characteristic_value = abs(values[left_pointer] + values[right_pointer])
min_char_value, max_char_value = values[0], values[len(values) - 1]

while left_pointer < right_pointer:
    mix_value = values[left_pointer] + values[right_pointer]
    if abs(mix_value) < characteristic_value:
        characteristic_value = abs(mix_value)
        min_char_value, max_char_value = values[left_pointer], values[right_pointer]
    
    if mix_value == 0:
        break

    if mix_value > 0:
        right_pointer -= 1
    else:
        left_pointer += 1

print(min_char_value, max_char_value)