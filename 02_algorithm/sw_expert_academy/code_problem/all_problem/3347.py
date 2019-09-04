import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    game_count, committee_count = map(int, input().split())
    vote_list = [0 for _ in range(game_count)]
    game_cost = list(map(int, input().split()))
    committee_cost = list(map(int, input().split()))
    for i in range(committee_count):
        judge_list = []
        for j in range(game_count):
            if game_cost[j] <= committee_cost[i]:
                judge_list.append(j)
        vote_list[min(judge_list)] += 1  
    print('#{} {}'.format(a + 1, vote_list.index(max(vote_list))+1))