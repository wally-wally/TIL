import sys
sys.stdin = open('input_2490.txt', 'r')

for _ in range(3):
    zero_cnt, one_cnt = 0, 0
    cases = [[1, 3], [2, 2], [3, 1], [4, 0], [0, 4]]
    for data in list(map(int, input().split())):
        if data == 0:
            zero_cnt += 1
        else:
            one_cnt += 1
    for idx in range(5):
        if cases[idx] == [zero_cnt, one_cnt]:
            print(chr(idx + 65))
            break