import sys
sys.stdin = open('input_1009.txt', 'r')

for _ in range(int(input())):
    square_list = []
    a, b = map(int, input().split())
    if a in [1, 5, 6]:
        print(a)
        continue
    for i in range(1, 5):
        square_list.append((a ** i) % 10)
    print(square_list[(b % 4) - 1] if a % 10 else 10)