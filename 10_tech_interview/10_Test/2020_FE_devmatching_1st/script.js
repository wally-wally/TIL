// 2. THE CAT API 이용해서 데이터 가져오기
const API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw {
      message: error.message,
      status: error.status
    }
  }
}

const api = {
  fetchCats: async limitNumber => {
    try {
      toggleSpinner();
      const catData = await request(`${API_ENDPOINT}/images/search?limit=${limitNumber}&page=10&order=Desc`);
      showCatData(catsList, catData);
    } catch (error) {
      console.log(error)      
    }
  },
  fetchRandomCats: async () => {
    try {
      toggleSpinner();
      const catData = await request(`${API_ENDPOINT}/images/search?limit=60`);
      showCatData(randomCatsList, catData);
    } catch (error) {
      console.log(error)
    }
  }
}


// 3. 가져온 데이터를 DOM에 그리기
const catsList = document.querySelector('.cats-list');
const randomCatsList = document.querySelector('.random-cats-list');

const showCatData = (catsList, cats) => {
  cats.map(cat => {
    const catItem = document.createElement('li');
    const catImage = document.createElement('img');
    const catId = document.createElement('p');

    catImage.setAttribute('src', cat.url);
    catImage.classList.add('lazy');
    catImage.dataset.src = cat.url;
    catImage.dataset.id = cat.id;
    catId.innerText = cat.id;

    catItem.className = 'cat-item';
    catItem.appendChild(catImage);
    catItem.appendChild(catId);
    
    // Event Delegation 적용 전: 고양이 카드 하나하나에 모두 이벤트 리스너 부여
    // catItem.addEventListener('click', () => {
    //   toggleModal();
    //   showModal(cat.url, cat.id);
    // })

    catsList.appendChild(catItem);
  })
  lazyLoad();
  toggleSpinner();

  // 3-1. 고양이 내용들을 담은 container tag에 이벤트 위임(Event Delegation)하기
  // container tag는 각 고양이 카드의 부모이기 대문에 카드를 클릭하면 이벤트 버블링이 일어나면서
  // modal을 띄우는 클릭 이벤트를 발동시킨다.
  catsList.addEventListener('click', e => {
    const path = e.path;
    const catCard = path.find(elem => elem.className === 'cat-item');
    
    if (catCard) {
      const clickedCatImageInfo = catCard.querySelector('img');
      toggleModal();
      showModal(
        clickedCatImageInfo.getAttribute('data-src'),
        clickedCatImageInfo.getAttribute('data-id')
      );
    }
  })
}


// 4. modal 만들기
const modalWrapper = document.querySelector('.modal-wrapper');
modalWrapper.classList.add('hidden');
const showModal = (url, id) => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const modalContents = document.createElement('section');
  modalContents.className = 'modal-contents';

  const modalHeader = document.createElement('header');

  const modalTitle = document.createElement('div');
  modalTitle.className = 'modal-title';
  modalTitle.innerText = 'Cat Modal';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerText = 'CLOSE';

  const catImage = document.createElement('img');
  catImage.setAttribute('src', url);

  const catId = document.createElement('p');
  catId.innerText = id;

  closeBtn.addEventListener('click', () => onCloseModal() );
  overlay.addEventListener('click', () => onCloseModal() );

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeBtn);

  modalContents.appendChild(modalHeader);
  modalContents.appendChild(catImage);
  modalContents.appendChild(catId);

  modalWrapper.appendChild(overlay);
  modalWrapper.appendChild(modalContents);
}

// 4-1. modal 보였다 안 보였다 하기
const toggleModal = () => {
  modalWrapper.classList.toggle('hidden');
}

// 4-2. modal의 'CLOSE' 버튼 눌렀을 때 modal 닫기
const onCloseModal = () => {
  modalWrapper.innerHTML = '';
  toggleModal();
}


// 1. 입력 값이나 버튼이 눌렸을 때 데이터 가져오는 로직 수행하도록 구성
const limitNumberForm = document.querySelector('#limit-form');
const inputlimitNumber = document.querySelector('#limit-number');
const getRandomCatsButton = document.querySelector('.get-random-cats');

limitNumberForm.addEventListener('submit', e => {
  e.preventDefault();
  let numberReg = /[1-9]/;
  if (!inputlimitNumber.value) {
    alert('1부터 10 사이의 숫자를 입력하세요.');
    return
  }
  if (numberReg.test(inputlimitNumber.value)) {
    if (inputlimitNumber.value < 1 || inputlimitNumber.value > 10) {
      alert('1부터 10 사이의 숫자를 입력하세요.');
      return
    }
    catsList.innerHTML = '';
    api.fetchCats(inputlimitNumber.value);
  } else {
    alert('숫자 형태의 데이터만 입력하세요.');
  }
})

getRandomCatsButton.addEventListener('click', () => {
  randomCatsList.innerHTML = '';
  api.fetchRandomCats();
  infiniteScroll();
})


// 5. 무한 스크롤 기능 구현 => 랜덤 고양이 데이터 가져온 후 스크롤 맨 아래로 내리면 60개 더 가져오기
// 전체 문서의 높이에서 현재 보이는 영역의 높이를 뺀 값은 스크롤 할 수 있는 높이 값과 같다.
// 그러므로 스크롤 한 높이가 이와 같다면 스크롤을 끝까지 한 것이기 대문에 마지막 아이템이 보이는 시점이 된다.
const infiniteScroll = () => {
  window.addEventListener('scroll', () => {
    if (scrollHeight() < documentHeight() - window.innerHeight) return
    api.fetchRandomCats();
  })
}

// 현재 스크롤한 높이 구하는 함수
const scrollHeight = () => {
  return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
}

// 문서의 높이를 구하는 함수
const documentHeight = () => {
  return Math.max(
    document.body.scrollHeight, document.body.offsetHeight,
    document.documentElement.clientHeight, document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )
}

// 6. Lazy Loading 구현 - IntersectionOberserver 이용
const lazyLoad = () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}


// 7. Loading Spinner 만들기
const spinnerWrapper = document.querySelector('.spinner-wrapper');
spinnerWrapper.classList.add('hidden');

const overlay = document.createElement('div');
overlay.className = 'overlay';

const spinnerContents = document.createElement('div');
spinnerContents.className = 'spinner-contents';

const spinnerImage = document.createElement('img');
spinnerImage.className = 'spinner-image';
spinnerImage.setAttribute('src', './images/cat.png');

const spinnerText = document.createElement('p');
spinnerText.innerText = 'Loading...';

spinnerContents.appendChild(spinnerImage);
spinnerContents.appendChild(spinnerText);

spinnerWrapper.appendChild(overlay);
spinnerWrapper.appendChild(spinnerContents);


// 7-1. Loading Spinner 보였다 안 보였다 하기
const toggleSpinner = () => {
  spinnerWrapper.classList.toggle('hidden');
}