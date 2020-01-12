import sys
sys.stdin = open('input_10809.txt', 'r')

alphabet_cnt = [-1] * 26
word = input()
for idx in range(len(word)):
    position = ord(word[idx]) - 97
    if alphabet_cnt[position] == -1:
        alphabet_cnt[position] = idx
print(' '.join([str(cnt) for cnt in alphabet_cnt]))