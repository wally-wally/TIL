import sys
sys.stdin = open('input.txt', 'r')

N = int(input())
number_list = list(map(int, input().split()))
M = int(input())
judge_list = list(map(int, input().split()))

result = ['1' if judge in number_list else '0' for judge in judge_list]

print(' '.join(result))