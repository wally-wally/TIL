import sys
sys.stdin = open('input_1919.txt', 'r')

word_a, word_b = input(), input()
alphabet = [[0, 0] for _ in range(26)]
result = 0
for letter_a in word_a:
    alphabet[ord(letter_a) - 97][0] += 1
for letter_b in word_b:
    alphabet[ord(letter_b) - 97][1] += 1
for alpha in alphabet:
    result += abs(alpha[0] - alpha[1])
print(result)