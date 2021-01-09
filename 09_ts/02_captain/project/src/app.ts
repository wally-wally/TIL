// 라이브러리 로딩
// import 변수명 from '라이브러리 이름';
// 변수, 함수 임포트 문법
// import {} from '파일 상대 경로';
import axios, { AxiosResponse } from 'axios'; // 타입 정의를 하지 않아도 되는 라이브러리
import * as Chart from 'chart.js'; // 타입 정의를 별도로 해줘야하는 라이브러리(sol1. 타입 선언 라이브러리 설치, sol2. 외부 라이브러리 직접 모듈화 하기)
// 타입 모듈
import {
  CovidSummaryResponse,
  CountrySummeryResponse,
  Country,
  CountrySummeryInfo,
} from './covid/index';

// utils
function $<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}
function getUnixTimestamp(date: Date | string) {
  return new Date(date).getTime();
}

// DOM

// ex)
// 왼쪽에 있는 타입이 더 상위 타입
// let a: Element | HTMLElement | HTMLParagraphElement;

// before) as 키워드를 이용한 타입 단언 방식
// deathsTotal 변수 자체에 HTMLParagraphElement 타입을 선언하면 오류나는 이유는
// Element와 HTMLParagraphElement 타입 간에 서로 호환할 수 있는 형태가 아니라는 오류 문구가 났다.
// 그래서 이를 해결하기 위해 타입 단언을 이용해서 타입 호환할 수 있는 형태로 바꿨다.
// const deathsTotal: HTMLParagraphElement = $('.deaths'); (X)
// const confirmedTotal = $('.confirmed-total') as HTMLSpanElement; // confirmed-total 태그는 index.html에서 span 태그라는 것을 보았기 때문에 HTMLSpanElement로 정의했다.
// const deathsTotal = $('.deaths') as HTMLParagraphElement; // as 키워드로 타입 단언을 이용해서 해당 결과 값의 type을 HTMLParagraphElement로 정의해준다.
// const recoveredTotal = $('.recovered') as HTMLParagraphElement;
// const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement;
// const rankList = $('.rank-list') as HTMLOListElement;
// const deathsList = $('.deaths-list') as HTMLOListElement;
// const recoveredList = $('.recovered-list') as HTMLOListElement;

// after) Generic을 이용해서 DOM 유틸 함수의 활용성 높인 방식

const confirmedTotal = $<HTMLSpanElement>('.confirmed-total'); // confirmed-total 태그는 index.html에서 span 태그라는 것을 보았기 때문에 HTMLSpanElement로 정의했다.
const deathsTotal = $<HTMLParagraphElement>('.deaths'); // as 키워드로 타입 단언을 이용해서 해당 결과 값의 type을 HTMLParagraphElement로 정의해준다.
const recoveredTotal = $<HTMLParagraphElement>('.recovered');
const lastUpdatedTime = $<HTMLParagraphElement>('.last-updated-time');
const rankList = $<HTMLOListElement>('.rank-list');
const deathsList = $<HTMLOListElement>('.deaths-list');
const recoveredList = $<HTMLOListElement>('.recovered-list');

// 제네릭 타입을 넘기지 않으면 기본으로 HTMLElement로 잡힌다.
// 만약에 기본값을 지정하고 싶으면 제네릭을 <T extends HTMLElement = HTMLDivElement>와 같이 작성하면 된다.
const temp = $('.abc');

const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center'
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;

// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

enum CovidStatus {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths',
}

function fetchCountryInfo(
  countryName: string | undefined,
  status: CovidStatus
): Promise<AxiosResponse<CountrySummeryResponse>> {
  // status params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  if (!rankList) {
    return;
  }
  rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event: Event) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement
      ? event.target.parentElement.id
      : undefined;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Deaths
  );
  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Recovered
  );
  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Confirmed
  );
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data: CountrySummeryResponse) {
  const sorted = data.sort(
    (a: CountrySummeryInfo, b: CountrySummeryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: CountrySummeryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    // deathsList!.appendChild(li);
    deathsList.appendChild(li);
  });
}

function clearDeathList() {
  if (!deathsList) {
    return;
  }
  deathsList.innerHTML = '';
}

function setTotalDeathsByCountry(data: CountrySummeryResponse) {
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: CountrySummeryResponse) {
  const sorted = data.sort(
    (a: CountrySummeryInfo, b: CountrySummeryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: CountrySummeryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);

    // optional chaining operator
    recoveredList?.appendChild(li);

    // 위 코드를 풀어서 쓰면 이렇게 됨
    // if (recoveredList === null || recoveredList === undefined) {
    //   return;
    // } else {
    //   recoveredList.appendChild(li);
    // }
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: CountrySummeryResponse) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]) {
  const lineChart = $('#lineChart') as HTMLCanvasElement;
  const ctx = lineChart.getContext('2d');
  Chart.defaults.global.defaultFontColor = '#f5eaea';
  Chart.defaults.global.defaultFontFamily = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: CountrySummeryResponse) {
  const chartData = data
    .slice(-14)
    .map((value: CountrySummeryInfo) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: CountrySummeryInfo) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1)
    );
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: CovidSummaryResponse) {
  confirmedTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalConfirmed),
    0
  ).toString();
}

function setTotalDeathsByWorld(data: CovidSummaryResponse) {
  deathsTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalDeaths),
    0
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSummaryResponse) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalRecovered),
    0
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSummaryResponse) {
  const sorted = data.Countries.sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach((value: Country) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSummaryResponse) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
