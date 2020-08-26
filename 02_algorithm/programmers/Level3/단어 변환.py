def check_words(word1, word2):
    differ_alphabet = 0
    for i in range(len(word1)):
        if word1[i] == word2[i]: continue
        differ_alphabet += 1
        if differ_alphabet == 2:
            return False
    return True if differ_alphabet == 1 else False


def DFS(begin, target, words, select_words, answer):
    for word in words:
        if word in select_words: continue
        if check_words(word, select_words[len(select_words) - 1]):
            if word == target:
                answer = min(answer, len(select_words))
                return answer
            select_words.append(word)
            temp_answer = DFS(begin, target, words, select_words, answer)
            answer = temp_answer
            select_words.pop()
    return answer
    
    
def solution(begin, target, words):
    answer = DFS(begin, target, words, [begin], 0xffffff)
    return 0 if answer == 0xffffff else answer


print(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']))
print(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']))