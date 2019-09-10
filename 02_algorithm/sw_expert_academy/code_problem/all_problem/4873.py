import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    data = input()
    while True:
        compare = ''
        length = len(data)
        for idx in range(length):
            if compare == data[idx]:
                data = data.replace(data[idx-1:idx+1], '')
                break
            compare = data[idx]
        else:
            print('#{} {}'.format(a + 1, length))
            break