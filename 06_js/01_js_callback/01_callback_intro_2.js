function doSomoething(subject, callback) {
  console.log(`이제 ${subject} 과목평가 준비를 시작해볼까?`)
  callback()
}

// callback 함수를 익명함수로 작성할 때
doSomoething('django', function () {
  console.log('며칠 안남았는데?')
})

// callback 함수를 기명함수로 작할 때
function alertFinish() {
  console.log('며칠 안남았는데?')
}

doSomoething('django', alertFinish)