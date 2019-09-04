num = list(map(int, input().split()))

count = 0
now_num = num[1]
while True:
    count += 1
    if now_num == num[0]:
        break
    else:
        now_num += 1
print(count)