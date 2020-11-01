import sys
sys.stdin = open('input_16198.txt', 'r')

def DFS(start, end, collected_energy, answer):
    if end == 1:
        return max(answer, collected_energy)
    for i in range(start, end):
        now_energy = energies[i - 1] * energies[i + 1]
        pop_energy = energies.pop(i)
        answer = DFS(start, end - 1, collected_energy + now_energy, answer)
        energies.insert(i, pop_energy)
    return answer


N = int(input())
energies = list(map(int, input().split()))

print(DFS(1, N - 1, 0, 0))