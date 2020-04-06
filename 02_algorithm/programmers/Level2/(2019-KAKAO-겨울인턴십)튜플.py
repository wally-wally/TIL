def solution(s):
    answer = []
    s_list = []
    # 원소가 한 개인 경우
    if ',' not in s:
        temp_number = ''
        for elem in s:
            if elem in [str(n) for n in range(10)]:
                temp_number += elem
        answer.append(int(temp_number))
        return answer
    # 원소가 두 개 이상인 경우
    else:
        for s_element in s.split('},{'):
            temp_list = []
            for s_elem in s_element.split(','):
                if s_elem[0] == '{':
                    for elem_idx in range(len(s_elem)): # '{{4'와 같은 경우
                        if s_elem[elem_idx] != '{':
                            temp_list.append(int(s_elem[elem_idx:]))
                            break
                elif s_elem[-1] == '}':
                    temp_num = ''
                    for elem_idx2 in range(len(s_elem)): # '4}}'와 같은 경우
                        if s_elem[elem_idx2] != '}':
                            temp_num += s_elem[elem_idx2]
                        else:
                            temp_list.append(int(temp_num))
                            break
                else:
                    temp_list.append(int(s_elem))
            s_list.append(temp_list)
        sorted_s_list = sorted(s_list, key=lambda x: len(x))
        for elem_idx3 in range(len(sorted_s_list)):
            if elem_idx3 == 0:
                answer.append(sorted_s_list[0][0])
            else:
                other_element = set(sorted_s_list[elem_idx3]) - set(sorted_s_list[elem_idx3 - 1])
                answer.append(list(other_element)[0])
        return answer


print(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"))
print(solution("{{1,2,3},{2,1},{1,2,4,3},{2}}"))
print(solution("{{20,111},{111}}"))
print(solution("{{123}}"))
print(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"))