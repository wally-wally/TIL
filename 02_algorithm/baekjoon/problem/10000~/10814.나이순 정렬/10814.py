import sys
sys.stdin = open('input.txt', 'r')

members = []
for idx in range(int(input())):
    age, name = map(str, input().split())
    members.append([int(age), name, idx])
sorted_members = sorted(members, key=lambda x: (x[0], x[2]))
for member in sorted_members:
    print(member[0], member[1])