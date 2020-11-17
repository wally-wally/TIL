function solution(arr) {
    let answer = arr.filter(number => number != Math.min.apply(null, arr))
    return (arr.length === 1) ? [-1] : answer
}