'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the isBalanced function below.
function isBalanced(s) {
    let stack = [];
    let openBrackets = ['(', '{', '['];
    let closeBrackets = [')', '}', ']'];
    for (const str of s) {
        if (openBrackets.indexOf(str) >= 0) {
            stack.push(str);
            continue;
        }
        if (stack.length === 0) {
            return 'NO';
        }
        const popBracket = stack.pop();
        if (openBrackets.indexOf(popBracket) !== closeBrackets.indexOf(str)) {
            return 'NO';
        }
    }
    return stack.length > 0 ? 'NO' : 'YES';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        let result = isBalanced(s);

        ws.write(result + "\n");
    }

    ws.end();
}
