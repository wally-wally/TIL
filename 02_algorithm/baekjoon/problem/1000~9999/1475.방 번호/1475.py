import sys
sys.stdin = open('input_1475.txt', 'r')

num_cnt = [0] * 10 + [0] # 마지막 [0]은 6과 9를 더하고 2로 나눈 값 (경우에 따라 1을 더할 수도)
for num in input():
    num_cnt[int(num)] += 1
num_cnt[-1] = (num_cnt[6] + num_cnt[9]) // 2 + (1 if (num_cnt[6] + num_cnt[9]) % 2 else 0)
num_cnt[6] = num_cnt[9] = 0
print(max(num_cnt))