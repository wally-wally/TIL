import sys
sys.stdin = open('input_11328.txt', 'r')

for _ in range(int(input())):
    str_1, str_2 = map(str, input().split())
    if str_1 == str_2:
        print('Possible')
        continue
    if len(str_1) != len(str_2):
        print('Impossible')
        continue
    alphabet_cnt_1 = [0] * 26
    alphabet_cnt_2 = [0] * 26
    for idx in range(len(str_1)):
        alphabet_cnt_1[ord(str_1[idx]) - 97] += 1
        alphabet_cnt_2[ord(str_2[idx]) - 97] += 1
    print('Impossible' if alphabet_cnt_1 != alphabet_cnt_2 else 'Possible')