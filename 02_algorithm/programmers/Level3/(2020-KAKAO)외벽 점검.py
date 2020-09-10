import copy
import itertools

def solution(n, weak, dist):
    reverse_dist = sorted(dist, reverse=True)
    weak_length = len(weak)

    def check(perm, weak):
        criteria_weak = weak[0]
        criteria_check_weak_idx = 1
        check_available = [weak[0]]
        for dist in perm:
            for weak_idx in range(criteria_check_weak_idx, weak_length):
                if weak[weak_idx] - criteria_weak <= dist:
                    check_available.append(weak[weak_idx])
                else:
                    criteria_weak = weak[weak_idx]
                    criteria_check_weak_idx = weak_idx
                    break
        return len(check_available) == weak_length

    original_weak = copy.deepcopy(weak)
    for friend_count in range(1, len(dist) + 1):
        for dist_idx_perm in itertools.permutations(reverse_dist, friend_count):
            for _ in range(weak_length):
                if check(dist_idx_perm, weak):
                    return len(dist_idx_perm)
                pop_elem = weak.pop(0)
                weak.append(pop_elem + n)
            weak = copy.deepcopy(original_weak)
    return -1


print(solution(12, [1, 5, 6, 10], [1, 2, 3, 4])) # 2
print(solution(12, [1, 4, 6, 9], [1, 2, 3, 3])) # 2
print(solution(12, [1, 5, 6, 10], [1, 2, 3, 4])) # 2
print(solution(12, [1, 3, 4, 9, 10], [3, 5, 7])) # 1
print(solution(50, [1], [6])) # 1
print(solution(200, [0, 100], [1, 1])) # 2
print(solution(200, [0, 10, 50, 80, 120, 160], [1, 10, 5, 40, 30])) # 3
print(solution(12, [0, 10], [1, 2])) # 1
print(solution(30, [0, 3, 11, 21], [10, 4])) # 2