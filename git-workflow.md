- branch 쪽에서 하는 일

`git clone 포크 주소`

`git remote -v`

`git remote add upstream 중앙 주소`

---

- 브렌지 만들기
  - `git checkout -b feature/login`
- (참고)브렌치 지우기(master로 이동 후 지우자)
  - `git branch -d feature/login`
- fork 뜬 곳에 git push
  - `git push origin feature/login`
- 중앙 저장소로 fork 뜬 곳의 feature/login을 pull request
- 중앙쪽에서 merge한 후 branch 쪽에서 새로운 버전의 중앙 저장소의 내용을 pull 해야 한다.
- branch 쪽은 master로 이동 후 `git pull upstream master`를 해야 새로운 버전으로 pull 받아진다.
- 그리고 내 메인 저장소(master)에서 `git push origin master`
- 한 싸이클이 끝나면 local 쪽의 기능 구현 끝난 branch는 지워도 무관하다.
  - fork 뜬 곳에 branch의 기록들이 남아 있기 때문



:warning: 주의!

- 개발의 명칭이 겹치지 않게!
- 변수명을 서로 안 꼬이게 잘 맞춰주자
- 결국에는 master 관리자도 fork를 떠서 개발하면 된다.
- **중앙 저장소(master)는 update 하거나 merge 하는 용도로만!!! => master에서는 건들지 말자!**
- branch 이름 작성시에는 기능별로 branch를 따자 (ex. `feature/login`, `feature/logout`)
- 같은 파일의 같은 라인이 동시에 다르게 수정되지 않도록 주의하자!



- master(중앙 저장소) 쪽에서는 modeling 까지는 되어 있어야 멤버들이 서로 나눠서 movie app, account app을 개발할 수 있다!