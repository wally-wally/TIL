import sys
sys.stdin = open('input_5622.txt', 'r')

result = 0
for letter in input():
    dial_ascii = ord(letter)
    if dial_ascii in range(65, 68):
        result += 3
    elif dial_ascii in range(68, 71):
        result += 4
    elif dial_ascii in range(71, 74):
        result += 5
    elif dial_ascii in range(74, 77):
        result += 6
    elif dial_ascii in range(77, 80):
        result += 7
    elif dial_ascii in range(80, 84):
        result += 8
    elif dial_ascii in range(84, 87):
        result += 9
    else:
        result += 10
print(result)