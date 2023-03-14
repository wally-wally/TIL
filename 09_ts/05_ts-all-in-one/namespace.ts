// 네임스페이스
// 타입 간 충돌을 방지하기 위해 타입들을 가상의 그룹으로 묶어주는 것
declare namespace Wally {
    const aa: string;
    const bb: string;
    const cc: string;
}

Wally.aa;