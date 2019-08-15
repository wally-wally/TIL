import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

# arr = []
# for i in range(100):
#     elem = []
#     for j in range(100):
#         elem.append(0)
#     arr.append(elem)
# print(arr) # 100 X 100 모든 원소가 0인 배열 생성

# 총 몇 줄 배열 만들어야 하는지 알기 위해 계산
'''
line = 0
result = 0
while result <= 10000:
    result += line
    line += 1
'''

# 2차원 배열에 모두 0을 먼저 대입
arr = []
for x in range(142):
    elem = []
    for y in range(142):
        elem.append(0)
    arr.append(elem)

# 문제 규칙에 따라 1부터 차례대로 입력
num = 1
for a in range(142):
    for b in range(a+1):
        arr[b][a-b] += num
        num += 1
        if num == 10001:
            break
    if num == 10001:
        break


for i in range(T):
    input_num = list(map(int, input().split()))

    total_data = []
    for number in input_num:
        point = []
        row_num = -1
        for element in arr:
            row_num += 1
            col_num = -1
            for check_num in element:
                col_num += 1
                if check_num == number:
                    point.append(row_num)
                    point.append(col_num)
                    break
            if len(point) == 2:
                break
        total_data.append(point)
    row, col = total_data[0][0]+total_data[1][0]+1, total_data[0][1]+total_data[1][1]+1
    print('#{} {}'.format(i + 1, arr[row][col]))
