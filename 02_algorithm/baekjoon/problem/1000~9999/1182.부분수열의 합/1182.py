import sys
sys.stdin = open('input_1182.txt', 'r')

def powerset(array, n, idx, Sum):
    global count
    if idx == n:
        if Sum == S:
            count += 1
        return
    powerset(array, n, idx + 1, Sum)
    powerset(array, n, idx + 1, Sum + array[idx])

N, S = map(int, input().split())
arr = list(map(int, input().split()))
count = 0
powerset(arr, N, 0, 0)
if not S: count -= 1
print(count)