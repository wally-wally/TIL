import sys
sys.stdin = open('input_5425.txt', 'r')

result = []
T = int(input())
for _ in range(T):
    a, b = map(int, input().split())
    Sum = 0
    for number in range(a, b + 1):
        for num in str(number):
            if num != 0:
                Sum += int(num)
    result.append(Sum)

for x in range(T):
    print(result[x])