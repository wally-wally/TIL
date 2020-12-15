import { DOM } from '../util/DOM.js';

export default {
  showLoadingOverlay($target) {
    const loadingWrapper = document.createElement('div');
    loadingWrapper.className = 'loading-wrapper';
  
    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'loading-message';
    loadingMessage.innerText = '데이터를 불러오는 중입니다.';
    
    loadingWrapper.appendChild(loadingMessage);
  
    $target.appendChild(loadingWrapper);
  },

  hideLoadingOverlay($target) {
    const loadingTag = $target.querySelector('.loading-wrapper');
    loadingTag.parentNode.removeChild(loadingTag);
  },
  
  showLoadingMessage($target) {
    DOM.setDisplay($target, 'block');
    $target.innerHTML = `<p class="loading-recommend-keywords">추천 검색어를 불러오는 중입니다.</p>`;
  }
}