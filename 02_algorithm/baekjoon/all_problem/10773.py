import sys
sys.stdin = open('input_10773.txt', 'r')

K = int(input())
numbers = []
for _ in range(K):
    number = int(input())
    if number == 0:
        numbers.pop()
    else:
        numbers.append(number)
print(sum(numbers))