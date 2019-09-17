def solution(data):
    data = data.lower()
    words = data.split(' ')
    answer = ''
    for word in words:
        word = word.capitalize()
        answer += word + ' '
    return answer[:-1]

print(solution('3people unFollowed me'))
print(solution('for the last week'))