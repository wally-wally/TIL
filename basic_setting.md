## 초기 세팅

- Python 3.5 또는 Python 3.7 설치

- Git bash for windows 설치 [참고 링크](https://tnsgud.tistory.com/648)

- Visual Studio Code 설치

- Visual Studio Code 기본 세팅

  - console 창 git bash로 변경

    - `Ctrl + K`, `Ctrl + S` 입력 후 `Terminal: Create New Integrated Terminal` 의 단축키를 `Ctrl` + ` 으로 변경
    - `View: Toggle Integrated Terminal` 항목은 `Ctrl` + `Shift` + `으로 변경

  - settings.json 편집 [참고 링크](https://mishka.kr/2019/06/24/vscode-gitbash/)

    - ```json
      {
          "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
          "workbench.startupEditor": "newUntitledFile",
          "editor.renderIndentGuides": false,
          "editor.minimap.enabled": false,
          "editor.renderWhitespace": "boundary",
          "window.zoomLevel": 0,
          "files.autoGuessEncoding": true,
          "workbench.colorTheme": "One Monokai",
          "editor.tabSize": 2,
          "[python]": {
              "editor.tabSize": 4,
              "editor.insertSpaces": true
          },
      }
      ```

  - 기본 Tab Size 변경

    - 상단 메뉴에서 `File` > `Preferences` > `Settings` 에 들어가서 검색창에 `detect`라고 검색한 후
    - `Editor: Tab Size` 항목을 찾아 기본값을 4에서 2로 바꾸면 된다.

  - vscode extensions

    - Beautify
    - Django
    - Open in browser
    - Python
    - Vetur
    - Vue VSCode Snippets
    - 각자 원하는 Theme 설치
    - 기타 설치하고 싶은 extensions 설치