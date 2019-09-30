import sys
sys.stdin = open('input_2819.txt', 'r')

def find_num(r, c, cnt, number):
    if cnt == 7:
        numbers.append(number)
        return
    else:
        direction = [(-1, 0), (0, +1), (+1, 0), (0, -1)]
        for idx in range(4):
            new_r, new_c = r + direction[idx][0], c + direction[idx][1]
            if 0 <= new_r < 4 and 0 <= new_c < 4:
                find_num(new_r, new_c, cnt + 1, number + str(arr[new_r][new_c]))

for test_case in range(int(input())):
    arr = [list(map(int, input().split())) for _ in range(4)]
    numbers = []
    for i in range(4*4):
        row, col = i // 4, i % 4
        find_num(row, col, 1, str(arr[row][col]))
    print('#{} {}'.format(test_case + 1, len(set(numbers))))