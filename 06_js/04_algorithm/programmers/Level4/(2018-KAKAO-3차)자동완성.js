function solution(words) {
  class Node {
    constructor(value = '') {
      this.value = value;
      this.finish = false;
      this.children = {};
      this.wordCount = 1;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new Node();
    }
  
    insert = string => {
      let currentNode = this.root;
      for (const str of string) {
        const currentStr = str;
        if (!currentNode.children[currentStr]) {
          currentNode.children[currentStr] = new Node(currentNode.value + currentStr);
        } else {
          currentNode.children[currentStr].wordCount += 1;
        }
        currentNode = currentNode.children[currentStr];
      }
      currentNode.finish = true;
    }
  }

  const trie = new Trie();
  words.forEach(word => trie.insert(word));

  let answer = 0;
  const checkCharCount = (trie, trieDepth) => {
    for (const node in trie.children) {
      if (trie.children[node].wordCount === 1) {
        answer += trieDepth;
        continue;
      }
      if (trie.children[node].finish) {
        answer += trieDepth;
      }
      checkCharCount(trie.children[node], trieDepth + 1);
    }
  }
  
  checkCharCount(trie.root, 1);
  return answer;
}

console.log(solution(['go', 'gone', 'guild']));
console.log(solution(['abc', 'def', 'ghi', 'jklm']));
console.log(solution(['word', 'war', 'warrior', 'world']));