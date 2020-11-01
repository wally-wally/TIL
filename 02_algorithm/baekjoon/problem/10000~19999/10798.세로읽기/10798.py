import sys
sys.stdin = open('input_10798.txt', 'r')

words = [input() for _ in range(5)]
max_length = len(max(words, key = len))
col_nex_words = ''
for idx in range(max_length):
    for word_idx in range(5):
        if len(words[word_idx]) >= idx + 1:
            col_nex_words += words[word_idx][idx]
print(col_nex_words)