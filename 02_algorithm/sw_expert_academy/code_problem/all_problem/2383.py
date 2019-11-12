import sys
sys.stdin = open('input_2383.txt', 'r')

def downstair(exitCnt):
    global result
    time = 0
    while True:
        time += 1
        for c in range(people_cnt):
            if distance[c][selectstair[c]] - time == 0: # 사전에 구한 현재 사람의 위치와 계단 까지의 거리 + 1이 time과 같이 같은 경우
                # 그 때부터 계단 앞에서 대기하여 계단으로 내려갈 수 있으면 각 계단의 길이를 waiting_list1에 넣는다.
                if selectstair[c] == 0:
                    waiting_list1.append(stair_len[0])
                else:
                    waiting_list2.append(stair_len[1])
        
        # 계단의 길이 1씩 감소하면서 본격적으로 계단 내려가기
        temp_list1, temp_list2 = [0, 0, 0], [0, 0, 0] # 계단 안에서 내려가는 동안을 체크하기 위한 임시 리스트
        # (시간이 지날 때 마다 1씩 감소하여 0이 되는 경우 아래 층에 도착함을 의미하기 때문에 exitCnt 변수 +1 증가)
        for i in range(3): # 한 계단에 최대 세 명이 내려갈 수 있으므로 range 범위 인자를 3으로 설정함 그래서 temp_list1, temp_list2의 0의 개수도 3개로 한 것임
            if len(waiting_list1) > 0: # 계단에 내려갈 수 있는 사람이 생긴 경우 아래 구문 수행
                temp_list1[i] = waiting_list1.pop(0)
                temp_list1[i] -= 1
                if temp_list1[i] == 0: # 이 값이 0이 되면 계단에서 다 내려가 아래 층에 도착했다는 의미 이므로 exitCnt에 +1을 증가한다. - **
                    exitCnt += 1
            if len(waiting_list2) > 0: # 또 다른 계단에서도 내려갈 수 있는 사람이 생긴 경우 아래 구문 수행
                temp_list2[i] = waiting_list2.pop(0)
                temp_list2[i] -= 1
                if temp_list2[i] == 0: # ** 표시한 주석 구문과 동일한 내용
                    exitCnt += 1
        
        for j in range(3): # 한 계단에 최대 세 명이 내려갈 수 있으므로 range 범위 인자를 3으로 설정함
            if temp_list1[j] > 0: # 0보다 큰 경우 즉 아직 계단에 있는 경우 insert로 waiting_list의 맨 앞에 삽입하여 0이 될 때 까지 다시 처음부터 수행
                waiting_list1.insert(0, temp_list1[j])
            if temp_list2[j] > 0:
                waiting_list2.insert(0, temp_list2[j])
        
        if exitCnt == people_cnt: # exitCnt가 people_cnt와 같은 경우 즉, 아래 층에 도착한 사람이 처음에 계산한 사람의 총 인원수와 같은 경우를 의미
            result = result if result < time else time # 최솟값을 출력해야 하므로 result < time인 경우 result를 아닌 경우 time을 result 변수에 할당
            break # 탈출하여 DFS 구문에서 다시 새로운 계단 배치의 경우를 고려하여 계산하면 된다.
            

# 사람들이 어디 계단으로 갈지 배치 => << 0, 1을 people_cnt 개수의 자리에 배치하는 중복순열 >>
# ex. people_cnt = 3인 경우 => 0, 1을 세 자리에 배치하는 중복순열
# 0 0 0 - 0 0 1 - 0 1 0 - 0 1 1 - 1 0 0 - 1 0 1 - 1 1 0 - 1 1 1와 같이 배치할 수 있는 계단의 모든 경우의 수를 고려
def DFS(p, cnt):
    if cnt == people_cnt:
        # 계단 위치 배정 끝났으므로 아래 층으로 내려 보내는 작업 수행
        exitcnt = 0
        downstair(exitcnt)
        return
    
    for i in range(p, people_cnt):
        for j in range(2):
            selectstair[i] = j # 계단 배치(한 계단을 0, 다른 계단을 1 이라고 설정)
            DFS(i + 1, cnt + 1)

for tc in range(int(input())):
    N = int(input())
    # 사람의 위치, 계단의 위치, 각 계단의 길이 파악하기
    person_point, stair_point, stair_len = [], [], []
    for r in range(N):
        c = 0
        for elem in list(map(int, input().split())):
            if elem == 1:
                person_point.append((r, c))
            elif 1 < elem <= 10:
                stair_point.append((r, c))
                stair_len.append(elem)
            c += 1
    people_cnt = len(person_point) # 사람의 총 인원 수는 앞으로 많이 쓰일 예정이므로 people_cnt 라는 변수에 할당
    result = 0xffffff # 임의로 출력 정답을 아주 큰 값으로 설정

    # 모든 사람과 계단 사이의 거리를 미리 계산
    distance = []
    for a in range(people_cnt):
        temp_list = []
        for b in range(2):
            temp_list.append(abs(person_point[a][0] - stair_point[b][0]) + abs(person_point[a][1] - stair_point[b][1]) + 1)
        distance.append(temp_list)

    selectstair = [0] * 11 # selectstair의 인덱스 : 각 사람의 인덱스 번호
    # selectstair 리스트의 각 요소 값은 0 또는 1이 될 건데 이는 두 개의 계단 중 어느 계단으로 내려갈지 DFS 구문에서 중복순열로 결정함
    waiting_list1, waiting_list2 = [], []
    DFS(0, 0)

    print('#{} {}'.format(tc + 1, result + 1))