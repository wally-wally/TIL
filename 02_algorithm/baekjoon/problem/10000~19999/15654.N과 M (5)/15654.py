import sys
sys.stdin = open('input_15654.txt', 'r')

def perm(nums):
    if len(nums) == M:
        print(' '.join(list(map(str, nums))))
        return
    for idx in range(N):
        if numbers[idx] not in nums:
            nums.append(numbers[idx])
            perm(nums)
            nums.pop()


N, M = map(int, input().split())
numbers = sorted(list(map(int, input().split())))
perm([])