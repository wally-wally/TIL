import sys
sys.stdin = open('input_1759.txt', 'r')

import itertools

vowel = ['a', 'e', 'i', 'o', 'u']

L, C = map(int, input().split())
alphabet_list = list(map(str, input().split()))
result = []

for alpha_set in list(itertools.combinations(alphabet_list, L)):
    vowel_cnt, consonant_cnt = 0, 0
    for alpha in alpha_set:
        if alpha in vowel:
            vowel_cnt += 1
        elif alpha not in vowel:
            consonant_cnt += 1
    if vowel_cnt >= 1 and consonant_cnt >= 2:
        result.append(''.join(sorted(alpha_set)))

for element in sorted(list(set(result))):
    print(element)