def solution(n, words):
    word_list = [[] for _ in range(26)]
    for i in range(len(words)):
        first_alpha = ord(words[i][0]) - 97
        if not i:
            word_list[first_alpha].append(words[i])
            continue
        if words[i][0] == words[i - 1][-1]:
            if words[i] not in word_list[first_alpha]:
                word_list[first_alpha].append(words[i])
            else: break
        else: break
    else:
        return [0, 0]
    return [(i % n) + 1, (i // n) + 1]