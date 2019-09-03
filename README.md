<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TIL_INDEX</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Do+Hyeon|Jua|Sunflower:300&display=swap" rel="stylesheet">
    <style>
    h1 {
      color: crimson;
      font-family: 'Jua', sans-serif;
    }

    .container>.accordion {
      font-family: 'Sunflower', sans-serif;
    }

    a:hover {
      color: brown;
    }
  </style>
  </head>
    
  <body>
    <h1 class="text-center">TIL: Today I Learned</h1><hr>
   	<div class="container">
     <ul>
      <li><a href="https://github.com/wally-wally/TIL" target="_blank">'wally-wally' Github</a>의 TIL 목차를 정리한 것입니다.</li>
    </ul>
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
              aria-expanded="true" aria-controls="collapseOne">
              00_startcamp
            </button>
          </h2>
        </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            📍 2019.07.08(Mon.) ~ 2019.07.12(Fri.) 동안 진행한 <u>Startcamp</u> 과정 에서 학습한 내용을 정리함.
            &nbsp; <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp" target="_blank">(Go to
              code)</a><br><br>
            <p>
              <a class="btn btn-success" data-toggle="collapse" href="#multiCollapseExample1" role="button"
                aria-expanded="false" aria-controls="multiCollapseExample1">Day_01(July 8th)</a>
              <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#multiCollapseExample2"
                aria-expanded="false" aria-controls="multiCollapseExample2">Day_02(July 9th)</button>
              <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#multiCollapseExample3"
                aria-expanded="false" aria-controls="multiCollapseExample3">Day_03(July 10th)</button>
              <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#multiCollapseExample4"
                aria-expanded="false" aria-controls="multiCollapseExample4">Day_04(July 11th)</button>
              <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#multiCollapseExample5"
                aria-expanded="false" aria-controls="multiCollapseExample5">Day_05(July 12th)</button>
            </p>
            <div class="row">
              <div class="collapse multi-collapse" id="multiCollapseExample1">
                <div class="card card-body">
                  <ul>
                    <li>Python Basic Convention</li>
                    <li>Rules of if statement, for statement</li>
                    <li>Preview of List, Dictionary</li>
                    <li>CLI</li>
                    <li>Use of webbrowser module</li>
                    <li>Web crawling with BeautifulSoup module</li>
                  </ul>
                  <hr>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/README_divide/00_startcamp_day01.md"
                      target="_blank"><button type="button" class="btn btn-info">Go to README</button></a> &nbsp;
                    <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp/01_day" target="_blank"><button
                        type="button" class="btn btn-secondary">Go to CODE</button></a>
                  </div>
                </div>
              </div>
              <div class="collapse multi-collapse" id="multiCollapseExample2">
                <div class="card card-body">
                  <ul>
                    <li>NAVER realtime search keyword crawling</li>
                    <li>git</li>
                    <li>Insert string, os module</li>
                  </ul>
                  <hr>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/README_divide/00_startcamp_day02.md"
                      target="_blank"><button type="button" class="btn btn-info">Go to README</button></a> &nbsp;
                    <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp/02_day" target="_blank"><button
                        type="button" class="btn btn-secondary">Go to CODE</button></a>
                  </div>
                </div>
              </div>
              <div class="collapse multi-collapse" id="multiCollapseExample3">
                <div class="card card-body">
                  <ul>
                    <li>Escape Sequence</li>
                    <li>File write, read</li>
                    <li>HTML & CSS</li>
                    <li>Basic of Flask</li>
                  </ul>
                  <hr>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/README_divide/00_startcamp_day03.md"
                      target="_blank"><button type="button" class="btn btn-info">Go to README</button></a> &nbsp;
                    <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp/03_day" target="_blank"><button
                        type="button" class="btn btn-secondary">Go to CODE</button></a>
                  </div>
                </div>
              </div>
              <div class="collapse multi-collapse" id="multiCollapseExample4">
                <div class="card card-body">
                  <ul>
                    <li>Flask</li>
                    <ul>
                      <li>variable routing</li>
                      <li>render template</li>
                      <li>jinja2</li>
                      <li>Request & Response</li>
                    </ul>
                    <li>Dictionary</li>
                  </ul>
                  <hr>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/README_divide/00_startcamp_day04.md"
                      target="_blank"><button type="button" class="btn btn-info">Go to README</button></a> &nbsp;
                    <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp/04_day" target="_blank"><button
                        type="button" class="btn btn-secondary">Go to CODE</button></a>
                  </div>
                </div>
              </div>
              <div class="collapse multi-collapse" id="multiCollapseExample5">
                <div class="card card-body">
                  <ul>
                    <li>Operator</li>
                    <li>Making Telegram Chatbot</li>
                    <li>Slicing</li>
                  </ul>
                  <hr>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/README_divide/00_startcamp_day05.md"
                      target="_blank"><button type="button" class="btn btn-info">Go to README</button></a> &nbsp;
                    <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp/05_day" target="_blank"><button
                        type="button" class="btn btn-secondary">Go to CODE</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo"
              aria-expanded="false" aria-controls="collapseTwo">
              01_python
            </button>
          </h2>
        </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
          <div class="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3
            wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
            excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
            you probably haven't heard of them accusamus labore sustainable VHS.
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"
              aria-expanded="false" aria-controls="collapseThree">
              02_algorithm
            </button>
          </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3
            wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
            excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
            you probably haven't heard of them accusamus labore sustainable VHS.
          </div>
        </div>
      </div>
    </div>
   	</div>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
  </script>
  </body>  
</html>
</!doctype>

