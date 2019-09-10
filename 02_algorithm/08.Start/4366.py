import sys
sys.stdin = open('input_4366.txt', 'r')

import copy

for test_case in range(int(input())):
    tri_dict = {
        '0' : ['1', '2'],
        '1' : ['0', '2'],
        '2' : ['0', '1']
    }
    ori_bin = input()
    ori_tri = input()
    bin_lst = [n for n in ori_bin]
    tri_lst = [m for m in ori_tri]
    b_len, t_len = len(ori_bin), len(ori_tri)
    complete_variable = 0
    for i in range(b_len):
        if complete_variable: break
        bin_tmp = copy.deepcopy(bin_lst)
        bin_tmp[i] = str((int(bin_tmp[i]) + 1) % 2)
        for j in range(t_len):
            tri_tmp = copy.deepcopy(tri_lst)
            if complete_variable: break
            change_tri_num = tri_dict[tri_tmp[j]]
            for check in change_tri_num:
                tri_tmp[j] = check
                if int(''.join(bin_tmp), 2) == int(''.join(tri_tmp), 3):
                    print('#{} {}'.format(test_case + 1, int(''.join(bin_tmp), 2)))
                    complete_variable = 1
                    break