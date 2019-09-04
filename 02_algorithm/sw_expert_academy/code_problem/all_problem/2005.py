import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for i in range(T):
    num = int(input())
    count = 0
    result = []
    for j in range(num):
        element = []
        count += 1
        for k in range(count):
            if k == 0 or j == k:
                element.append(1)
            else:
                element.append(result[j-1][k-1]+result[j-1][k])
        result.append(element)
    print('#{}'.format(i+1))
    for a in result:
        for b in a:
            print(b, end=' ')
        print()