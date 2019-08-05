arr = [[0]*5 for a in range(5)]

num = 0 # 배열에 입력되는 숫자
perform_count = 5 # for 문 한번 수행되는 횟수(각 회전 작업시 수행 횟수)
change = 1 # 행 또는 열의 index가 증가 또는 감소될 때 처리를 위한 변수
row = 0 # 배열의 행
col = -1 # 배열의 열

while True:
    for i in range(perform_count):
        num += 1
        col += change
        arr[row][col] = num
    perform_count -= 1
    if num == 25: # 배열에 25가 입력되는 순간 모든 배열에 입력이 완료되었으므로 break로 while문 탈출
        break
    for j in range(perform_count):
        num += 1
        row += change
        arr[row][col] = num
    change *= -1
for k in range(5): # 5X5 배열을 보기좋게 작성함
    for m in range(5):
        print('{:>2}'.format(arr[k][m]), end = ' ')
    print()
