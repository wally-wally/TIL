import sys
sys.stdin = open('input_10870.txt', 'r')

def fibo(n):
    fibo_array = [0, 1]
    for num in range(2, n + 1):
        fibo_array.append(fibo_array[num - 2] + fibo_array[num - 1])
    return fibo_array[-1]

n = int(input())
print(n if n <= 1 else fibo(n))