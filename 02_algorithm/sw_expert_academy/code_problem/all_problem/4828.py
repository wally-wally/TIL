import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
for i in range(T):
    N = int(input())
    numbers = list(map(int, input().split()))
    if numbers[0] > numbers[1]:
        MIN = numbers[1]
        MAX = numbers[0]
    else:
        MIN = numbers[0]
        MAX = numbers[1]
    for j in range(2, N):
        if numbers[j] < MIN:
            MIN = numbers[j]
        elif numbers[j] > MAX:
            MAX = numbers[j]
    print('#{0} {1}'.format(i+1, MAX-MIN))