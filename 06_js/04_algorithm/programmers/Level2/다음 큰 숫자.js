function solution(num) {
    let bin = num.toString(2);
    let one_cnt = 0;
    for (let i = 0; i < bin.length; i++) {
        if (bin[i] == '1') {
            one_cnt += 1;
        }
    }
    let result = num;
    while (true) {
        let res_one_cnt = 0;
        ++result;
        let result_bin = result.toString(2);
        for (let j = 0; j < result_bin.length; j++) {
            if(result_bin[j] == '1') {
                res_one_cnt += 1;
            }
        }
        if (one_cnt == res_one_cnt) {
            return result;
        }
    }
}

console.log(solution(15));