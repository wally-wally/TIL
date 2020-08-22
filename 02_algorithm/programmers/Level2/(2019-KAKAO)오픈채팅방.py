def solution(record):
    message_log = []
    user_info = dict()
    for rec in record:
        splited_record = rec.split()
        if splited_record[0] == 'Enter' or splited_record[0] == 'Change':
            user_info[splited_record[1]] = splited_record[2] 
            if splited_record[0] == 'Enter':
                message_log.append([splited_record[1], '님이 들어왔습니다.'])
        else:
            message_log.append([splited_record[1], '님이 나갔습니다.'])
    return [''.join([user_info[log[0]], log[1]]) for log in message_log]

print(solution([
    "Enter uid1234 Muzi", 
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan"
]))