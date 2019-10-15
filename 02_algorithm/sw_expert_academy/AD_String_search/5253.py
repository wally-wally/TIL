import sys
sys.stdin = open('input_5253.txt', 'r')

for tc in range(int(input())):
    N, M = map(int, input().split())
    A_words = [[] for _ in range(26)]
    result = 0
    for _ in range(N):
        word_a = input()
        A_words[ord(word_a[0]) - 97].append(word_a)
    for _ in range(M):
        prefix = input()
        prefix_len, prefix_idx = len(prefix), ord(prefix[0]) - 97
        for word in A_words[prefix_idx]:
            if word[:prefix_len] == prefix:
                result += 1
                break
    print('#{} {}'.format(tc + 1, result))