import sys
sys.stdin = open('input_3752.txt', 'r')

for a in range(int(input())):
    N = int(input())
    numbers = list(map(int, input().split()))
    scores = set()
    scores.add(numbers[0])
 
    for i in range(1, N):
        for j in list(scores):
            scores.add(numbers[i] + j)
        scores.add(numbers[i])
 
    print('#{} {}'.format(a + 1, len(scores) + 1)) # 0점인 경우도 있으므로 +1을 추가함

# for a in range(int(input())):
#     N = int(input())
#     numbers = list(map(int, input().split()))
#     scores = []
#     scores.append(numbers[0])
#     print(scores)
 
#     for i in range(1, N):
#         for j in list(scores):
#             scores.append(numbers[i] + j)
#         scores.append(numbers[i])
#         print(scores)
 
#     print('#{} {}'.format(a + 1, len(scores) + 1)) # 0점도 있으므로 +1을 추가함