import sys
sys.stdin = open('input_16235.txt', 'r')

# pypy3로 통과
def breeding(points):
    breed_tree_cnt = 0
    for point in points:
        for i in range(8):
            new_row, new_col = point[0] + dx[i], point[1] + dy[i]
            if 0 <= new_row < N and 0 <= new_col < N:
                breed_tree_cnt += 1
                planted_trees[new_row][new_col].append(1)
    return breed_tree_cnt


N, M, K = map(int, input().split())
ground = [[5 for _ in range(N)] for _ in range (N)]
add_food = [list(map(int, input().split())) for _ in range(N)]
planted_trees = [[[] for _ in range(N)] for _ in range(N)]
answer = 0
for _ in range(M):
    r, c, age = map(int, input().split())
    planted_trees[r - 1][c - 1].append(age)
    answer += 1

dx, dy = (0, 1, 1, 1, 0, -1, -1, -1), (1, 1, 0, -1, -1, -1, 0, 1) # adjacent point for breeding tree at autumn
year = 1
while year <= K:
    # spring & summber
    for idx in range(N * N):
        row, col = idx // N, idx % N
        if not planted_trees[row][col]: continue
        cell_trees = sorted(planted_trees[row][col])
        for i in range(len(cell_trees)):
            if cell_trees[i] <= ground[row][col]: # spring
                ground[row][col] -= cell_trees[i]
                cell_trees[i] += 1
            else: # summer
                dead_tree_food = 0
                for dead_tree in cell_trees[i:]:
                    dead_tree_food += dead_tree // 2
                answer -= len(cell_trees[i:])
                ground[row][col] += dead_tree_food
                planted_trees[row][col] = cell_trees[:i]
                break
        else:
            planted_trees[row][col] = cell_trees
            
    # autumn & winter
    breeding_points = []
    for idx in range(N * N):
        row, col = idx // N, idx % N
        ground[row][col] += add_food[row][col] # winter(로봇이 땅에 양분 추가하는 건 가을-겨울 순이나 겨울-가을 순이나 똑같다.)
        if not planted_trees[row][col]: continue
        cell_trees = planted_trees[row][col]
        for j in range(len(cell_trees)): # autumn
            if not cell_trees[j] % 5:
                breeding_points.append((row, col))
    if breeding_points: # autumn breeding process
        answer += breeding(breeding_points)

    year += 1

print(answer)