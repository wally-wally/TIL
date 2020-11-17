function solution(nodeinfo) {
  // (1) 트리 구성하기 쉽도록 정렬
  const addNodeIndex = nodeinfo.map((v, i) => [...v, i + 1]); // 기본 노드 정보에 인덱스 값도 추가
  const sortedNodes = addNodeIndex.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]);

  // (2) Node의 정보를 담은 기본 Class 형태
  class Node {
    constructor() {
      this.x = null;
      this.y = null;
      this.idx = null;
      this.leftNode = null;
      this.rightNode = null;
    }
  }

  // (3) 루트 노드를 기준으로 트리 생성
  const node = new Node();
  node.x = sortedNodes[0][0];
  node.y = sortedNodes[0][1];
  node.idx = sortedNodes[0][2];

  // [util] 트리에 노드 추가하는 함수
  const addNode = (root, childNode) => {
    let tempNode = root;
    while (true) {
      if (tempNode.x > childNode[0]) { // 좌측 자식 노드 후보
        if (tempNode.leftNode) {
          tempNode = tempNode.leftNode;
        } else {
          let newNode = new Node();
          newNode.x = childNode[0];
          newNode.y = childNode[1];
          newNode.idx = childNode[2];
          tempNode.leftNode = newNode;
          return
        }
      } else if (tempNode.x < childNode[0]) { // 우측 자식 노드 후보
        if (tempNode.rightNode) {
          tempNode = tempNode.rightNode;
        } else {
          let newNode = new Node();
          newNode.x = childNode[0];
          newNode.y = childNode[1];
          newNode.idx = childNode[2];
          tempNode.rightNode = newNode;
          return
        }
      }
    }
  }

  // (4) 루트 노드 다음 노드부터 트리에 노드 추가
  for (let i = 1; i < nodeinfo.length; i++) {
    addNode(node, sortedNodes[i]);
  }

  // (5) 전위 순회(preOrder), 후위 순회(postOrder)
  const preOrder = (currentNode) => {
    preOrderResult.push(currentNode.idx);
    if (currentNode.leftNode) {
      preOrder(currentNode.leftNode);
    }
    if (currentNode.rightNode) {
      preOrder(currentNode.rightNode);
    }
  }

  const postOrder = (currentNode) => {
    if (currentNode.leftNode) {
      postOrder(currentNode.leftNode);
    }
    if (currentNode.rightNode) {
      postOrder(currentNode.rightNode);
    }
    postOrderResult.push(currentNode.idx);
  }

  let preOrderResult = [];
  let postOrderResult = [];

  preOrder(node);
  postOrder(node);

  return [preOrderResult, postOrderResult];
}

console.log(solution([[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]]));