// Trie 구조 만들기
function makeTrie(word) {
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
        if (!currentNode.children[str]) {
          currentNode.children[str] = new Node(currentNode.value + str);
        } else {
          currentNode.children[str].wordCount += 1;
        }
        currentNode = currentNode.children[str];
      }
      currentNode.finish = true;
    }

    startsWith = prefix => {
      let currentNode = this.root;
      for (const str of prefix) {
        if (!(str in currentNode.children)) {
          return 0;
        }
        currentNode = currentNode.children[str];
      }
      return currentNode.wordCount;
    }
  }

  const trie = new Trie();
  trie.insert(word);

  return trie;
}

function solution(words, queries) {
  let trieGroupByLength = new Map(); // 정방향 trie
  let reversedTrieGroupByLength = new Map(); // 역방향 trie
  let wordCountGroupByLength = {}; // 글자 수별 단어 개수 Object
  
  // (1) 단어 글자 개수별로 trie 구축
  for (const word of words) {
    const wordLength = word.length;
    const reversedWord = word.split('').reverse().join('');
    // (1-1) 정방향 단어
    if (!trieGroupByLength.has(wordLength)) {
      trieGroupByLength.set(wordLength, makeTrie(word));
    } else {
      const trie = trieGroupByLength.get(wordLength);
      trie.insert(word);
    }
    // (1-2) 역방향 단어
    if (!reversedTrieGroupByLength.has(wordLength)) {
      reversedTrieGroupByLength.set(wordLength, makeTrie(reversedWord));
    } else {
      const reversedTrie = reversedTrieGroupByLength.get(wordLength);
      reversedTrie.insert(reversedWord);
    }
    // (1-3) 글자 수별 단어 개수 계산
    if (wordLength in wordCountGroupByLength) {
      wordCountGroupByLength[wordLength] += 1;
    } else {
      wordCountGroupByLength[wordLength] = 1;
    }
  }

  // 접두사 또는 접미사의 문자열로 시작하는 단어의 개수 구하는 함수
  // 해당 글자수의 trie가 없는 경우 0을 return하고 있는 경우 trie의 startsWith 메서드로 wordCount 추출
  const findWordMatchingQuery = (query, trie) => trie.startsWith(query);

  // (2) query 별로 해당되는 단어 개수 구하기
  let answer = [];
  for (const query of queries) {
    const queryLength = query.length;
    // (2-1) 해당 query 길이 값을 key로 하는 trie가 있는지 우선 확인
    if (!trieGroupByLength.has(queryLength)) {
      answer.push(0);
      continue;
    }
    // (2-2) 모든 글자가 와일드카드인 경우
    if (query[0] === '?' && query[queryLength - 1] === '?') {
      answer.push(wordCountGroupByLength[queryLength] || 0);
      continue;
    }
    // (2-3) 접두사인 경우
    if (query[0] !== '?') {
      const prefix = query.slice(0, query.indexOf('?'));
      answer.push(findWordMatchingQuery(prefix, trieGroupByLength.get(queryLength)));
      continue;
    }
    // (2-4) 접미사인 경우
    if (query[0] === '?') {
      const newQuery = query.split('').reverse().join('');
      const suffix = newQuery.slice(0, newQuery.indexOf('?'));
      answer.push(findWordMatchingQuery(suffix, reversedTrieGroupByLength.get(queryLength)));
      continue;
    }
  }
  return answer;
}

console.log(solution(
  ["frodo", "front", "frost", "frozen", "frame", "kakao"],
  ["fro??", "????o", "fr???", "fro???", "pro?", "?????", "????"]
));