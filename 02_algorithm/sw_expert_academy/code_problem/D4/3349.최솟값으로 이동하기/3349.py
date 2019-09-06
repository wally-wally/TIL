import sys
sys.stdin = open('input_3349.txt', 'r')

# 규칙 찾기

for a in range(int(input())):
    W, H, N = map(int, input().split())
    intersections = [list(map(int, input().split())) for _ in range(N)]
    result = 0
    for i in range(N - 1):
        if (intersections[i + 1][0] > intersections[i][0]) & (intersections[i + 1][1] > intersections[i][1]):
            result += max(intersections[i + 1][0] - intersections[i][0], intersections[i + 1][1] - intersections[i][1])
        elif (intersections[i + 1][0] < intersections[i][0]) & (intersections[i + 1][1] < intersections[i][1]):
            result += max(abs(intersections[i + 1][0] - intersections[i][0]), abs(intersections[i + 1][1] - intersections[i][1]))
        else:
            result += abs(intersections[i + 1][0] - intersections[i][0]) + abs(intersections[i + 1][1] - intersections[i][1])
    print('#{} {}'.format(a + 1, result))


# BFS로 구현은 되지만 제한시간 초과...

# def BFS(x, y, goal_x, goal_y):
#     cost = 0
#     cost += 1
#     queue = []
#     visited = []
#     queue.append([x - 1, y, 1])
#     queue.append([x, y + 1, 1])
#     queue.append([x + 1, y + 1, 1])
#     queue.append([x + 1, y, 1])
#     queue.append([x, y - 1, 1])
#     queue.append([x - 1, y - 1, 0])
#     visited.append([x - 1, y])
#     visited.append([x, y + 1])
#     visited.append([x + 1, y + 1])
#     visited.append([x + 1, y])
#     visited.append([x, y - 1])
#     visited.append([x - 1, y - 1])
#     while True:
#         point = queue.pop(0)
#         if [point[0], point[1]] not in visited:
#             visited.append([point[0], point[1]])
#         if point[0] == goal_x and point[1] == goal_y:
#             return cost
#         else:
#             if 1 <= point[0] - 1 <= W and 1 <= point[1] <= H:
#                 if [point[0] - 1, point[1]] not in visited:
#                     queue.append([point[0] - 1, point[1], 1])
#             if 1 <= point[0] <= W and 1 <= point[1] + 1 <= H:
#                 if [point[0], point[1] + 1] not in visited:
#                     queue.append([point[0], point[1] + 1, 1])
#             if 1 <= point[0] + 1 <= W and 1 <= point[1] + 1 <= H:
#                 if [point[0] + 1, point[1] + 1] not in visited:
#                     queue.append([point[0] + 1, point[1] + 1, 1])
#             if 1 <= point[0] + 1 <= W and 1 <= point[1] <= H:
#                 if [point[0] + 1, point[1]] not in visited:
#                     queue.append([point[0] + 1, point[1], 1])
#             if 1 <= point[0] <= W and 1 <= point[1] - 1 <= H:
#                 if [point[0], point[1] - 1] not in visited:
#                     queue.append([point[0], point[1] - 1, 1])
#             if 1 <= point[0] - 1 <= W and 1 <= point[1] - 1 <= H:
#                 if [point[0] - 1, point[1] - 1] not in visited:
#                     if point[2] == 1:
#                         queue.append([point[0] - 1, point[1] - 1, 1])
#                     elif point[2] == 0:
#                         queue.append([point[0] - 1, point[1] - 1, 0])
#         if point[2] == 0:
#             cost += 1
        
# for a in range(int(input())):
#     W, H, N = map(int, input().split())
#     intersections = [list(map(int, input().split())) for _ in range(N)]
#     result = 0
#     for i in range(N - 1):
#         result += BFS(intersections[i][0], intersections[i][1], intersections[i + 1][0], intersections[i + 1][1])
#     print('#{} {}'.format(a + 1, result))