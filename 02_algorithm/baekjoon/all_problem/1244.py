import sys
sys.stdin = open('input.txt', 'r')

switch_count = int(input())
switch_list = list(map(int, input().split()))
student_count = int(input())
for _ in range(student_count):
    gender, g_count = map(int, input().split())

    # 남학생꺼 처리
    if gender == 1:
        for a in range(switch_count//g_count):
            change_position = g_count * (a + 1) - 1
            switch_list[change_position] = (switch_list[change_position] + 1) % 2

    # 여학생꺼 처리
    else:
        # 일단 그 자리 우선 바꾸고 시작하자
        change_position = g_count - 1
        switch_list[change_position] = (switch_list[change_position] + 1) % 2
        range_num = min(change_position, switch_count - change_position - 1)
        for b in range(range_num):
            if switch_list[change_position - (b + 1)] != switch_list[change_position + (b + 1)]:
                break
            else:
                switch_list[change_position - (b + 1)] =  (switch_list[change_position - (b + 1)] + 1) % 2
                switch_list[change_position + (b + 1)] = (switch_list[change_position + (b + 1)] + 1) % 2
            if not change_position - b or change_position + b == switch_count - 1:
                break

# 출력 규칙에 맞게 출력
for i in range(switch_count):
    if not i % 20:
        if i:
            print(result)
        result = ''
    if i % 20 == 19:
        result += str(switch_list[i])
    else:
        result += str(switch_list[i]) + ' '
if result:
    print(result)