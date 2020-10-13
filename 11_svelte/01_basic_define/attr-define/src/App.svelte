<script>
	let src = 'https://user-images.githubusercontent.com/52685250/95890409-bc5b9d00-0dbe-11eb-893a-fd087384afcc.png';
	let alt = 'wally-wally';
	let active = alt === 'wally-wally';
</script>

<!-- 속성, 클래스 약어 기능 적용 전 -->
<img class={alt === 'wally-wally' ? 'active' : ''} src="{src}" alt="{alt}">

<!-- 속성, 클래스 약어 기능 적용 후 후 -->
<img class:active={active} {src} {alt}>
<img class:active {src} {alt}>