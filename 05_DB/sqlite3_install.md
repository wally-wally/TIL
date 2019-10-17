## :ballot_box: SQLite Install Process(windows)

<br>

### 1. 파일 두 개 다운로드 <a href=" https://www.sqlite.org/download.html " target="_blank">(공식 홈페이지)</a>

- 세 개 중에서 아래꺼 두 개 다운로드
  - `sqlite-dll-win64-x64-3300100.zip`
  - `sqlite-tools-win32-x86-3300100.zip`

<a href=" https://www.sqlite.org/download.html " target="_blank">![001](https://user-images.githubusercontent.com/52685250/66970196-8c07f280-f0c7-11e9-94c1-8ae84dcaf764.JPG)</a>

<br>

### 2. C 드라이브에 `sqlite` 폴더 생성 후 다운 받은 알집파일 풀어서 넣기

<img src="https://user-images.githubusercontent.com/52685250/66892504-d9805300-f026-11e9-948e-ca5662c6dd3a.JPG" width="600px">

<br>

### 3. 환경 변수 설정

- `시스템 변수` - `Path` - `C:\sqlite` 경로 추가

<img src="https://user-images.githubusercontent.com/52685250/66892505-d9805300-f026-11e9-964b-55ed21c15f10.JPG" width="700px">

<br>

### 4. `git bash ` 켜고 `winpty sqlite3` 명령어 입력하면 열림

<br>

### 5. [shortcut 설정] `code ~/.bashrc`로 `bashrc` 파일 열기

- `alias sqlite3="winpty sqlite3"` 추가 입력 후 저장
- `git bash`에서 `source ~/.bashrc` 입력하여 수정된 `bashrc`파일을 적용해야 한다.
- 그러면 `git bash` 에서 `winpty sqlite3` 라고 길게 입력하지 않고 `sqlite3`만 입력해도 열린다.