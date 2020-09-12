import heapq

def solution(scoville, K):
    heapq.heapify(scoville)
    mix_count = 0
    while len(scoville) > 1:
        mix_count += 1
        not_hottest_pop_scoville = heapq.heappop(scoville)
        not_hotter_pop_scoville = heapq.heappop(scoville)
        mixed_scoville = not_hottest_pop_scoville + (not_hotter_pop_scoville * 2)
        heapq.heappush(scoville, mixed_scoville)
        if scoville[0] >= K:
            return mix_count
    return -1

print(solution([1, 2, 3, 9, 10, 12], 7))