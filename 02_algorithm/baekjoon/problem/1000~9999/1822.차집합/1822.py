import sys
sys.stdin = open('input_1822.txt', 'r')

N, M = map(int, input().split())
A = set(map(int, input().split()))
B = set(map(int, input().split()))
diff_set = sorted(A - B)
print(len(diff_set))
print(*diff_set, sep=' ')