import sys
sys.stdin = open('input.txt', 'r')

letters = input()
for letter in letters:
    print(ord(letter) - 64, end=' ')