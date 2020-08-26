def solution(phone_book):
    for criteria_phone in phone_book:
        for compare_phone in phone_book:
            if len(criteria_phone) > len(compare_phone): continue
            if criteria_phone == compare_phone: continue
            if compare_phone[: len(criteria_phone)] == criteria_phone:
                return False
    return True


print(solution(['119', '97674223', '1195524421']))
print(solution(['123', '456', '789']))
print(solution(['12', '123', '1235', '567', '88']))