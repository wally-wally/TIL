import sys
sys.stdin = open('input_15663.txt', 'r')

def perm(nums, indexes):
    if len(nums) == M:
        perm_answer = ' '.join(list(map(str, nums)))
        if perm_answer not in perm_set:
            print(perm_answer)
            perm_set.add(perm_answer)
        return
    for idx in range(N):
        if idx not in indexes:
            indexes.append(idx)
            nums.append(numbers[idx])
            perm(nums, indexes)
            nums.pop()
            indexes.pop()


N, M = map(int, input().split())
numbers = sorted(list(map(int, input().split())))
perm_set = set()

perm([], [])