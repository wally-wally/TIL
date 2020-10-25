# media 태그

<br>

## 1. 8가지 Readonly 속성

> `readonly`로 바인딩할 수 있는 8가지 속성

- `duration` (Number): 총 재생 길이(초 단위)
- `buffered` (Array): `{start, end}`객체들의 배열로, 버퍼 된 위치를 표시
- `seekable` (Array): `{start, end}`객체들의 배열로, 위치를 찾을 수 있는 범위를 표시
- `played` (Array): `{start, end}`객체들의 배열로, 재생했던 위치들을 표시
- `seeking` (Boolean): 찾는 중인지를 표시하는 플래그
- `ended` (Boolean): 재생이 끝났는지를 표시하는 플래그
- `videoWidth` (Number): `<video>` 태그에서 사용할 수 있는 속성으로 `<video>` 태그의 너비를 나타냄
- `videoHeight` (Number): `<video>` 태그에서 사용할 수 있는 속성으로 `<video>` 태그의 높이를 나타냄

<br>

## 2. 4가지 Read, Write 가능한 속성

- `currentTime` (Number): 현재 재생 위치를 나타냄(초 단위)
- `playbackRate` (Number): 재생 속도를 나타냄(normal: 1)
- `paused` (Boolean): 일시정지됐는지 표시하는 플래그
- `volume` (Number): 음량의 크기를 나타냄(0과 1 사이의 값)