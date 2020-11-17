var a = "global";

function print1() {
  console.log(a);
}

function print2() {
  var a = "local";
  print1();
}

print1();
print2();
