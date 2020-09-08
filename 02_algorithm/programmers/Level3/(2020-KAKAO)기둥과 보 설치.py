def check_frame(answer):
    for frame in answer:
        x, y, a = frame
        if a == 0: # 기둥 설치 가능 조건
            if y == 0 or (x - 1, y, 1) in answer or (x, y, 1) in answer or (x, y - 1, 0) in answer:
                continue
            else:
                return False
        else: # 보 설치 가능 조건
            if (x, y - 1, 0) in answer or (x + 1, y - 1, 0) in answer or ((x - 1, y, 1) in answer and (x + 1, y, 1) in answer):
                continue
            else:
                return False
    return True

def solution(n, build_frame):
    answer = set()
    for frame in build_frame:
        x, y, a, b = frame
        if b == 1: # 설치하는 경우
            answer.add((x, y, a))
            if not check_frame(answer):
                answer.remove((x, y, a))
        else: # 삭제하는 경우
            answer.remove((x, y, a))
            if not check_frame(answer):
                answer.add((x, y, a))
    return sorted(answer)

print(solution(5, [
  [1, 0, 0, 1],
  [1, 1, 1, 1],
  [2, 1, 0, 1],
  [2, 2, 1, 1],
  [5, 0, 0, 1],
  [5, 1, 0, 1],
  [4, 2, 1, 1],
  [3, 2, 1, 1]
]))
print(solution(5, [
  [0, 0, 0, 1],
  [2, 0, 0, 1],
  [4, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 1],
  [3, 1, 1, 1],
  [2, 0, 0, 0],
  [1, 1, 1, 0],
  [2, 2, 0, 1]
]))