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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    let timeArray = s.split(':');
    let meridiem = timeArray[2].slice(2);
    let adjustHour = timeArray[0];
    if (meridiem === 'PM') {
        if (adjustHour !== '12') {
            adjustHour = Number(timeArray[0]) + 12;
        }
    } else {
        if (adjustHour === '12') {
            adjustHour = '00';
        }
    }
    return [
        adjustHour,
        timeArray[1],
        timeArray[2].slice(0, 2)
    ].join(':');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
