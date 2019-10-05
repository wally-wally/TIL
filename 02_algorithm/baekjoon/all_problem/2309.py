import sys
sys.stdin = open('input.txt', 'r')

from itertools import permutations

tall_list = []
for _ in range(9):
    tall_list.append(int(input()))

for data in list(permutations(tall_list, 7)):
    if sum(list(data)) == 100:
        for tall in sorted(data):
            print(tall)
        break