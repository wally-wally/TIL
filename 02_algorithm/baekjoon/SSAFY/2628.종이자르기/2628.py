import sys
sys.stdin = open('input.txt', 'r')

width, height = map(int, input().split())

cut_count = int(input())

width_cut = [0]
height_cut = [0]

for i in range(cut_count):
    case, position = map(int, input().split())
    if case & 1:
        width_cut.append(position)
    else:
        height_cut.append(position)
width_cut.append(width)
height_cut.append(height)
# print(width_cut, height_cut)
re_height_cut, re_width_cut = sorted(height_cut), sorted(width_cut)
# print(re_width_cut, re_height_cut)

width_length = []
height_length = []
for a in range(len(re_width_cut)-1):
    width_length.append(re_width_cut[a+1]-re_width_cut[a])
for b in range(len(re_height_cut)-1):
    height_length.append(re_height_cut[b+1]-re_height_cut[b])
# print(width_length, height_length)

max_area = 0
for c in width_length:
    for d in height_length:
        if c * d >= max_area:
            max_area = c * d
print(max_area)