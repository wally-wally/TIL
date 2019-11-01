def solution(str1, str2):
    if len(str1) == len(str2) == 0:
        return 65536
    elif not len(str1) or not len(str2):
        return 0
    else:
        # 1. 두 글자씩 글자쌍 나누기
        str_pair1, str_pair2 = [], []
        for idx_1 in range(len(str1) - 1):
            condition = [65 <= ord(str1[idx_1]) <= 90, 97 <= ord(str1[idx_1]) <= 122,
                         65 <= ord(str1[idx_1 + 1]) <= 90, 97 <= ord(str1[idx_1 + 1]) <= 122]
            if (condition[0] | condition[1]) & (condition[2] | condition[3]):
                str_pair1.append(str1[idx_1 : idx_1 + 2].lower())
        for idx_2 in range(len(str2) - 1):
            condition = [65 <= ord(str2[idx_2]) <= 90, 97 <= ord(str2[idx_2]) <= 122,
                         65 <= ord(str2[idx_2 + 1]) <= 90, 97 <= ord(str2[idx_2 + 1]) <= 122]
            if (condition[0] | condition[1]) & (condition[2] | condition[3]):
                str_pair2.append(str2[idx_2 : idx_2 + 2].lower())

        # 2. 두 리스트 합침 -> 집합으로 변환
        # -> for문으로 돌리면서 각 str_pair1, str_pair2에서 개수를 구한 후 최소값 = 교집합 개수에 더하고 최대값은 합집합 개수에 더함
        all_set = set(str_pair1 + str_pair2)
        intersection_cnt, union_cnt = 0, 0
        for element in all_set:
            min_value = min(str_pair1.count(element), str_pair2.count(element))
            max_value = max(str_pair1.count(element), str_pair2.count(element))
            intersection_cnt += min_value
            union_cnt += max_value
        if intersection_cnt == union_cnt == 0:
            return 65536
        return int((intersection_cnt / union_cnt) * 65536)

print(solution('FRANCE', 'french'))
print(solution('handshake', 'shake hands'))
print(solution('aa1+aa2', 'AAAA12'))
print(solution('E=M*C^2', 'e=m*c^2'))