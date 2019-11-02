import sys
sys.stdin = open('input.txt', 'r')

for _ in range(int(input())):
    R, S = map(str, input().split())
    for letter in S:
        print(letter * int(R), end='')
    print()