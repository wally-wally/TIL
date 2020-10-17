import sys
sys.stdin = open('input_2630.txt', 'r')

def add_paper_count(color):
    global white, blue
    if color == 0:
        white += 1
    else:
        blue += 1
        

def make_color_paper(x, y, paper_length, color):
    if paper_length == 1:
        add_paper_count(color)
        return
    check_making = True
    for new_x in range(x, x + paper_length):
        if not check_making:
            break
        for new_y in range(y, y + paper_length):
            if paper[new_x][new_y] != color:
                check_making = False
                break
    if check_making:
        add_paper_count(color)
        return
    
    half_paper_length = paper_length // 2
    make_color_paper(x, y, half_paper_length, paper[x][y])
    make_color_paper(x, y + half_paper_length, half_paper_length, paper[x][y + half_paper_length])
    make_color_paper(x + half_paper_length, y, half_paper_length, paper[x + half_paper_length][y])
    make_color_paper(x + half_paper_length, y + half_paper_length, half_paper_length, paper[x + half_paper_length][y + half_paper_length])

N = int(input())
paper = [list(map(int, input().split())) for _ in range(N)]
white, blue = 0, 0

make_color_paper(0, 0, N, paper[0][0])
print(white)
print(blue)