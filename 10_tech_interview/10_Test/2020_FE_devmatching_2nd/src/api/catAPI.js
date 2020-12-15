// 공통 API ENDPOINT 부분
const API_ENDPOINT = 'https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats';

// API 요청
const request = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw {
        message: errorData.message,
        status: response.status
      };
    }
  } catch (error) {
    throw error;
  }
};

// 요청 URL 주소를 기준으로 API 분리
export const api = {
  // (1) 추천 검색어 API
  fetchRecommendKeywords: async keyword => {
    try {
      const keywords = await request(`${API_ENDPOINT}/keywords?q=${keyword}`);
      return {
        isError: false,
        data: keywords
      };
    } catch (error) {
      return {
        isError: true,
        data: error
      }
    }
  },
  // (2) 검색 API
  fetchCatInfo: async keyword => {
    try {
      const catInfos = await request(`${API_ENDPOINT}/search?q=${keyword}`);
      return {
        isError: false,
        data: catInfos
      };
    } catch (error) {
      return {
        isError: true,
        data: error
      }
    }
  }
}