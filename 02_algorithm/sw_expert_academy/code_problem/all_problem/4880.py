import sys
sys.stdin = open('sample_input_4880.txt', 'r')

def tournament(i, j):
    if j - i >= 2:
        e = tournament(i, (i+j)//2)
        f = tournament(((i+j)//2)+1, j)
        return compare(e[1], f[1])
    elif j - i == 1 or j == i:
        return compare(i, j)


def compare(p, q):
    global card_set
    if p != q:
        x, y = card_set[p - 1][0], card_set[q - 1][0]
        if x > y:
            if x == 3 and y == 1:
                return card_set[q - 1]
            else:
                return card_set[p - 1]
        elif x < y:
            if x == 1 and y == 3:
                return card_set[p - 1]
            else:
                return card_set[q - 1]
        else:
            return card_set[p - 1]
    elif p == q:
        return card_set[p - 1]

T = int(input())

for a in range(T):
    people = int(input())
    cards = list(map(int, input().split()))
    people_num = [b+1 for b in range(people)]
    card_set = []
    for d in range(people):
        card_set.append((cards[d], people_num[d]))
    print('#{} {}'.format(a + 1, tournament(1, people)[1]))