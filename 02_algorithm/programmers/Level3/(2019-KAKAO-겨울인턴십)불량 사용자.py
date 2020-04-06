import copy
def solution(user_id, banned_id):
    answer = []
    id_list = []
    for banned in banned_id:
        temp_list = []
        for user in user_id:
            if len(banned) == len(user):
                for idx in range(len(banned)):
                    if banned[idx] != '*' and banned[idx] != user[idx]:
                        break
                else:
                    temp_list.append(user)
        id_list.append(temp_list)
    def id_check(L, cnt, user_id_list, id_list):
        nonlocal answer
        if L == cnt:
            list_element = sorted(copy.deepcopy(user_id_list))
            if list_element not in answer:
                answer.append(list_element)
            return 
        for ID in id_list[cnt]:
            if ID not in user_id_list:
                user_id_list.append(ID)
                id_check(L, cnt + 1, user_id_list, id_list)
                user_id_list.pop()
    id_check(len(banned_id), 0, [], id_list)
    return len(answer)


print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "abc1**"]))
print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["*rodo", "*rodo", "******"]))
print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "*rodo", "******", "******"]))