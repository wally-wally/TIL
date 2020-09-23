# 2. MVC, MVP, MVVM

<br>

## (1) MVC 패턴

![mvc](https://magi82.github.io/images/2017-2-24-android-mvc-mvp-mvvm/mvc.png)

- 구성
  - Model : 프로그램에서 사용되는 실제 데이터 및 데이터 조작 로직을 처리하는 부분
  - View : 사용자에게 보여지는 UI 부분
  - Controller : 사용자의 입력을 받고 처리하는 부분
- 동작
  - Controller로 사용자의 입력이 들어온다.
  - Controller는 사용자의 입력 확인 후 Model을 업데이트한다.
  - Model은 해당 데이터를 보여줄 View를 선택해서 화면에 보여준다.
- 특징
  - Controller는 여러 개의 View를 선택할 수 있는 1 : n 구조
  - Controller는 View를 선택할 뿐 직접 업데이트 하지 않음
- 장점
  - 가장 단순
  - 단순하다 보니 보편적으로 많이 사용
- 단점
  - View와 Model 사이 의존성이 높다.
  - 이 둘 사이의 높은 의존성은 어플리케이션이 커질수록 복잡해지고 유지보수를 어렵게 한다.

<br>

## (2) MVP 패턴

![mvp](https://magi82.github.io/images/2017-2-24-android-mvc-mvp-mvvm/mvp.png)

- Presenter : View에서 요청한 정보를 Model로부터 가공해서 View로 전달하는 부분
- 동작
  - View로 사용자의 입력이 들어온다.
  - View는 Presenter에게 작업을 요청한다.
  - Presenter에서 필요한 데이터를 Model에게 요청한다.
  - Model은 Presenter에게 필요한 데이터를 응답한다.
  - Presenter는 View에게 데이터를 응답해서 Presenter로부터 받은 데이터를 보여준다.
- 특징
  - Presenter는 View와 Model의 인스턴스를 가지고 있어 둘을 연결하는 접착제 역할
  - Presenter와 View는 1 : 1관계
- 장점
  - View와 Model의 의존성이 없다.
  - MVC 패턴의 단점이었던 View와 Model의 의존성을 해결함(Presenter를 통해서만 데이터를 전달 받기 때문)
- 단점
  - MVC 패턴의 단점인 View와 Model 사이의 의존성은 해결되었지만, View와 Presenter 가 1:1로 강한 의존성을 가지게 되는 단점이 있다.
  - 어플리케이션이 복잡해 질 수록 View와 Presenter 사이의 의존성이 강해지는 단점이 있다.

<br>

## (3) MVVM 패턴

![mvvm](https://magi82.github.io/images/2017-2-24-android-mvc-mvp-mvvm/mvvm.png)

![mvvm-pattern](https://joshua1988.github.io/images/posts/web/vuejs/mvvm-pattern.png)

- ViewModel
  - View를 표현하기 위해 만들어진 View를 위한 Model
  - View와 Model을 연결해주는(바인딩 해주는) 중개자 역할
- 동작
  - View에 입력이 들어오면 Command 패턴으로 ViewModel에 명령을 함
  - ViewModel은 필요한 데이터를 Model에게 요청
  - Model은 ViewModel에게 필요한 데이터를 응답
  - ViewModel은 응답 받은 데이터를 가공해서 저장
  - View는 ViewModel과의 Data Binding으로 인해 자동으로 갱신됨
- 특징
  - Backend 로직과 Client 의 마크업 & 데이터 표현단을 분리하기 위한 구조로 전통적인 MVC 패턴의 방식에서 기인하였다.
  - 간단하게 생각해서 화면 앞단의 화면 동작 관련 로직과 뒷단의 DB 데이터 처리 및 서버 로직을 분리하고, 뒷단에서 넘어온 데이터를 Model 에 담아 View 로 넘어주는 중간 지점을 ViewModel로 보면 된다.
  - Command 패턴과 Data Binding 두 가지 패턴을 사용하여 구현되었는데 이들을 이용해서 View와 ViewModel 사이의 의존성을 없앴다.
  - ViewModel과 View는 1 : n 관계이다.
- 장점
  - MVVM 패턴은 View와 Model 사이의 의존성이 없다.
  - 또한 Command 패턴과 Data Binding을 사용하여 View와 View Model 사이의 의존성 또한 없앤 디자인패턴이다.
  - 각각의 부분은 독립적이기 때문에 모듈화 하여 개발할 수 있다.
- 단점
  - ViewModel의 설계가 쉽지 않다.

---

:heavy_check_mark: <b>[참고] Command 패턴</b>

- **실행될 기능(요구사항)을 캡슐화**함으로써 **주어진 여러 기능을 실행할 수 있는 재사용성이 높은** 클래스를 설계하는 패턴
- 즉, 이벤트가 발생했을 때 실행될 기능이 다양하면서도 변경이 필요한 경우에 이벤트를 발생시키는 클래스를 변경하지 않고 재사용하고자 할 때 유용하다.

---

<br>

---

:page_facing_up: <b>Reference</b>

- https://beomy.tistory.com/43
- https://magi82.github.io/android-mvc-mvp-mvvm/
- https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/
- https://gmlwjd9405.github.io/2018/07/07/command-pattern.html

---



