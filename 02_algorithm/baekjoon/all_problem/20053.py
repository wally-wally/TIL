import sys
sys.stdin = open('input_20053.txt', 'r')

for _ in range(int(input())):
    N = int(input())
    numbers = list(map(int, input().split()))
    print(min(numbers), max(numbers))