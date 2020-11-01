import sys
sys.stdin = open('input_15953.txt', 'r')

for _ in range(int(input())):
    price_2017 = {'1' : 500, '3' : 300, '6' : 200, '10' : 50, '15' : 30, '21' : 10}
    price_2018 = {'1' : 512, '3' : 256, '7' : 128, '15' : 64, '31' : 32}
    a, b = map(int, input().split())
    total_price = 0
    for k in range(2):
        if k == 0 and 0 < a <= 21:
            for idx_17, val_17 in price_2017.items():
                if a <= int(idx_17):
                    total_price += val_17 * 10000
                    break
        elif k == 1 and 0 < b <= 31:
            for idx_18, val_18 in price_2018.items():
                if b <= int(idx_18):
                    total_price += val_18 * 10000
                    break
    print(total_price)