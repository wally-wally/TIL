def solution(s):
    p_cnt, y_cnt = 0, 0
    for letter in s:
        if letter == 'p' or letter == 'P':
            p_cnt += 1
        elif letter == 'y' or letter == 'Y':
            y_cnt += 1
    if p_cnt == y_cnt:
        return True
    else:
        return False

print(solution('pPoooyY'))
print(solution('Pyy'))