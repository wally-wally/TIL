export default function Error($target, errorData) {
  const errorAlertWrapper = document.createElement('div');
  errorAlertWrapper.className = 'error-alert';

  const errorMessage = document.createElement('span');
  errorMessage.className = 'error-message';

  // error message 표시
  if (String(errorData) !== 'TypeError: Failed to fetch') {
    const statusCode = document.createElement('span');
    statusCode.className = 'status-code';
    statusCode.innerText = `[${errorData.status}]`;
    errorAlertWrapper.appendChild(statusCode);
    errorMessage.innerText = errorData.message;
  } else {
    errorMessage.innerText = '네트워크 상에 문제가 발생했습니다.\n인터넷 연결 확인 후 새로고침(F5)하여 다시 페이지를 로드해주세요.';
  }
  
  errorAlertWrapper.appendChild(errorMessage);

  // 새로고침 버튼 생성
  const refreshButtonConditions = String(errorData) === 'TypeError: Failed to fetch'
    || (errorData.hasOwnProperty('status') && errorData.status === 500);
  if (refreshButtonConditions) {
    errorAlertWrapper.appendChild(makeRefreshButton());
  }

  $target.appendChild(errorAlertWrapper);
}

function makeRefreshButton () {
  const refreshButton = document.createElement('button');
  refreshButton.className = 'refresh-button';
  refreshButton.innerText = '새로고침';
  refreshButton.addEventListener('click', () => {
    history.go(0);
  })
  return refreshButton;
}