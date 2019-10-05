import sys
sys.stdin = open('input_1485.txt', 'r')

for tc in range(int(input())):
    point_list = [list(map(int, input().split())) for _ in range(4)]
    distance_list = [round(((point_list[s][0]-point_list[e][0])**2 + (point_list[s][1]-point_list[e][1])**2)**(1/2), 4) for s in range(4) for e in range(s + 1, 4)]
    print(1 if len(set(distance_list)) == 2 else 0)