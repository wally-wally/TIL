import { getQueryParams } from '../util/getQueryParams.js';
import { setItem } from '../util/sessionStorage.js';
import { DOM } from '../util/DOM.js';
import Error from './Error.js';

// Result 컴포넌트에서 사용되는 상태값 모음
let SearchResults;
let InputKeyword;
let OnSearch;
let IsError;
let Data;
let ErrorData;

export default async function Result(searchResults, inputKeyword, onSearch) {
  SearchResults = searchResults;
  InputKeyword = inputKeyword;
  OnSearch = onSearch;

  // url 주소에 query parameter가 있는 경우 해당 검색어의 결과 바로 표시
  if (!window.location.search.includes('?q=')) {
    setItem('beforeKeyword', '');
    return
  }
  const result = await getQuery();
  saveResult(result);
  
  render();
}

// query parameter 가져오기
async function getQuery() {
  const query = getQueryParams();
  InputKeyword.value = query;
  setItem('beforeKeyword', InputKeyword.value);
  return await OnSearch(query);
}

// Result 컴포넌트에 API 요청해서 받아온 결과 값 저장하기
function saveResult(result) {
  IsError = result.isError;
  if (!IsError) {
    Data = result.data.data;
  } else {
    ErrorData = result.data;
  }
}

function render() {
  // 결과 영역 초기화
  SearchResults.innerHTML = '';

  // 에러 발생시
  if (IsError) {
    DOM.setDisplay(SearchResults, 'block');
    Error(SearchResults, ErrorData);
    return
  }

  // 검색 결과가 없을 때
  if (!Data.length) {
    DOM.setDisplay(SearchResults, 'block');
    SearchResults.innerHTML = `<p class="error-alert no-result-alert">검색 결과가 없습니다.</p>`;
    return
  }

  // 검색 결과 보여주기
  DOM.setDisplay(SearchResults, 'grid');
  SearchResults.innerHTML = Data
    .map(cat => `<article><img src="${cat.url}" /></article>`)
    .join('');
}