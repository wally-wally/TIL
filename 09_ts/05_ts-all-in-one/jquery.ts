// jquery 타입 분석
const $p = $( "p" );

// removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;

document.querySelector('h1')?.addEventListener('click', function() {
    console.log(this);
})

// 메서드 체이닝이 가능한 이유은 removeClass, addClass의 리턴 타입이 this이기 때문이다.
$p.removeClass( "myClass noClass" ).addClass( "yourClass" );
$p.removeClass(['myClass', 'noClass']);
// 타입스크립트에서 첫 번째 인자가 this인 경우 무시하고 그 다음부터 진짜 해당 함수의 매개변수 타입이 시작되는 것에 주의하자!
$p.removeClass((index, className) => {
    return 'myClass';
});

$(["p", "t"]).text("hello");
const tag = $( "ul li" ).addClass(function( index ) {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data('name') + '입니다';
});

// jquery 타입 직접 만들어보기
// (지금 쓰지 않는 타입 부분은 굳이 안 만들어도 된다.)
interface zQuery<T> {
    text(param?: string | number | boolean | ((this: T, index: number) => string | number | boolean)): this;
    html(param: string | Document | DocumentFragment): void;
}

const $tag: zQuery<HTMLElement> = $(['p', 't']) as unknown as zQuery<HTMLElement>;
$tag.text('123');
$tag.text(123);
$tag.text(function(index) {
    console.log(this, index);
    return true;
});
$tag.text().html(document);