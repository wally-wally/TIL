import sys
sys.stdin = open('input_4008.txt', 'r')

def Operation(N, cnt, res):
    global operators, numbers, min_value, max_value
    if cnt == N:
        if res < min_value:
            min_value = res
        if res > max_value:
            max_value = res
        return

    if operators[0]:
        operators[0] -= 1
        Operation(N, cnt + 1, res + numbers[cnt])
        operators[0] += 1
    
    if operators[1]:
        operators[1] -= 1
        Operation(N, cnt + 1, res - numbers[cnt])
        operators[1] += 1

    if operators[2]:
        operators[2] -= 1
        Operation(N, cnt + 1, res * numbers[cnt])
        operators[2] += 1

    if operators[3]:
        operators[3] -= 1
        Operation(N, cnt + 1, int(res / numbers[cnt]))
        operators[3] += 1

for tc in range(int(input())):
    N = int(input())
    operators = list(map(int, input().split()))
    numbers = list(map(int, input().split()))

    min_value, max_value = 0xffffffff, -10e9

    Operation(N, 1, numbers[0])

    print('#{} {}'.format(tc + 1, max_value - min_value))