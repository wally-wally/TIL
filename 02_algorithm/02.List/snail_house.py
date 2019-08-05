# 재사용성을 위한 코드

wanted_number = int(input('원하는 배열 크기를 입력하세요.(ex) 7 입력시 7X7 배열 생성):'))

arr = [[0]*wanted_number for a in range(wanted_number)]

num = 0 # 배열에 입력되는 숫자
perform_count = wanted_number # for 문 한번 수행되는 횟수(각 회전 작업시 수행 횟수)
change = 1 # 행 또는 열의 index가 증가 또는 감소될 때 처리를 위한 변수
row = 0 # 배열의 행
col = -1 # 배열의 열

while num < wanted_number ** 2:
    for i in range(perform_count):
        num += 1
        col += change
        arr[row][col] = num
    perform_count -= 1
    for j in range(perform_count):
        num += 1
        row += change
        arr[row][col] = num
    change *= -1
for k in range(wanted_number): # 배열을 보기좋게 작성함
    for m in range(wanted_number):
        print('{:0>2}'.format(arr[k][m]), end = ' ')
    print()