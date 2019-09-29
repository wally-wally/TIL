import sys
sys.stdin = open('input_2578.txt', 'r')

def find_num(num):
    global bingo_cnt
    escape_var = 0
    for x in range(5):
        for y in range(5):
            if arr[x][y] == num:
                arr[x][y] = 0
                escape_var = 1
                break
        if escape_var: break

    # 가로 판별
    if sum(arr[x]) == 0:
        bingo_cnt += 1
    
    if bingo_cnt >= 3:
        return True

    # 세로 판별
    col_sum = 0
    for i in range(5):
        col_sum += arr[i][y]
    if not col_sum:
        bingo_cnt += 1

    if bingo_cnt >= 3:
        return True
    
    # 대각선인 경우
    if x == y:
        diagonal_sum = 0
        for j in range(5):
            diagonal_sum += arr[j][j]
        if not diagonal_sum:
            bingo_cnt += 1
    if x + y == 4:
        diagonal_sum = 0
        for k in range(5):
            diagonal_sum += arr[k][4 - k]
        if not diagonal_sum:
            bingo_cnt += 1

    if bingo_cnt >= 3:
        return True
    
    return False

arr = [list(map(int, input().split())) for _ in range(5)]
bingo_cnt = 0
result = 0
for a in range(5):
    data = list(map(int, input().split()))
    for b in range(5):
        result += 1
        value = False
        value = find_num(data[b])
        if value: break
    if value: break
print(result)