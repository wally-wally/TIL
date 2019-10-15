import sys
sys.stdin = open('input_5252.txt', 'r')

for tc in range(int(input())):
    N, M = map(int, input().split())
    A_words = [[] for _ in range(26)]
    result = 0
    for _ in range(N):
        word_a = input()
        A_words[ord(word_a[0]) - 97].append(word_a)
    for _ in range(M):
        word_b = input()
        prefix_idx = ord(word_b[0]) - 97
        if word_b in A_words[prefix_idx]:
            result += 1
    print('#{} {}'.format(tc + 1, result))