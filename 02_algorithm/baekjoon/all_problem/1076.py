import sys
sys.stdin = open('input_1076.txt', 'r')

color_code = {'black': 0, 'brown': 1, 'red': 2, 'orange': 3, 'yellow': 4,
              'green': 5, 'blue': 6, 'violet': 7, 'grey': 8, 'white': 9}
result = 0
for i in range(3):
    if i <= 1: result += color_code[input()] * (10 if not i else 1)
    else: result *= 10 ** color_code[input()]
print(result)