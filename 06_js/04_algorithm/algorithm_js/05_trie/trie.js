// 참고: https://velog.io/@ansrjsdn/Trie-자료구조-JavaScript
const words = ['apple', 'grape', 'watermelon', 'banana', 'glove', 'water', 'application', 'bat', 'ball', 'great'];

const Node = function () { // 각각의 노드
  this.keys = new Map(); // 현재 노드에서 갈 수 있는 문자들을 저장할 Map
  this.end = false; // 해당 문자에서 끝나는 문자열이 있는지 확인.
  this.count = 0; // 지나 갔을 때 1 씩 증가시켜, 1보다 클 경우 지나간 문자가 자신말고 더 있다는 것을 알 수 있다.
  this.plusCount = function () {
    this.count += 1;
  };
  this.setEnd = function () {
    this.end = true;
  };
  this.isEnd = function () {
    return this.end;
  };
};

const Trie = function () { // Trie 자료구조
  this.root = new Node();

  this.add = function (input, node = this.root) { // Trie에 문자열을 추가 하는 메소드.
    if (input.length === 0) { // 끝날 경우 end로 표시하고 종료
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) { // 첫번째 문자가 없으면 추가 해줌.
      node.keys.set(input[0], new Node());
    }
    node.plusCount(); // 지나갔다고 1 증가 시킨다.
    return this.add(input.substr(1), node.keys.get(input[0])); // 첫번재 문자를 뺀 문자열과, 해당 값의 Map으로 재귀
  };

  this.isSubWord = function (word) { // 자신이 부분 문자열이 되는지 확인.
    let node = this.root;
    while (word.length > 0) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
    // 끝까지 갔을 때 자신의 count가 0보다 크면 부분 문자열이다.
    // 마지막 문자열일 때는 +1을 해주지 않으므로 마지막까지 갔을 때 node의 count가 0이면 그 문자는 유니크한 것.
    return node.count > 0 ? true : false;
  };

  this.isWord = function (word) { // 있는 문자인지 확인 하는 메소드
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    } // 마지막 문자가 해당 key에 있고 그 node가 end이면 true 아닐 경우 false
    return node.keys.has(word) && node.keys.get(word).isEnd() ? true : false;
  };
 
  this.print = function () { // 모든 문자열을 array로 return 해주는 함수.
    let words = [];
    let search = function (node = this.root, string) {
      if (node.keys.size !== 0) {
        for (let letter of node.keys.keys()) {
          // search 재귀, concat으로 현재 문자열은 그대로 두고 letter를 더한 문자열을 반환하게 한다.
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, '');
    return words.length > 0 ? words : null;
  };
};

const trie = new Trie();

for (const word of words) {
  trie.add(word);
}
console.log(trie.isWord('app'));
console.log(trie.isWord('apple'));
console.log(trie.isSubWord('app'));
console.log(trie.isSubWord('apple'));
console.log(trie.print())