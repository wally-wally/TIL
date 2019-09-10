import sys
sys.stdin = open('5099_input.txt', 'r')

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    cheese_list = list(map(int, input().split()))
    pizza_No = 0
    pizza_status = [0] * M # 화덕으로 들어간 피자 : 1, 아직 안들어간 피자 : 0
    fire = [] # 화덕(원형 큐)
    for b in range(N):
        fire.append([cheese_list.pop(0), pizza_No])
        pizza_status[pizza_No] += 1
        pizza_No += 1
    # print(cheese_list)
    # print(fire)
    # print(pizza_status)

    remain_one = 0
    while True:
        if remain_one:
            break
        for i in range(N):
            # print('{}번째'.format(i))
            if len(fire[i]) != 0:
                fire[i][0] = fire[i][0] // 2
                # print(fire)
                if fire[i][0] == 0:
                    pizza_status[fire[i][1]] -= 1
                    fire[i] = []
                    # print(fire)
                    if fire.count([]) < N - 1:
                        if cheese_list:
                            fire[i] = [cheese_list.pop(0), pizza_No]
                            pizza_status[pizza_No] += 1
                            pizza_No += 1
                            # print(fire)
                        # else:
                        #     N -= 1
                        #     break
                    elif fire.count([]) == N - 1:
                        # print(fire)
                        for element in fire:
                            if element != []:
                                print('#{} {}'.format(a + 1, element[1] + 1))
                        # print(pizza_status)
                        remain_one += 1
                        break

'''
class Queue:
    def __init__(self):
        self.Queue_item = []


    def Enqueue(self, x):
        self.Queue_item.append(x)
        return None


    def Dequeue(self):
        item_length = len(self.Queue_item)
        if item_length == 1:
            print()
            return False
        result = self.Queue_item[0]
        del self.Queue_item[0]
        return result


    def isEmpty(self):
        return not self.Queue_item
'''