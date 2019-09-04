game = list(map(int, input().split()))
if abs(game[0]-game[1]) == 2:
    idx = game.index(min(game[0], game[1]))
    result = 'A' if not idx else 'B'
else:
    idx = game.index(max(game[0], game[1]))
    result = 'B' if idx else 'A'
print(result)