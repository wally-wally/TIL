import sys
sys.stdin = open('input_16205.txt', 'r')

num, variable = input().split()
words = []
if num == '1' or num == '3':
    split_idx = []
    for idx in range(len(variable)):
        if 65 <= ord(variable[idx]) <= 90:
            split_idx.append(idx)
    split_idx.append(len(variable))
    if 0 not in split_idx:
        split_idx.insert(0, 0)
    for i in range(len(split_idx) - 1):
        words.append(variable[split_idx[i] : split_idx[i + 1]].lower())
else:
    words = variable.split('_')

capitalized_words = list(map(lambda x: x.capitalize(), words))
capitalized_words[0] = capitalized_words[0].lower()
print(''.join(capitalized_words))
print('_'.join(words))
capitalized_words[0] = capitalized_words[0].capitalize()
print(''.join(capitalized_words))