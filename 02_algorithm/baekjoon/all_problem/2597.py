import sys
sys.stdin = open('input_2597.txt', 'r')

ruler_length = int(input())
point = []
for i in range(3):
    p1, p2 = map(int, input().split())
    point.append(p1)
    point.append(p2)
ruler_start, ruler_end = 0, ruler_length
for j in range(3):
    l, r = point[2 * j], point[2 * j + 1]
    if l == r: continue
    mid = (l + r) / 2
    left_length, right_length = abs(ruler_start - mid), abs(ruler_end - mid)
    if left_length < right_length:
        ruler_start = mid
        for idx_l in range(6):
            if point[idx_l] < mid:
                point[idx_l] += (mid - point[idx_l]) * 2
    else:
        ruler_end = mid
        for idx_r in range(6):
            if point[idx_r] > mid:
                point[idx_r] -= (point[idx_r] - mid) * 2
print(ruler_end - ruler_start)