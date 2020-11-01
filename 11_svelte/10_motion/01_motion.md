# 01_motion

<br>

## 1. motion이란

- Svelte는 변수의 값이 변경되었을 때 애니메이션을 실행시키는 `Motion` 기능을 제공하는데 `Motion`은 `Store`이다.

- `Motion`에는 `Tweened`와 `Spring`이 있으며 사용법은 아래와 같다.
  - 이 두 함수는 `easing` 함수를 사용해서 애니메이션을 동작한다.

```javascript
store = tweened(value: any, options)
```

```javascript
store = spring(value: any, options)
```

<br>

## 2. `tweened` 함수

- 2개의 인자를 가지며 첫 번째 인자는 변경되는 값을, 두 번째 인자는 옵션이다.
- 이 함수는 `store`를 return하며, `options`에 설정할 수 있는 값은 다음과 같다.
  - `delay` (number, default: 0): 단위는 [ms]이고, 설정한 시간 후에 시작된다.
  - `duration` (number, default: 400): 단위는 [ms]이고, 설정한 시간 동안 실행된다.
  - `easing` (function, default: t => t): `easing` 함수이며, svelte는 기본적으로 30가지 템플릿을 제공한다. 또한 커스텀하게 만들 수도 있다.
  - `interpolate` (function): 두 값 사이를 보간하여 좀 더 부드럽게 보여주기 위해 사용되는 옵션으로, `(a, b) => t => value` 형태가 와야 한다. `a`는 시작 값, `b`는 목표값, `t`는 0과 1 사이의 숫자이며, `value`는 결과값이다.

- `easing` 함수 기본 템플릿 참고 사이트: https://svelte.dev/docs#svelte_easing

- `store.set`과 `store.update`의 두 번째 인자에 `options`를 전달할 수 있다. 
  - 전달된 옵션은 기본값(인스턴스를 생성할 때 사용한 `tweened(value, options)`의 `options`가 기본값임)에 override 된다.
  - `set`과 `update` 함수의 return 값은 `Promise` 객체이며, tween 작업이 완료되면 `Promise`가 `resolve` 된다.

- `tweened` 예제 코드

```html
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// 0.4초 후에 0.2초 동안 동작하며 그 동작은 cubicOut이라는 애니메이션을 사용한다는 의미
	const progress = tweened(0, {
		delay: 200,
		duration: 400,
		easing: cubicOut,
	});
</script>

<!-- tweened의 return 값은 store이므로 $ 키워드를 사용해서 자동 구독하며 value에 할당했다. -->
<progress value={$progress}></progress>

<button on:click={() => $progress = 0}>0%</button>
<button on:click={() => $progress = 0.25}>25%</button>
<button on:click={() => $progress = 0.5}>50%</button>
<button on:click={() => $progress = 0.75}>75%</button>
<button on:click={() => $progress = 1}>100%</button>
```

<br>

## 3. `spring` 함수

- `spring` 함수는 자주 변경되는 값에 애니메이션을 적용할 때 사용하면 좋다.
- `spring` 함수를 사용하면 스프링처럼 변하는 애니메이션 효과를 누릴 수 있다.
- `spring` 함수는 2개의 인자를 가지며 첫 번째 인자는 변경되는 값을, 두 번째 인자는 옵션이다.
- 이 함수는 `store`를 return하며 `options`에 설정할 수 있는 값들은 다음과 같다.
  - `stiffness` (number, default: 0.15): 0과 1 사이의 값으로 값이 높을수록 즉시 Motion에 반영된다.
  - `damping` (number, default: 0.8): 0과 1 사이의 값으로, 값이 낮을수록 스프링처럼 튕기는 Motion의 범위가 넓어진다.
  - `precision` (number, default: 0.001): 스프링처럼 튕기는 동작이 정착된(settled) 것으로 간주하는 임계값(threshold)이다. 클수록 스프링처럼 튕기는 횟수가 줄어들고, 값이 낮을수록 스프링처럼 튕기는 횟수가 증가한다.

- `spring` 예제 코드

```html
<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25,
		precision: 0.01,
	});
</script>

<div>
	<label>
		<h3>stiffness ({coords.stiffness})</h3>
		<input bind:value={coords.stiffness} type="range" min="0" max="1" step="0.01">
	</label>
	<label>
		<h3>damping ({coords.damping})</h3>
		<input bind:value={coords.damping} type="range" min="0" max="1" step="0.01">
	</label>
	<label>
		<h3>precision ({coords.precision})</h3>
		<input bind:value={coords.precision} type="range" min="0" max="10" step="0.01">
	</label>
</div>

<svg
	on:mousemove={e => coords.set({ x: e.clientX, y: e.clientY })}
>
	<circle cx={$coords.x} cy={$coords.y} r={10}>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	circle {
		fill: red;
	}

	div {
		position: absolute;
		right: 0;
	}
</style>
```

