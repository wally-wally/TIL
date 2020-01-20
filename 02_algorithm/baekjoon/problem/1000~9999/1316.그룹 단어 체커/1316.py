import sys
sys.stdin = open('input_1316.txt', 'r')

group_word_cnt = 0
for _ in range(int(input())):
    word = input()
    for idx in range(1, len(word)):
        if word.find(word[idx - 1]) > word.find(word[idx]): break
    else:
        group_word_cnt += 1
print(group_word_cnt)