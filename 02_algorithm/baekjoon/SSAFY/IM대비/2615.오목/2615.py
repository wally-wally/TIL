import sys
sys.stdin = open('input_2615.txt', 'r')

arr = [list(map(int, input().split())) for _ in range(19)]
win, result_x, result_y = 0, 0, 0
end_var = 0
for n in range(19 * 19):
    if end_var: break
    x, y = n // 19, n % 19
    if arr[x][y]:
        stone_num = arr[x][y]
        direction = [(0, +1), (+1, +1), (+1, 0), (+1, -1)]
        check_direction = [(0, -1), (-1, -1), (-1, 0), (-1, +1)]
        for idx in range(4):
            if end_var: break
            stone_arrange = []
            for k in range(0, 6):
                new_x, new_y = x + k * direction[idx][0], y + k * direction[idx][1]
                if 0 <= new_x < 19 and 0 <= new_y < 19:
                    stone_arrange.append(arr[new_x][new_y])
                else:
                    break
            if len(stone_arrange) == 6:
                if stone_arrange[:5].count(stone_num) == 5 and stone_arrange[5] != stone_num:
                    check_stone = arr[x + check_direction[idx][0]][y + check_direction[idx][1]]
                    if check_stone != stone_num:
                        if idx != 3:
                            win, result_x, result_y = stone_num, x + 1, y + 1
                            end_var = 1
                            break
                        else:
                            win, result_x, result_y = stone_num, x + 5, y - 3
                            end_var = 1
                            break
            elif len(stone_arrange) == 5:
                if stone_arrange[:5].count(stone_num) == 5:
                    check_stone = arr[x + check_direction[idx][0]][y + check_direction[idx][1]]
                    if check_stone != stone_num:
                        if idx != 3:
                            win, result_x, result_y = stone_num, x + 1, y + 1
                            end_var = 1
                            break
                        else:
                            win, result_x, result_y = stone_num, x + 5, y - 3
                            end_var = 1
                            break

if not end_var:
    print(0)
else:
    print(win)
    print('{} {}'.format(result_x, result_y))