import sys
sys.stdin = open('input_1157.txt', 'r')

alphabet_cnt = [0] * 26
for letter in input().lower():
    alphabet_cnt[ord(letter) - 97] += 1
max_cnt = max(alphabet_cnt)
flag = 0
for count in alphabet_cnt:
    if count == max_cnt:
        flag += 1
        if flag == 2:
            print('?')
            break
else:
    print(chr(alphabet_cnt.index(max_cnt) + 65))