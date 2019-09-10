def four_bit_bin(hex_value):
    if len(bin(int(hex_value, 16))[2:]) == 1:
        elem = '000' + bin(int(hex_value, 16))[2:]
    elif len(bin(int(hex_value, 16))[2:]) == 2:
        elem = '00' + bin(int(hex_value, 16))[2:]
    elif len(bin(int(hex_value, 16))[2:]) == 3:
        elem = '0' + bin(int(hex_value, 16))[2:]
    else:
        elem = bin(int(hex_value, 16))[2:]
    return elem

data = '0269FAC9A0'

bin_data = ''
for Bin in data:
    bin_data += four_bit_bin(Bin)

patterns = ['001101', '010011', '111011', '110001', '100011',
            '110111', '001011', '111101', '011001', '101111']

result = []
i = -1
while True:
    if i > len(bin_data) - 6:
        break
    i += 1
    if bin_data[i : i + 6] in patterns:
        result.append(str(patterns.index(bin_data[i : i + 6])))
        i = i + 5
print(' '.join(result))