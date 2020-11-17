var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for(var i = 0; i < array.length; i++){ // 조건식
    // 반복 실행될 코드
    console.log(array[i]);
}

var obj = {
    name : "object",
    weight : 30,
    isObject : true,
    arr : [1, 2, 3],
    obj : {property:1}
};
console.log(Object.keys(obj));

// ---------------------------------------------------------------
// 첫 번째 방법(for 구문으로 object property 반복하기)
var property_list = Object.keys(obj);
console.log("Property List :", property_list);

for( var i=0 ; i<property_list.length ; i++ ){
    var propertyName = property_list[i];
    console.log( "\t", propertyName, ": ", obj[propertyName] );
}

// 두 번째 방법(for in 구문으로 object property 반복하기)
for( var propertyName in obj ){
    console.log( "\t", propertyName, ": ", obj[propertyName] );
}
// ---------------------------------------------------------------

// 객체에 속성이 존재한지 확인할 때 for in 구문을 사용한다.
console.log("name" in obj);
console.log("age" in obj);

// 예제. for in 구문을 사용해서 obj의 속성 중, number 타입의 값을 모두 더해서 sum에 저장하도록 구문 작성
var obj = {
    name: "object",
    age: 10,
    weight: 5
}
var sum = 0;
for ( var propertyName in obj){
    if( typeof(obj[propertyName]) == "number" ){
        sum = sum + obj[propertyName];
    }
}

console.log("sum :", sum);
