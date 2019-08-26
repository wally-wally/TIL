# {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}의 powerset 중 원소의 합이 10인 부분집합을 구하시오.

def backtrack(a, k, input):
    global MAXCANDIDATES
    c = [0] * MAXCANDIDATES

    if k == input:
        process_solution(a, k)
    else:
        k += 1
        ncandidates = construct_candidates(a, k, input, c)
        for i in range(ncandidates):
            a[k] = c[i]
            backtrack(a, k, input)


def construct_candidates(a, k, input, c):
    c[0] = True
    c[1] = False
    return 2


def process_solution(a, k):
    arr = []
    Sum = 0
    for i in range(k+1):
        if a[i]:
            arr.append(i)
            Sum += i
    if Sum == 10:
        print('( ', end='')
        for j in arr:
            print(j, end=' ')
        print(')')


MAXCANDIDATES = 100
NMAX = 100
a = [0] * NMAX
backtrack(a, 0, 10)