# :mag: Internet Explorer에서 Grid 속성 사용하기

<br>

| 표준                     | Internet Explorer                     |
| ------------------------ | ------------------------------------- |
| display: grid;           | display: -ms-grid;                    |
| grid-template-rows       | -ms-grid-rows                         |
| grid-template-columns    | -ms-grid-columns                      |
| grid-row-start           | -ms-grid-row                          |
| grid-column-start        | -ms-grid-column                       |
| grid-row: 1 / span 2;    | span 2 대신에 -ms-grid-row-span: 2    |
| grid-column: 1 / span 2; | span 2 대신에 -ms-grid-column-span: 2 |
| align-self               | -ms-grid-row-align                    |
| justify-self             | -ms-grid-column-align                 |

- Internet Explorer에서는 `grid-row-end`, `grid-column-end` 대체 속성이 없다.

  - 그래서 두 번째 라인에서 시작해서 세 칸을 차지하고 싶을 때는 다음과 같이 작성하면 된다.

  ```css
  .container {
    -ms-grid-row: 2;
    -ms-grid-row-span: 3;
  }
  ```

  