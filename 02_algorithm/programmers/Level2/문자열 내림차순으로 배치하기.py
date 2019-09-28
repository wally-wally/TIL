def solution(string):
    answer = ''
    ord_list = []
    for st in string:
        ord_list.append(ord(st))
    for element in sorted(ord_list, reverse=True):
        answer += chr(element)
    return answer