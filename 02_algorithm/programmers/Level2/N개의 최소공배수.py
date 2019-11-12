def gcd(a,b):
    a, b = max(a, b), min(a, b)
    while b > 0:
        a, b = b, a % b
    return a
def solution(arr):
    while len(arr) != 1:
        a = arr.pop()
        b = arr.pop()
        c = gcd(a,b)
        arr.insert(0, int(a * b / c))
    answer = arr[0]
    return answer