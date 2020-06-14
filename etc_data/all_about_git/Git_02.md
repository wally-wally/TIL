# :computer: Git_02

<br>

---

:heavy_check_mark: <b>Contents</b>

- git의 전반적인 작업 흐름
- git 자격 설정 과정
- git `add`, `commit`, `push`

---

<br>

## 1. git의 전반적인 흐름 <a href="https://linked2ev.github.io/devlog/2018/09/18/Git-3.-Git-Flow-info" target="_blank">(참고 문서)</a>

![git_02_01](https://user-images.githubusercontent.com/52685250/72070773-a7347800-332d-11ea-8ec6-86c7b818157b.png)

:warning: <b>git을 사용하면서 아주 중요하고 기본적인 용어로 <u>`add` => `commit` => `push`를 순서대로 반드시</u> 알아두자!</b>

- `add`
  - 작업하고 있는 컴퓨터에서 완료한 후 작업한 내용은 staging area(준비 영역)의 역할을 하는 `INDEX`에 올리게 된다.
  - 만약 `add` 과정을 실행한 후 추가로 진행된 작업이 있는 경우 `add`를 한번 더 하게 되면 가장 최근에 `add`한 내용들로 덮어씌워진다.
- `commit`
  - `INDEX`에 준비된 파일들을 Github과 같은 원격 저장소에 올릴 최종본을 `HEAD`에 올리는 `commit` 작업을 수행한다.
- `push`
  - `commit` 까지만 하게 되면 현재 로컬 저장소(본인이 작업하고 있는 환경)에만 저장되어 있으므로 `push` 과정을 수행하여 Github, Gitlab과 같은 원격 저장소에 반영이 된다.

<br>

## 2. git 자격 설정 과정(for windows)

:warning: <b>컴퓨터에서 처음으로 git 작업을 수행할 때만 하면 된다.</b>

- git bash를 연 후 아래 명령어를 입력한다.

- windows 자격 증명에 등록할 이름(name)을 설정

  ```bash
  git config --global user.name "등록할 이름"
  ```

- windows 자격 증명에 등록한 이름에 등록할 이메일 계정 설정(주로 원격 저장소(github)에서 로그인하는 이메일 계정과 동일하게 작성한다.)

  ```bash
  git config --global user.email 이메일 주소
  ```

<br>

## :heavy_exclamation_mark: 본격적으로 시작하기 전에...!

- github이나 gitlab에서 새로운 repository를 생성한 후 아래와 같은 화면(github을 예시로 함)이 나온 상태로 만든 후 진행하세요!
  ![002](https://user-images.githubusercontent.com/52685250/72072262-e6b09380-3330-11ea-9a17-973adba66655.JPG)

<br>

## 3. git `add`, `commit`, `push`

### 3.1 `git init` - repository 처음 생성시 딱 한 번만 수행하면 됨!

- git 한테 저장소 권한을 부여하는 명령어를 입력한다.(새로운 폴더(디렉토리)를 생성하면 가장 먼저 반드시 입력해야 하는 명령어)

  ```bash
  git init
  ```

  이 때 주의해야 할 사항은 관리할 최상위 폴더의 위치에서 `git init`을 생성하고 `add - commit - push` 과정을 진행해야 한다.

- 아래 사진과 같이 파일들을 올릴 최상위 위치에서 git bash를 열면 된다.

![git_02_02](https://user-images.githubusercontent.com/52685250/72071809-fa0f2f00-332f-11ea-9c2d-22ce71e1f6c0.png)

- 다시 한번 더 git bash 창에서 파일 경로를 확인한 후 `git init`을 입력하면 `(master)`가 새로 생성된다. 이는 master branch를 의미한다.

![git_02_03](https://user-images.githubusercontent.com/52685250/72071810-faa7c580-332f-11ea-9ec9-3e514f1a683e.png)

<br>

### 3.2 `git add`

- 수정사항이 있는 경우 `git add .`를 입력한다.(이 때 맨 마지막에 있는 온점(.)도 반드시 포함해 준다.)

  - 여기서 해당되는 `수정사항`은 파일 또는 폴더의 추가, 변경, 삭제, 이름 변경, 코드의 수정, 삭제 등 사소한 변경사항 모두 포함한다.
  - 원래는 파일이나 폴더명을 하나하나 입력한 후 `add` 과정을 수행해야 하지만 많은 변경사항이 있는 경우 오래 걸리기 때문에 온점(.)을 사용하여 모든 수정사항이 반영되도록 한다.

  ```bash
  git add .
  ```

<br>

### 3.3 `git commit`

- `commit` 과정을 수행하면서 원격 저장소에 올릴 준비를 마친다.

- 이 때 수정사항들이 git bash 창에 나타난다.

  - 여기서 `commit 명`은 어떤 변경사항들이 있는지 간략하게 제목형태로 적는 이름을 말한다.

  ```bash
  git commit -m "등록할 commit 명"
  ```

![git_02_04](https://user-images.githubusercontent.com/52685250/72072574-9dad0f00-3331-11ea-9d1e-7d03fe386745.png)

<br>

### 3.4 `git remote` - repository 처음 생성시 딱 한 번만 수행하면 됨!

- github에서 새로운 repository를 만든 후 보여지는 예시 command line에서 `remote`와 관련된 구문을 git bash로 복사하여 붙여넣고 실행한다.(로컬 저장소와 원격 저장소를 연결하는 과정임)

  ```bash
  git remote add origin https://github.com/wally-wally/git_test.git
  ```

- 여기서 `origin`은 내가 등록하고 싶은 remote 명으로 작성해도 된다.
  - 단! 같은 폴더에서 두 개의 다른 원격 저장소에 올리고 싶을 때 remote명을 다르게 해야 한다.
  - 예를 들면 내가 만든 프로젝트를 github과 gitlab 두 곳에 올리고 싶을 때 github은 `origin`, gitlab은 `origin`이 아닌 다른 이름으로 remote 명을 작성하면 된다.
- 추가로 remote 내용을 확인할 때 사용되는 명령어는 `git remote -v`이다.

![git_02_05](https://user-images.githubusercontent.com/52685250/72073006-6ab74b00-3332-11ea-8134-2169e337de56.png)

<br>

### 3.5 `git push`

- 이제 마지막으로 원격 저장소에 올리면 된다.

- 주의해야 할 점은 repository를 처음 만들고 `push` 과정을 수행할 때는 아래와 같은 명령어로 `push`하고 두 번째로 `push`할 때는 `git push`라고만 입력하면 된다.

  ```bash
  git push -u origin master
  ```

  만약에 `git remote` 과정에서 remote명을 `origin`이 아닌 다른 이름으로 한 경우 `git push -u origin master` 구문에서 `origin` 대신에 작성한 그 remote명으로 입력해야 한다.

- 만약에 컴퓨터에서 처음으로 git 작업을 수행하는 경우 원격 저장소의 아이디(또는 이메일 주소)와 비밀번호를 작성해야 한다. (처음에 한 번만 작성하고 그 다음부터는 작성 안 함)
  - 이 때 틀리지 않고 정확하게 작성해야 한다. 틀리는 경우 그 원격 저장소의 window 자격 증명을 삭제한 후 다시 처음부터 수행해야 한다.(window 자격 증명 관련 내용은 추후에 다시...)

![git_02_06](https://user-images.githubusercontent.com/52685250/72073434-3abc7780-3333-11ea-8b06-9fd6f15f146d.png)

- 위 사진과 같이 빨간 글씨나 노란 글씨 없이 올바르게 원격 저장소에 올라가면 끝!

![git_02_07](https://user-images.githubusercontent.com/52685250/72073491-5fb0ea80-3333-11ea-9a5d-360048165f21.png)