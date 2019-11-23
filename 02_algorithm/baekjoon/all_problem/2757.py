import sys
sys.stdin = open('input_2757.txt', 'r')

while True:
    cell_info = input()
    if cell_info == 'R0C0': break
    Row, Col = '' , ''
    Row_var, Col_var = 0, 0
    for letter in cell_info:
        if letter == 'R':
            Row_var = 1
        elif letter == 'C':
            Row_var, Col_var = 0, 1
        else:
            if Row_var and not Col_var:
                Row += letter
            elif Col_var and not Row_var:
                Col += letter
    change_alpha = ''
    Col_num = int(Col) - 1 # 26진법으로 변환 (A~Z)
    while Col_num >= 26:
        mok, nmg = divmod(Col_num, 26)
        change_alpha = chr(nmg + 65) + change_alpha
        Col_num = mok - 1
    change_alpha = chr(Col_num + 65) + change_alpha
    print(change_alpha+Row)