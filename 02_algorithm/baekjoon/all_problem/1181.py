import sys
sys.stdin = open('input.txt', 'r')

words = set([input() for _ in range(int(input()))])
sorted_words = sorted(list(words), key=lambda x : (len(x), x))
for word in sorted_words:
    print(word)