function callback(){
    console.log("callback function is called");
}

setTimeout(callback, 3000); // 뒤에 들어간 인자인 시간은 ms 단위
setInterval(callback, 5000);
clearInterval(2);