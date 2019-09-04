import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for i in range(T):
    price = int(input())
    count_list = []
    divisor = 100000

    while True:
        if not len(count_list) % 2:
            divisor = divisor // 2
            mok = price // divisor
            nmg = price % divisor
            count_list.append(mok)
            price = nmg
        else:
            divisor = divisor // 5
            mok = price // divisor
            nmg = price % divisor
            count_list.append(mok)
            price = nmg
        if divisor == 10:
            break
    print('#{}'.format(i + 1))
    print('{}'.format(' '.join(list(map(str, count_list)))))