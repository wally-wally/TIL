import sys
sys.stdin = open('input.txt', 'r')

T = int(input())
grade = ['A+', 'A0', 'A-', 'B+', 'B0', 'B-', 'C+', 'C0', 'C-', 'D0']

for i in range(T):
    data = list(map(int, input().split()))
    student_count = data[0]
    wanted_student = data[1]
    student_data = []
    for j in range(1, student_count+1):
        score = list(map(int, input().split()))
        student_score = 0.35*score[0] + 0.45*score[1] + 0.20*score[2]
        if j == wanted_student:
            wanted_student_data = student_score
        student_data.append(student_score)
    arrange_data = sorted(student_data, reverse=True)
    rank = arrange_data.index(wanted_student_data)
    gradeIdx = rank*10 // student_count
    print('#{} {}'.format(i+1, grade[gradeIdx]))