# 09. module federation

<br>

## (1) Concept goals

- webpack이 지원하는 모든 모듈 유형을 노출하고 사용할 수 있어야 합니다.
- 청크 로드는 필요한 모든 것을 병렬 로드 해야 합니다(웹: 서버까지 한번의 라운드트립).
- 소비자에서 컨테이너까지 제어.
  - 오버라이딩 모듈은 단방향 작업입니다.
  - 형제 컨테이너는 서로의 모듈을 오버라이드 할 수 없습니다.
- 환경에 의존하지 않습니다.
  - 웹, Node.js, 등에서 사용 가능합니다.
- 공유의 상대 및 절대 요청
  - 사용하지 않더라도 항상 제공됩니다.
  - 상대 경로를 `config.context`에서 확인할 수 있습니다.
  - 기본적으로 `requiredVersion`을 사용하지 않습니다.
- 공유 모듈 요청
  - 사용할 때만 제공됩니다.
  - 빌드에서 사용된 모든 동일 모듈 요청과 일치합니다.
  - 일치하는 모든 모듈을 제공합니다.
  - 그래프의 이 위치에 있는 package.json에서 `requiredVersion`을 추출합니다.
  - 중첩된 node_module이 있는 경우 여러 다른 버전을 제공하고 사용할 수 있습니다.
- 공유된 후행에 `/` 가 있는 모듈 요청은 이 접두사의 모든 모듈 요청과 일치합니다.

<br>

## (2) Dynamic Remote Containers

- 컨테이너 인터페이스는 `get` 및 `init` 메소드를 지원한다.
- `init`은 하나의 인수(공유 범위 객체)로 호출되는 `async` 호환 메소드이다.
- 이 객체는 원격 컨테이너에서 공유 범위로 사용되며 호스트에서 제공된 모듈로 채워진다.
- 원격 컨테이너를 런타임에 동적으로 호스트 컨테이너에 연결하는데 사용할 수 있습니다.

```javascript
// init.js
(async () => {
  // 공유 범위를 초기화 합니다. 이 빌드와 모든 원격에서 제공된 모듈로 채웁니다
  await __webpack_init_sharing__('default');
  const container = window.someContainer; // 또는 다른 곳에서 컨테이너를 얻으십시오
  // 컨테이너 초기화, 공유 모듈 제공 가능합니다
  await container.init(__webpack_share_scopes__.default);
  const module = await container.get('./module');
})();
```

- 컨테이너는 공유 모듈을 제공하려고 시도하지만, 공유 모듈이 이미 사용된 경우, 경고 및 제공된 공유 모듈이 무시된다.
- 컨테이너는 여전히 대체 수단으로 사용할 수 있다.
- 이렇게 하면 다른 버전의 공유 모듈을 제공하는 A/B 테스트를 동적으로 로드 할 수 있다.

- 전체 구현 코드를 보려면 [여기](https://github.com/module-federation/module-federation-examples/tree/master/advanced-api/dynamic-remotes)를 클릭하세요.

<br>

## (3) Dynamic Public Path

### :star: Offer a host API to set the publicPath

- 호스트가 원격 모듈의 메소드를 노출하여 런타임 원격 모듈의 publicPath를 설정하도록 허용할 수 있다.
- 이 접근 방식은 호스트 도메인의 하위 경로에 독립적으로 배포된 하위 응용 프로그램을 마운트 할 때 특히 유용하다다.
- 예시 시나리오
  - `https://my-host.com/app/*`에 호스팅 된 호스트 앱과 `https://foo-app.com`에 호스팅 된 하위 앱이 있다.
  - 하위 앱도 호스트에 마운트되므로, `https://foo-app.com`은 `https://my-host.com/app/foo-app`와 `https://my-host.com/app/foo/*`를 통해 접근할 수 있다.
  - 요청은 프록시를 통해 `https://foo-app.com/*`로 리다이렉션 된다.

**webpack.config.js (remote)**

```javascript
module.exports = {
  entry: {
    remote: './public-path',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote', // 이 이름은 엔트리 이름과 일치해야 합니다.
      exposes: ['./public-path'],
      // ...
    }),
  ],
};
```

**public-path.js (remote)**

```javascript
export function set(value) {
  __webpack_public_path__ = value;
}
```

**src/index.js (host)**

```javascript
const publicPath = await import('remote/public-path');
publicPath.set('/your-public-path');

//boostrap app  e.g. import('./boostrap.js')
```
