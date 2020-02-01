import sys
sys.stdin = open('input_2164.txt', 'r')

# 2. deque을 사용해서 풀이
from collections import deque

def BFS(cards) :
    while len(cards) > 1:
        cards.popleft()
        cards.rotate(-1)
    return cards[0]

N = int(input())
cards = deque(n for n in range(1, N + 1))
print(1 if N == 1 else BFS(cards))

# 1. 시간 초과
# def BFS(cards) :
#     while len(cards) > 1:
#         del cards[0]
#         pop_card = cards.pop()
#         cards.append(pop_card)
#     return cards[0]

# N = int(input())
# cards = [n for n in range(1, N + 1)]
# print(1 if N == 1 else BFS(cards))