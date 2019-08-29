import queue

q = queue.Queue()
q.put('A')
q.put('B')
q.put('C')

while not q.empty():
    print(q.get())