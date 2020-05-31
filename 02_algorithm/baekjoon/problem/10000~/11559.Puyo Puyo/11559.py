import sys
sys.stdin = open('input_11559.txt', 'r')

def BFS(row, col):
    check = 0
    block_color = game_board[row][col]
    queue = [(row, col)]
    temp_eliminate_idx = []
    while queue:
        pop_elem = queue.pop(0)
        visited[pop_elem[0]][pop_elem[1]] = True
        temp_eliminate_idx.append((pop_elem[0], pop_elem[1]))
        for i in range(4):
            new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
            if 0 <= new_row < 12 and 0 <= new_col < 6:
                if not visited[new_row][new_col] and game_board[new_row][new_col] == block_color:
                    queue.append((new_row, new_col))
    if len(temp_eliminate_idx) >= 4:
        eliminate_block_idx.extend(temp_eliminate_idx)
        check = 1
    return check

game_board = [[game_cell for game_cell in input()] for _ in range(12)]
dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)

chain_count = 0
while True:
    chain_check = 0
    # (1) 블록이 4개 이상 상하좌우로 연결되어 있는 블록들의 위치 파악
    visited = [[False] * 6 for _ in range(12)]
    eliminate_block_idx = []
    for r in range(12):
        for c in range(6):
            if not visited[r][c] and game_board[r][c] != '.':
                if BFS(r, c):
                    chain_check = 1
    if not chain_check:
        print(chain_count)
        break
    chain_count += 1
    
    # (2) 없앨 블록들의 위치에 있는 값을 모두 '.'으로 변경
    for idx in eliminate_block_idx:
        game_board[idx[0]][idx[1]] = '.'
    
    # (3) 중력의 영향을 받아 차례대로 블록들을 아래로 떨어뜨리기
    for col in range(6):
        gravity_row, start_block_check = 11, 1
        for row in range(11, -1, -1):
            if game_board[row][col] != '.':
                game_board[gravity_row][col] = game_board[row][col]
                if start_block_check == 0:
                    game_board[row][col] = '.'
                gravity_row -= 1
            else:
                start_block_check = 0