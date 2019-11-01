def solution(dartResult):
    idx = 0
    area = {'S': 1, 'D': 2, 'T': 3}
    temp_score = [0] * 4
    for i in range(1, 4):
        if dartResult[idx + 1] in [str(n) for n in range(10)]:
            temp_score[i] = int(dartResult[idx] + dartResult[idx + 1]) ** area[dartResult[idx + 2]]
            idx += 1
        else:
            temp_score[i] = int(dartResult[idx]) ** area[dartResult[idx + 1]]
        if i != 3:
            if dartResult[idx + 2] in ['*', '#']:
                if dartResult[idx + 2] == '*':
                    temp_score[i - 1] = temp_score[i - 1] * 2
                    temp_score[i] = temp_score[i] * 2
                else:
                    temp_score[i] = temp_score[i] * (-1)
                idx += 3
            else:
                idx += 2
        else:
            if idx + 2 != len(dartResult):
                if dartResult[idx + 2] in ['*', '#']:
                    if dartResult[idx + 2] == '*':
                        temp_score[i - 1] = temp_score[i - 1] * 2
                        temp_score[i] = temp_score[i] * 2
                    else:
                        temp_score[i] = temp_score[i] * (-1)
    return sum(temp_score)

print(solution('1S2D*3T'))
print(solution('1D2S#10S'))