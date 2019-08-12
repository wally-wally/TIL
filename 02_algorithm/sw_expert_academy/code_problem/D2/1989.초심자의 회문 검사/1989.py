import sys
sys.stdin = open('input.txt', 'r')

for i in range(int(input())):
    # data = input()
    # print('#{} {}'.format(i+1, 1 if data == data[::-1] else 0))
    
    data = input()
    n = len(data)
    for j in range(n//2):
        if data[j] != data[n - 1 - j]:
            print('#{} {}'.format(i + 1, 0))
            break
    else:
        print('#{} {}'.format(i + 1, 1))
