import itertools

def solution(orders, course):
    answer = []
    course_table = dict()
    max_count = [0 for _ in range(11)]
    for count in course:
        course_table[count] = dict()
        for order in orders:
            for comb in itertools.combinations(order, count):
                now_course = ''.join(sorted(comb))
                if now_course not in course_table[count]:
                    course_table[count][now_course] = 1
                else:
                    course_table[count][now_course] += 1
                    max_count[count] = max(max_count[count], course_table[count][now_course])
    idx = 0
    for course_info in course_table.values():
        get_courses = list(filter(lambda x: x[1] == max_count[course[idx]], course_info.items()))
        for get_course in get_courses:
            answer.append(get_course[0])
        idx += 1
    return sorted(answer)

print(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]))
print(solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]))
print(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]))