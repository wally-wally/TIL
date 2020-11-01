import sys
sys.stdin = open('input_11656.txt', 'r')

S = input()
suffix = set()
for idx in range(len(S)):
    suffix.add(S[idx:])
for result in sorted(list(suffix)):
    print(result)