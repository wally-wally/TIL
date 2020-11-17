let count = 0;

const timer = setInterval(() => {
	console.log(`${count++} 번째 함수가 실행됩니다.`);
}, 1000);

clearInterval(timer);