import sys
sys.stdin = open('input_10817.txt', 'r')

print(sorted(list(map(int, input().split())))[1])