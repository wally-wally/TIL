notation = '012'

def make_tri_number(num):
    mok, nmg = divmod(num, 3)
    n = notation[nmg]
    return make_tri_number(mok) + n if mok else n

def solution(n):
    tri_num = make_tri_number(n)
    reversed_tri_num = tri_num[::-1]
    return int(reversed_tri_num, 3)

print(solution(45))