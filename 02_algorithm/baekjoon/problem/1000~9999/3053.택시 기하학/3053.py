import sys
sys.stdin = open('input.txt', 'r')

import math
R = int(input())
print(format(math.pi * (R ** 2), '6f'))
print(format((R ** 2) * 2, '6f'))