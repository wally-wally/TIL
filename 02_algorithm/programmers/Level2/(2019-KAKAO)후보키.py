import itertools

def solution(relation):
    answer = []
    row_count, col_count = len(relation), len(relation[0])

    def check_candidate_key(comb):
        tuples = set()
        for info in relation:
            tuples.add(tuple([info[idx] for idx in comb]))
        if len(tuples) == row_count:
            for ans in answer:
                if len(comb - ans) == len(comb) - len(ans):
                    break
            else:
                answer.append(comb)

    for num in range(1, col_count + 1):
        for comb in itertools.combinations(range(col_count), num):
            check_candidate_key(set(comb))
    return len(answer)

print(solution([
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"]
]))