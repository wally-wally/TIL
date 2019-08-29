import sys
sys.stdin = open('sample_input.txt', 'r')

def card_count(x, y):
    global card_kind, card_set, card_num
    card_set[x][int(card_num)-1] += 1
    if card_set[x][int(card_num)-1] >= 2:
        print('#{} ERROR'.format(y + 1))
        return 1
    card_kind, card_num = elem, ''

T = int(input())
for a in range(T):
    card_set = [[0] * 13, [0] * 13, [0] * 13, [0] * 13]
    card_kind = card_num = ''
    data = input() + ' '
    for elem in data:
        if not elem.isdigit():
            if not card_num:
                card_kind = elem
            else:
                if card_kind == 'S':
                    m = card_count(0, a)
                    if m: break
                elif card_kind == 'D':
                    n = card_count(1, a)
                    if n: break
                elif card_kind == 'H':
                    p = card_count(2, a)
                    if p: break
                elif card_kind == 'C':
                    q = card_count(3, a)
                    if q: break
        else:
            card_num += elem
    else:
        print('#{} {} {} {} {}'.format(a + 1, card_set[0].count(0), card_set[1].count(0), card_set[2].count(0), card_set[3].count(0)))