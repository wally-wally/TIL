import sys
sys.stdin = open('input_17176.txt', 'r')

N = int(input())
secret_data = sorted(list(map(int, input().split())))
original_data = input()
judge_data = []
for data in original_data:
    ascii_data = ord(data)
    if data == ' ':
        judge_data.append(0)
    elif ascii_data in range(65, 91):
        judge_data.append(ascii_data - 64)
    elif ascii_data in range(97, 123):
        judge_data.append(ascii_data - 70)
print('y' if sorted(judge_data) == secret_data else 'n')