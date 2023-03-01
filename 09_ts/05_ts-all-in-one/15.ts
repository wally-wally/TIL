// 타입스크립트는 건망증이 심하다.

interface Axios {
  get(): void;
}

class CustomError extends Error {
  response?: {
    data: any;
  }
}

declare const axios: Axios;

(async () => {
  try {
    await axios.get();
  } catch (err: unknown) {
    // const customError = err as CustomError; // 별도의 변수를 만들어서 타입이 이와 같이 저장해놓자. (as는 타입이 unknown일 때만 어쩔 수 없이 쓰자.)
    // console.error(customError.response?.data);
    // customError.response?.data;
    
    // 하지만 모든 에러가 CustomError이지는 않기 때문에 아래와 같이 타입 가드 형태로 분기 처리하는게 제일 좋다.
    // 이러면 as 키워드로 타입 단언을 할 필요도 없다.
    if (err instanceof CustomError) {
      console.error(err.response?.data);
      err.response?.data;
    }
  }
})();

const abc = <T = unknown>(v: T): T => { return v };
const def = abc(3);