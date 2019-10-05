import sys
sys.stdin = open('input_6603.txt', 'r')

def comb(n, m):
    global result_list
    if n == m + 1:
        if sorted(order) not in result_list:
            print(' '.join(order))
            result_list.append(sorted(order))
            return
    else:
        for i in range(n, k + 1):
            if not visited[i]:
                visited[i] = True
                order.append(str(data[i - 1]))
                comb(n + 1, m)
                visited[i] = False
                order.pop()

while True:
    test_data = list(map(int, input().split()))
    if len(test_data) > 1:
        k, data = test_data[0], test_data[1::]
        visited = [False] * (k + 1)
        result_list, order = [], []
        comb(1, 6)
        print()
    elif len(test_data) == 1:
        break