import sys
sys.stdin = open('input.txt', 'r')

def bingo_sum (bingo_list_name):
    judge_list = []
    dsum1 = dsum2 = 0
    for i in range(5):
        rsum = csum = 0
        dsum1 += bingo_list_name[i][i]
        dsum2 += bingo_list_name[i][4-i]
        for j in range(5):
            rsum += bingo_list_name[i][j]
            csum += bingo_list_name[j][i]
        judge_list.append(rsum)
        judge_list.append(csum)
    judge_list.append(dsum1)
    judge_list.append(dsum2)
    return judge_list

while True:
    try:
        count = 0
        my_bingo_board = []
        announcer_num_list = []
        for _ in range(5):
            my_bingo_board.append(list(map(int, input().split())))
        for __ in range(5):
            announcer_num_list.append(list(map(int, input().split())))

        complete_variable = 0
        for a in range(5):
            if complete_variable: break
            for b in range(5):
                if complete_variable: break
                count += 1
                for c in range(5):
                    if complete_variable: break
                    for d in range(5):
                        if announcer_num_list[a][b] == my_bingo_board[c][d]:
                            my_bingo_board[c][d] = 0
                            bingo_able = bingo_sum(my_bingo_board)
                            
                            if bingo_able.count(0) == 3:
                                print(count)
                                complete_variable += 1
                                break
    except EOFError:
        break