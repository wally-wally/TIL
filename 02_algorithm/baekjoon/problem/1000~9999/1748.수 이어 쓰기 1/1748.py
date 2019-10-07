import sys
sys.stdin = open('input_1748.txt', 'r')

N = int(input())
num_len = len(str(N))
result, digit_len = 0, 1
while digit_len <= num_len:
    result += (N - 10 ** (digit_len - 1) + 1) * digit_len if digit_len == num_len else (int(str(9) * digit_len) - 10 ** (digit_len - 1) + 1) * digit_len
    digit_len += 1
print(result)