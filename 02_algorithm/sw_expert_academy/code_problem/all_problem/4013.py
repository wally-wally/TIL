import sys
sys.stdin = open('input_4013.txt', 'r')

def rotate_check(MAG_NO):
    if MAG_NO == 1:
        end_NO, sign, re_idx = 4, 1, 0
    elif MAG_NO == 4:
        end_NO, sign, re_idx = 1, -1, 1
    able_rot_magnetics = [MAG_NO]
    while True:
        if MAG_NO == end_NO: break
        if magnetic_info[MAG_NO - (re_idx + 1)][2] == magnetic_info[MAG_NO - re_idx][6]: break
        able_rot_magnetics.append(MAG_NO + sign)
        MAG_NO += sign
    return able_rot_magnetics

for tc in range(int(input())):
    K = int(input())
    magnetic_info = [list(map(int, input().split())) for _ in range(4)]
    for rot in range(K):
        my_mag_no, rot_dir = map(int, input().split()) # mag_no : 자석 번호, rot_dir : 1(시계), -1(반시계)

        if my_mag_no == 1:
            rot_magnetics = rotate_check(my_mag_no)
            
            # 자석 회전
            for mag_idx in rot_magnetics:
                if rot_dir == 1: # 시계 방향 회전
                    pop_elem = magnetic_info[mag_idx - 1].pop()
                    magnetic_info[mag_idx - 1].insert(0, pop_elem)
                elif rot_dir == -1: # 반시계 방향 회전
                    pop_elem = magnetic_info[mag_idx - 1].pop(0)
                    magnetic_info[mag_idx - 1].append(pop_elem)
                rot_dir *= -1


        elif my_mag_no == 4:
            rot_magnetics = rotate_check(my_mag_no)

            # 자석 회전
            for mag_idx in rot_magnetics:
                if rot_dir == 1: # 시계 방향 회전
                    pop_elem = magnetic_info[mag_idx - 1].pop()
                    magnetic_info[mag_idx - 1].insert(0, pop_elem)
                elif rot_dir == -1: # 반시계 방향 회전
                    pop_elem = magnetic_info[mag_idx - 1].pop(0)
                    magnetic_info[mag_idx - 1].append(pop_elem)
                rot_dir *= -1


        else:
            rot_magnetics = [my_mag_no]
            # 왼쪽 방향 어디까지 갈 수 있는지 체크
            ori_my_mag_no = my_mag_no
            while True:
                if my_mag_no == 1: break
                if magnetic_info[my_mag_no - 2][2] == magnetic_info[my_mag_no - 1][6]: break
                rot_magnetics.append(my_mag_no - 1)
                my_mag_no -= 1

            rot_magnetics.append(5)

            # 오른쪽 방향 어디까지 갈 수 있는지 체크
            my_mag_no = ori_my_mag_no
            while True:
                if my_mag_no == 4: break
                if magnetic_info[my_mag_no - 1][2] == magnetic_info[my_mag_no][6]: break
                rot_magnetics.append(my_mag_no + 1)
                my_mag_no += 1
            
            ori_rot_dir = rot_dir
            # 자석 회전
            for mag_idx in rot_magnetics:
                if mag_idx == 5:
                    rot_dir = ori_rot_dir * -1
                    continue
                if rot_dir == 1: # 시계 방향 회전
                    pop_elem = magnetic_info[mag_idx - 1].pop()
                    magnetic_info[mag_idx - 1].insert(0, pop_elem)
                elif rot_dir == -1: # 반시계 방향 회전
                    pop_elem = magnetic_info[mag_idx - 1].pop(0)
                    magnetic_info[mag_idx - 1].append(pop_elem)
                rot_dir *= -1

    result = sum([2 ** idx for idx in range(4) if list(map(lambda x: x[0], magnetic_info))[idx] == 1])
    print('#{} {}'.format(tc + 1, result))