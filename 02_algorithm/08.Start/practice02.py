def convert_ten(number):
    value = 0
    digit = 6
    for num in number:
        value += int(num) * (2 ** digit)
        digit -= 1
    return value

data = '01D06079861D79F99F'

all_bin = ''

for element in data:
    binary_data = str(bin(int(element, 16)))[2:]
    length = len(binary_data)
    if length != 4:
        binary_data = '0' * (4 - length) + binary_data
    all_bin += binary_data

elem = ''
for i in range(len(all_bin)):
    elem += all_bin[i]
    if len(elem) == 7:
        print(convert_ten(elem), end=' ')
        elem = ''

value = 0
digit = len(elem) - 1
for num in elem:
    value += int(num) * (2 ** digit)
    digit -= 1
print(value)