import sys
sys.stdin = open('input_1110.txt', 'r')

N = int(input())
origin_num = N
answer = 0
while True:
    answer += 1
    mok, nmg = divmod(N, 10)
    sum_value = mok + nmg
    new_num = nmg * 10 + divmod(sum_value, 10)[1]
    if new_num == origin_num:
        break
    N = new_num
print(answer)