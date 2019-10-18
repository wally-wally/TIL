import sys
sys.stdin = open('input_1100.txt', 'r')

arr = [[element for element in input()] for _ in range(8)]
result = 0
for row in range(8):
    check_var = 0 if not row % 2 else 1
    for col in range(8):
        if col % 2 == check_var:
            if arr[row][col] == 'F':
                result += 1
print(result)