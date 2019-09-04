import sys
sys.stdin = open('input.txt', 'r')

T = int(input())
result = []
for _ in range(T):
    A, B, C, D = map(int, input().split())
    if A / B == C / D:
        result.append('DRAW')
    elif A / B > C / D:
        result.append('ALICE')
    elif A / B < C / D:
        result.append('BOB')
for a in range(len(result)):
    print('#{} {}'.format(a + 1, result[a]))

# 제한시간 초과 코드
# T = int(input())
# for a in range(T):
#     A, B, C, D = map(int, input().split())
#     if A / B == C / D:
#         print('#{} DRAW'.format(a + 1))
#     elif A / B > C / D:
#         print('#{} ALICE'.format(a + 1))
#     elif A / B < C / D:
#         print('#{} BOB'.format(a + 1))