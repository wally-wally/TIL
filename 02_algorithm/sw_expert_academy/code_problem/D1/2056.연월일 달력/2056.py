T = int(input())
days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
result = ''
for i in range(T):
    date = input()
    year = int(date[0:4])
    month = int(date[4:6])
    day = int(date[6:8])
    if month:
        result = date[0:4] + '/' + date[4:6] + '/' + date[6:8] if day in range(1, days[month-1]+1) else -1 
    else:
        result = -1
    print('#{} {}'.format(i+1, result))