import SearchBar from './components/SearchBar.js';
import Result from './components/Result.js';
import loading from './components/Loading.js';
import { api } from './api/catAPI.js';

export default function App($target) {
  const $keyword = $target.querySelector('.keyword');
  const $keywords = $target.querySelector('.keywords');
  const $searchResults = $target.querySelector('.search-results');

  const onSearchKeyword = async (keyword) => {
    loading.showLoadingMessage($keywords);
    return await api.fetchRecommendKeywords(keyword);
  }

  const onSearchCatImage = async keyword => {
    loading.showLoadingOverlay($target);
    const fetchData = await api.fetchCatInfo(keyword);
    loading.hideLoadingOverlay($target);
    return fetchData;
  }

  SearchBar($target, $keyword, $keywords, onSearchKeyword);
  Result($searchResults, $keyword, onSearchCatImage);
}