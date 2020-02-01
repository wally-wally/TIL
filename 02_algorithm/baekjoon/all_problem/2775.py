import sys
sys.stdin = open('input_2775.txt', 'r')

# 1. 일반적인 풀이
for _ in range(int(input())):
    k, n = int(input()), int(input())
    apartment = [[a for a in range(1, n + 1)]]
    for b in range(1, k + 1):
        apartment_line = []
        for c in range(1, n + 1):
            if c == 1:
                apartment_line.append(1)
            else:
                apartment_line.append(sum(apartment[b - 1][:c]))
        apartment.append(apartment_line)
    print(apartment[k][n - 1])

# 2. list comprehension
# for _ in range(int(input())):
#     k, n = int(input()), int(input())
#     apartment = [[a for a in range(1, n + 1)]]
#     for b in range(1, k + 1):
#         apartment.append([1 if c == 1 else sum(apartment[b - 1][:c]) for c in range(1, n + 1)])
#     print(apartment[k][n - 1])