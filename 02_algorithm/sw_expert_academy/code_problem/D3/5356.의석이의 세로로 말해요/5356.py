import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    arr = []
    max_length = 0
    result = ''
    for _ in range(5):
        line = input()
        if max_length <= len(line):
            max_length = len(line)
        element = []
        for b in line:
            element.append([b])
        arr.append(element)

    for line_ in arr:
        if len(line_) < max_length:
            for c in range(max_length - len(line_)):
                line_.append([])

    for i in range(max_length):
        for j in range(5):
            if arr[j][i] != []:
                result += arr[j][i][0]
    print('#{} {}'.format(a + 1, result))