import sys
sys.stdin = open('input_2869.txt', 'r')

# 1. Python3, pypy3 모두 시간 초과
# A, B, V = map(int, input().split())
# height, day = 0, 1
# while True:
#     if height + A >= V:
#         print(day)
#         break
#     height, day = height + A - B, day + 1

# 2. 통과
# A, B, V = map(int, input().split())
# if (V - B) % (A - B) != 0:
#     print((V - B) // (A - B)) + 1
# else:
#     print((V - B) // (A - B))

# 3. Refactoring
A, B, V = map(int, input().split())
print((V - B) // (A - B) + (1 if (V - B) % (A - B) != 0 else 0))

# 해설
# 달팽이는 하루에 A - B 만큼 이동
# 하지만 목표지점 도달시 미끄러지지 않으므로 V - B 만큼 올라감
# (V - B) % (A - B) != 0 이 참인 경우 목표지점에 도달하기 위해 하루가 더 필요하므로 1을 더해주고 거짓인 경우 몫을 출력하면 된다.