import sys
sys.stdin = open('input.txt', 'r', encoding='UTF8')

for _ in range(10):
    T = int(input())
    string = input()
    sentence = input()
    check = 0
    result = 0
    for letter in sentence:
        if not check:
            if letter == string[0]:
                check = 1
                idx = 1
        elif check:
            if letter == string[0]:
                pass
            elif letter == string[idx]:
                idx += 1
                if idx == len(string):
                    result += 1
                    check = 0
            else:
                check = 0
    print('#{} {}'.format(T, result))