import sys
sys.stdin = open('input_2805.txt', 'r')

T = int(input())

for a in range(T):
    line = int(input())

    # 배열 생성
    arr = []
    for i in range(line):
        per_line = input()
        array = []
        for j in per_line:
            array.append(int(j))
        arr.append(array)

    profit = 0 # 농작물 수익
    middle_position = start = end = line // 2
    for k in range(line):
        if k < middle_position:
            for m in range(start, end+1):
                profit += arr[k][m]
            start -= 1
            end += 1
        else:
            for m in range(start, end+1):
                profit += arr[k][m]
            start += 1
            end -= 1
    print('#{} {}'.format(a+1, profit))