import sys
sys.stdin = open('input_8958.txt', 'r')

for _ in range(int(input())):
    score, flag = 0, 0
    for answer in input():
        if answer == 'X':
            flag = 0
        elif answer == 'O':
            flag += 1
            score += flag
    print(score)