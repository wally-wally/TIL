import sys
sys.stdin = open('input_1799.txt', 'r')

def check_bishop(row, col, count, color):
    global black_result, white_result
    if col >= N:
        row += 1
        col = 1 if not col % 2 else 0
    if row >= N:
        if color == 0:
            black_result = max(black_result, count)
        else:
            white_result = max(white_result, count)
        return
    if arr[row][col]:
        if not left[col - row + N - 1] and not right[row + col]:
            left[col - row + N - 1] = right[row + col] = 1
            check_bishop(row, col + 2, count + 1, color)
            left[col - row + N - 1] = right[row + col] = 0
    check_bishop(row, col + 2, count, color)

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
# left : 좌측 상단에서 우측 하단으로 내려가는 방향, right : 우측 상단에서 좌측 하단으로 내려가는 방향
left, right = [0] * (N * 2), [0] * (N * 2)
black_result, white_result = 0, 0

check_bishop(0, 0, 0, 0) # 검은색 판단
check_bishop(0, 1, 0, 1) # 하얀색 판단

print(black_result + white_result)