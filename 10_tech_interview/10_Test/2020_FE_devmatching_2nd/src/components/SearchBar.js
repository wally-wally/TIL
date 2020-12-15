import { Debounce } from '../util/Debounce.js';
import { getItem, setItem } from '../util/sessionStorage.js';
import { DOM } from '../util/DOM.js';
import Error from './Error.js';

// SearchBar 컴포넌트에서 사용되는 상태값 모음
let App;
let InputKeyword;
let Keywords;
let OnSearch;
let IsError;
let Data;
let Key;
let ArrowKeyIndex;
let ErrorData;

// 방향키 key 이름
const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export default function SearchBar(app, inputKeyword, keywords, onSearch) {
  App = app;
  InputKeyword = inputKeyword;
  Keywords = keywords;
  OnSearch = onSearch;

  // 화면 클릭시 클릭한 부분의 태그 이름에 따라 실행되는 동작 분기
  App.addEventListener('click', e => {
    const clickedTagName = e.target.tagName;
    if (clickedTagName === 'LI') { // 추천 검색어 항목을 클릭한 경우
      DOM.movePage(`?q=${e.target.innerText}`);
      return
    }
    DOM.setDisplay(Keywords, 'none'); // 나머지 경우 추천 검색어 리스트 안 보이게 하기
  })
  
  // 검색창에 키보드의 입력이 들어갔을 때
  InputKeyword.addEventListener('keyup', Debounce(async e => {
    const { value } = e.target;
    const { key } = e;
    Key = key;
    ArrowKeyIndex = arrowKeys.indexOf(Key);

    // 왼쪽(2), 오른쪽(3) 화살표를 누른 경우 무시
    if (ArrowKeyIndex >= 2) {
      return
    }

    // Enter 키를 누른 경우 검색 결과 보여주기
    if (Key === 'Enter') {
      DOM.movePage(`?q=${value}`);
    }

    // Esc 키를 누른 경우 추천 검색어 창 안 보이게 닫기
    if (Key === 'Escape') {
      DOM.setDisplay(Keywords, 'none')
      return
    };

    // 위(0) 또는 아래(1) 화살표 누른 경우 추천 검색어 하이라이트 표시
    // 추천 검색어 리스트가 보여야 하고 추천 검색어 결과가 있으며 에러가 일어나지 않은 경우 동작
    if (ArrowKeyIndex === 0 || ArrowKeyIndex === 1) {
      Keywords.style.display === 'block' && Data.length && !IsError ? moveFocusKeywords() : null;
      return
    }

    // 키보드의 입력 이벤트가 들어올 때
    // 이전의 keyword 값(getItem('beforeKeyword'))과 현재 keyword 값(InputKeyword.value)을 비교해서
    // 다른 경우에만 추천 검색어 결과 값 가져오기
    if (getItem('beforeKeyword') === InputKeyword.value) {
      return
    }
    setItem('beforeKeyword', InputKeyword.value);

    // 추천 검색어 결과 값 가져오기
    const result = await OnSearch(value);
    IsError = result.isError;
    if (IsError) {
      ErrorData = result.data;
    } else {
      Data = result.data;
    }
    
    render();
  }, 100))
}

// 추천 검색어 리스트 보여주기
function showRecommendKeywords() {
  Keywords.innerHTML = '';

  // 에러 발생시
  if (IsError) {
    Error(Keywords, ErrorData);
    return
  }

  // 추천 검색어가 없을 때
  if (!Data.length) {
    Keywords.innerHTML = `<p class="error-alert no-result-alert">추천 검색어가 없습니다.</p>`;
    return
  }

  // 추천 검색어 보여주기
  const keywordList = document.createElement('ul');
  keywordList.innerHTML = Data.map(data => `<li>${data}</li>`).join('');

  Keywords.appendChild(keywordList);
}

// 화살표로 이동하면서 추천 검색어 하이라이트 표시
function moveFocusKeywords() {
  const activeKeyword = Keywords.querySelector('.active');
  
  // 아래 화살표 눌렀을 때(마지막 항목에 하이라이트 표시된 경우 무시)
  if (ArrowKeyIndex === 1) {
    if (activeKeyword === null) { // 추천 검색어에 하이라이트 표시가 아무 것도 없는 경우 첫 번째 키워드에 하이라이트 표시
      const firstKeyword = Keywords.querySelector('li');
      DOM.addClass(firstKeyword, 'active');
      InputKeyword.value = firstKeyword.innerText;
      return
    }
    if (activeKeyword.nextSibling) {
      DOM.addClass(activeKeyword.nextSibling, 'active');
      DOM.removeClass(activeKeyword, 'active');
      InputKeyword.value = activeKeyword.nextSibling.innerText;
      return
    }
  }

  // 위 화살표 눌렀을 때(첫 번째 항목에 하이라이트 표시된 경우 무시)
  if (ArrowKeyIndex === 0 && activeKeyword.previousSibling) {
    DOM.addClass(activeKeyword.previousSibling, 'active');
    DOM.removeClass(activeKeyword, 'active');
    InputKeyword.value = activeKeyword.previousSibling.innerText;
  }
}

function render() {
  DOM.setDisplay(Keywords, 'block');
  showRecommendKeywords();
}