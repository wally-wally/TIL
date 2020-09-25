import heapq

def solution(n, works):
    # 최대 힙 형태로 works 재구성
    heap_work = []
    for work in works:
        heapq.heappush(heap_work, (-work, work)) #(우선 순위, 값)
    
    while n > 0:
        priority, value = heapq.heappop(heap_work)
        if value == 0:
            return 0
        heapq.heappush(heap_work, (priority + 1, value - 1))
        n -= 1
    
    return sum([work[1] ** 2 for work in heap_work])

print(solution(4, [4, 3, 3])) # 12
print(solution(1, [2, 1, 2])) # 6
print(solution(3, [1, 1])) # 0