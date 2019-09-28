import sys
sys.stdin = open('input_2884.txt', 'r')

H, M = map(int, input().split())
if H == 0 and M < 45:
    print(23, 60 + (M - 45))
else:
    minute = H * 60 + M
    alarm_time = minute - 45
    hour, minute = alarm_time // 60, alarm_time % 60
    print(hour, minute)