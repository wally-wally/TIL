import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    sudoku = []
    for b in range(9):
        sudoku.append(list(map(int, input().split())))

    result = 1 # 처음에 스도쿠가 올바른 검증이 되었다고 가정하고 시작
    
    # 가로줄 검사(자료들의 길이로 판별하는 방법) => set()은 중복 요소를 하나로 줄여준다.
    for c in range(9):
        if len(sudoku[c]) != len(set(sudoku[c])):
            result = 0
            break

    if result: # 앞에서 0이 나오면 나머지 검사 할 필요 없음
        # 세로줄 검사(0~9까지의 총합으로 판별하는 방법)
        for d in range(9):
            col_list = []
            for e in range(9):
                col_list.append(sudoku[e][d])
            if sum(col_list) != 45:
                result = 0
                break

    if result:  # 앞에서 0이 나오면 나머지 검사 할 필요 없음
        compare_list = [num for num in range(1, 10)]
        # 3 X 3 형태 검사 (0~9가 모두 있는지 체크하는 방법)
        for f in range(0, 9, 3):
            for g in range(0, 9, 3):
                tri_tri_list = []
                for h in range(f, f+3):
                    for i in range(g, g+3):
                        tri_tri_list.append(sudoku[h][i])
                if compare_list != sorted(tri_tri_list):
                    result = 0
                    break
            if not result:
                break
    
    # 끝까지 검사했을 때 오류 없으면 result = 1 그대로 유지됨
    
    print('#{} {}'.format(a + 1, result))