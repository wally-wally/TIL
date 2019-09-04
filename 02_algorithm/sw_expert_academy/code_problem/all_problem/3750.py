import sys
sys.stdin = open('input.txt', 'r')

def calc(number):
    Sum = 0
    Sum = sum([int(num) for num in str(number)])
    return Sum if 0 <= Sum <= 9 else calc(Sum)

result = [calc(int(input())) for _ in range(int(input()))]

for i in range(len(result)):
    print('#{} {}'.format(i + 1, result[i]))


# 아래 구문도 올바르게 동작하지만 100000개 테스트 케이스 돌리면 수행시간이 더 오래 걸림
# def calc(number):
#     Sum = 0
#     Sum = sum([int(num) for num in str(number)])
#     return Sum if 0 <= Sum <= 9 else calc(Sum)

# for a in range(int(input())):
#     print('#{} {}'.format(a + 1, calc(int(input()))))