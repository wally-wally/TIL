import sys
sys.stdin = open('input_2210.txt', 'r')

def number_check(board, r, c, num_set, num, cnt):
    direction = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    for idx in range(4):
        new_r, new_c = r + direction[idx][0], c + direction[idx][1]
        if 0 <= new_r < 5 and 0 <= new_c < 5:
            next_num = num + board[new_r][new_c]
            if cnt == 5:
                num_set.add(next_num)
            else:
                number_check(board, new_r, new_c, num_set, next_num, cnt + 1)


arr = [list(map(str, input().split())) for _ in range(5)] # 숫자판
numbers = set()
# [참고] 배열 index 구할 때 다음과 같이 작성할 수 있음
# for idx in range(25):
#     row, col = idx // 5, idx % 5
for i in range(5):
    for j in range(5):
        row, col = i, j
        count = 1
        number = arr[row][col]
        number_check(arr, row, col, numbers, number, count)
print(len(numbers)) # set() 특성에 의해 중복 요소는 제거되어 원하는 숫자의 개수를 구할 수 있다.