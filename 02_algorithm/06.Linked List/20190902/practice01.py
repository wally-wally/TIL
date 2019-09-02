class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성

def delete(pre): # pre 다음 노드 삭제
    if pre == None or pre.link == None:
        print('error')
    else:
        pre.link = pre.link.link


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

delete(Head)

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)