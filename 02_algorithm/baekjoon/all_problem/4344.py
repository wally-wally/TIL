import sys
sys.stdin = open('input_4344.txt', 'r')

for _ in range(int(input())):
    data = list(map(int, input().split()))
    N, scores = data[0], data[1:]
    average = sum(scores) / N
    cnt = 0
    for idx in range(N):
        if average < scores[idx]:
            cnt += 1
    print(str('%.3f' % ((cnt / N)*100)) + '%')