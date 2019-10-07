import sys
sys.stdin = open('input_10871.txt', 'r')

N, X = map(int, input().split())
result = []
for num in list(map(int, input().split())):
    if num < X:
        result.append(str(num))
print(' '.join(result))