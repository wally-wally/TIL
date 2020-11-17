const testStringify = {
    stringifiedNum: JSON.stringify(13.1),
    stringifiedStr: JSON.stringify('Kiss Carnival'),
    stringifiedBln: JSON.stringify(false),
    stringifiedArr: JSON.stringify([2003, 2017])
};

for (let key in testStringify) {
    console.log(`----------${key}-----------`);
    console.log(typeof testStringify[key]);
    console.log(testStringify[key]);
}

console.log(`------------stringifyObj------------`);
const obj = {
    drama: 'PET',
    season: 2017,
    casting: ['koyuki', 'matsumoto jun'],
    character: ['sumire', 'momo']
};
console.log(typeof JSON.stringify(obj));
console.log(JSON.stringify(obj));
console.log(JSON.stringify(obj, ['drama', 'season']));
console.log(JSON.stringify(obj, null, 4));
console.log(JSON.stringify(obj, (key, val) => {
    if (key === 'season') return 2003;
    return val;
}, 4));
