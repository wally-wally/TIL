# 03. float를 해제하는 방법

<br>

float 속성을 자식 엘리먼트에 사용하게 되면 부모 엘리먼트가 자식의 높이를 감지할 수 없기 때문에 이를 반영하기 위한 방법이 필요하다.

<br>

```html
<div class="parent">
  부모
  <div class="child">
    자식
  </div>
</div>
```

```css
.child {
  float: left;
}
```

<br>

## (1) float된 요소의 부모 태그에 강제로 높이 값 지정

- 단점 : 반응형시 자동 높이 값 설정 불가

<br>

## (2) float된 요소의 부모태그에 float를 또 설정

```css
.parent {
  float: left;
}
```

- 자식을 포함할 만큼만 너비로 줄어든다.
- 부모가 겹겹이 있을 경우 계속해서 float 시켜야 함
- 가운데 배치가 불가능하다는 단점이 있다.

<br>

## (3) float된 요소의 부모태그에 `overflow` 속성 적용

- `overflow: hidden;`
  - 자식의 너비가 더 크면 잘림
  - 해당 요소 안의 컨텐츠를 박스 외부로 표현해줄 수 없음
- `overflow: auto;`
  - 자식의 너비가 더 크면 스크롤바 생김

<br>

## (4) 부모가 끝나기 전 빈 엘리먼트로 `clear` 속성 적용

```css
<div class="parent">
  부모
  <div class="child">
    자식
  </div>
  <div class="clearfix">
  </div>
</div>
```

```css
.clearfix {
  clear: both;
  height: 0;
  overflow: hidden;
}
```

- 의미없는 엘리먼트를 넣기 때문에 권장하지 않음
- `clear: both;`가 적용된 요소에는 `margin-top` 적용 불가

<br>

## (5) [권장] float된 부모 태그의 가상요소에 `clear` 속성 적용

```css
.parent::after {
  content: '';
  display: block;
  clear: both;
}
```

<br>

---

:page_facing_up: <b>Reference</b>

- https://github.com/baeharam/Must-Know-About-Frontend/blob/master/Notes/css/float-clear.md
- https://neul-carpediem.tistory.com/278

---

