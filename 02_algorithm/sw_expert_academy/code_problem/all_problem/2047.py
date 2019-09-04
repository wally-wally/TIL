headline = input()
result = ''
for letter in headline:
    result += letter.upper() if letter.islower() else letter
print(result)