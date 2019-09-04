# :notebook_with_decorative_cover: 01_python - Day01

---

:white_check_mark: **Python 7월15일(1일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_1.md">(바로 이동)</a>

---

<br>

## 1. 7월15일(1일차)

### 1.1 단축키 설정방법(단축키로 jupyter notebook 실행)

- `code ~/.bashrc`
- .bashrc파일에서 <u>alias 단축키명="원래이름"</u> 추가 작성  ex) alias jp="jupyter notebook"
- 저장 후 `source ~/.bashrc`하면 적용됨

<br>

### 1.2 jupyter notebook - keyboard shortcuts

> edit mode, command mode

- 현재 상태 확인하기 : edit mode(초록색), command mode(파란색)

- command mode -> edit mode : enter 또는 마우스 더블클릭

- edit mode -> command mode : [Shift] + [Enter]하면 적용 후 다음 셀로 이동

> command mode에서...

- command mode에서 [D]를 빠르게 두 번 누르면 선택된 셀이 지워짐

- command mode에서 [Z]를 누르면 실행 취소의 개념으로 지워진 셀이 다시 복구됨

- command mode에서 [A]를 누르면 그 셀 위로 새로운 셀이 생성됨

- command mode에서 [B]를 누르면 그 셀 아래로 새로운 셀이 생성됨

> edit mode일 때 Enter 단축키 종류

- [Ctrl] + [Enter] : 현재 셀 실행

- **[Shift] + [Enter] : 실행 + 다음 셀 선택(다음 셀 없으면 새로운 셀 생성) => 주로 이거로 사용!**

- [Alt] + [Enter] : 실행 + 다음 셀 생성

> 추가내용

- 궁금한 단축키가 있으면 [H]를 누르면 단축키 내용이 나옴
- 메뉴의 [Kernel] > [Restart & Clear Output] : 무한루프 빠졌을 때 강제 재실행

<br>

### 1.3 Programming Font의 조건

- **고정폭 글꼴**
  - 고정폭이어야 프로그래밍시 위치를 잘 잡을 수 있음

- **Sans-serif**

- **가독성과 명확한 구분**
  - 숫자 1, 소문자 L, 대문자 L, Pipe와 같은 것들이 구분될 수 있어야 함
