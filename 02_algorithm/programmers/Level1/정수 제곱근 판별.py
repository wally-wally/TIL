def solution(n):
    square_root = n ** (1/2)
    return (square_root + 1) ** 2 if square_root == int(square_root) else -1