import sys
sys.stdin = open('input.txt', 'r')

e, f, c = map(int, input().split())

e += f
bottle = 0
while True:
    bottle += e // c
    e = e // c + e % c
    if e < c: break
print(bottle)