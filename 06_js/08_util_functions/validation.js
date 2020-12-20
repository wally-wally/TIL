// 아이디, 비밀번호, 한글 이름, 이메일 양식 검사하는데 유용한 함수

let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let alphabetReg = /[a-zA-Z]/g;
let alphabetLowerCaseReg = /[a-z]/g;
let numberReg = /[0-9]/g;
let koreanReg = /[가-힣]/g;
let koreanConsonantVowelReg = /[ㄱ-ㅎ|ㅏ-ㅣ]/g;
let specialMarkReg = /[~!@#$%^&*()_+|<>?:{}]/g;

const validation = {
  idValidation: id => { // ex) 6자 이상 이면서 영어 소문자 4자 이상, 숫자 2자 이상이 포함된 아이디 검사
    return id.length >= 6 && id.match(alphabetLowerCaseReg).length >= 4 && id.match(numberReg).length >= 2;
  },
  passwordValidation: password => { // ex) 10자 이상이면서, 영어 소문자 6자 이상, 숫자 4자 이상인 비밀번호 검사
    return password.length >= 10 && password.match(alphabetLowerCaseReg).length >= 6 && password.match(numberReg).length >= 4;
  },
  usernameValidation: username => { // ex) 2자 이상 5자 이하인 한글 이름 검사
    return username.length >= 2 && username.length <= 5 && koreanReg.test(username) && !numberReg.test(username) && !alphabetReg.test(username) && !specialMarkReg.test(username) && !koreanConsonantVowelReg.test(username);
  },
  emailValidation: email => { // ex) 이메일 양식 검사
    return emailReg.test(String(email).toLowerCase());
  }
}

export default validation;