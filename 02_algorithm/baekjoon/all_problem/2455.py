import sys
sys.stdin = open('input_2455.txt', 'r')

bus = 0
max_value = 0
for _ in range(4):
    A, B = map(int, input().split())
    bus += (-A + B)
    max_value = max(bus, max_value)
print(max_value)