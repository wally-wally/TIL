function promiseForHomework(mustDo) {
  return new Promise((resolve, reject) => {  
    setTimeout(() => {
      console.log('doing homework');
      if(mustDo) {
        resolve({
          result: 'homework-result'
        });
      } else {
        reject(new Error('Too lazy!'));
      }
    }, 3000);
  });
};

const promiseA = promiseForHomework(true);
console.log('promiseA created', promiseA);

const promiseB = promiseForHomework();
console.log('promiseB created');

promiseA.then(v => console.log(v));
promiseB
  .then(v => console.log(v))
  .catch(e => console.error(e));