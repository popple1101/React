# 리액트 시작

## 리액트 이해

- React는 Facebook에서 개발한 JavaScript 라이브러리로, 사용자 인터페이스(UI)를 만들기 위한 도구입니다. 주로 **단일 페이지 애플리케이션(SPA)** 에서 사용되며, 웹 개발의 효율성과 유지보수성을 높이는 데 중점을 둡니다. 
- 자바스크립트 라이브러리
- 데이터의 변화에 따른 화면 출력(View)을 다루는 것이 목표
- 컴포넌트 : 화면의 특정 부분을 정의(선언)하는 단위. 재사용을 위함.
- render() 함수
  - 초기 렌더링 : 처음 화면의 컴포넌트 정의
  - 리렌더링 : 컴포넌트에서 데이터에 변화가 있을 때 새로운 요소로 교체. 단순한 데이터 수정이 아니라 새로운 데이터로 render 함수 재 호출함.
- 가상 DOM 방식으로 DOM 처리를 효율적으로 진행함.
  1. 데이터가 변경되면 전체 UI 를 가상 DOM 에 리렌더링 한다.
  2. DOM 과 가상 DOM 을 비교한다.
  3. 이전과 달라진 요소만 실제 DOM 에 적용한다.

## 개발 환경

### 1. Node.js 설치

- Node.js

  - Chrome V8 자바스크립트 엔진을 사용하는 자바스크립트 런타임 환경
  - (브라우저를 실행하지 않고 자바스크립트를 실행할 수 있음.)
  - 서버 측 애플리케이션을 개발을 위하여 오픈 소스로 설계됨
  - 리액트는 Node.js 기반에서 개발해야 함.
  - npm (패키지 관리 도구) 를 이용하여 필요한 패키지(라이브러리)와 설치와 버전 관리를 한다.

- 패키지 : 특정 기능을 수행하는 코드 집합.

  - 재사용성: 한 번 작성된 코드를 여러 프로젝트에서 재사용할 수 있다.
  - 모듈화: 코드를 기능별로 분리하여 관리하기 쉽다.
  - 의존성 관리: 패키지 관리 도구를 통해 필요한 라이브러리와 의존성을 자동으로 설치하고 업데이트할 수 있다.

- 설치 : https://nodejs.org/ko/download 에서 Window Installer 다운로드 후 설치 . 버전 22.17.0

  - 설치 후 cmd 명령창에서 확인

    `node -v`

### 2.패키지 관리 도구

- 📦 npm: Node Package Manager
  - 역할: 패키지 설치, 삭제, 업데이트
  - 의존성 관리 : package.json 기반의 프로젝트 구성 관리
  - 설치 확인

    `npm -v`

  - 로컬 설치

    `npm install '패키지 이름'`

    - 프로젝트 node_modules 폴더에 설처
  - 전역 설치 :
  
    `npm install -g 패키지 이름`
       - 전역 패키지 설치 폴더와 버전 확인 :
         `npm root -g`
  - 제거 :

    `npm uninstall 패키지이름`
    
  - package.json 기반 설치 :

    `npm install`

- 🎯 npx: npm package executor
    - 설치 없이도 패키지를 한 번만 실행하고 싶을 때 사용
    - 전역 설치 없이 최신 버전 실행 가능
    - CLI 도구를 자동 실행
    - 리액트 프로젝트 만들 때 :

      `npx create-react-app 프로젝트이름`

      - create-react-app 설치와 리액트 프로젝트 초기화 실행

### 3. Lint (린트)

- 프로그래밍 소스 코드를 분석하여 잠재적인 오류, 버그, 스타일 오류 및 의심스러운 구조를 찾아내는 정적 코드 분석 도구를 의미합니다. 주로 코딩 규칙 준수, 가독성 향상, 잠재적 문제점 방지 등을 위해 사용됩니다.

- 프론트엔드 개발: ESLint. JavaScript 코드의 오류 및 스타일 문제를 검사하고, prettier와 함께 사용되어 코드 포맷을 자동으로 맞춰줍니다. 문법과 코드 스타일 검사. 👉 VS Code 확장 프로그램 설치

### 4. 리액트 프로젝트 만들기

### 🔧 create-react-app (CRA)
React 프로젝트를 빠르게 생성해주는 CLI 툴

        C:\class250616\React>npx create-react-app lesson01
        C:\class250616\React>cd lesson01
        - 설치된 패키지 확인하기
        C:\class250616\React\lesson01>npm list
        - 개발 모드로 실행 -
        C:\class250616\React\lesson01>npm start
        - 빌드(배포)-
        C:\class250616\React\lesson01>npm run build
    
### 🔧 vite 
프레임워크에 상관없이 빠르고 효율적인 개발·빌드 환경을 제공하는 모던 빌드 도구

        C:\class250616\React>npx create-vite@latest lesson02 --template react
        C:\class250616\React>cd lesson02
        - 패키지 설치
        C:\class250616\React\lesson01>npm install
        - 개발 모드로 실행 -
        C:\class250616\React\lesson01>npm run dev
        - 빌드(배포)-
        C:\class250616\React\lesson01>npm run build

### 5. 번들 bundle

- 리액트 웹 애플리케이션 실행에 필요한 자바스크립트 , 이미지 파일, CSS, HTML 파일은 모듈이라고 합니다. 실제 브라우저에서 실행하기 위해 파일들을 묶어주는 작업이 필요하며 웹팩은 이 모듈을 결합하여 더욱 단순한 형태의 모듈로 변환해 주는 역할

- 번들러/번들링(Bundling)
  - 여러 개의 파일을 하나 또는 소수의 파일로 합치는 작업. 여러 JS/CSS 파일 → bundle.js 하나로 통합
    - 파일 병합: 여러 개의 파일을 하나의 파일로 병합하여 HTTP 요청 수를 줄인다.
    - 의존성 관리: 모듈 간의 의존성을 분석하고, 필요한 파일들을 올바른 순서로 병합한다.
    - 코드 최적화: 코드 압축, 난독화 등을 통해 파일 크기를 줄이고 성능을 최적화한다.
    - 번들링의 시작점은 src/index.js

	
- 프로덕션 빌드(Build)	
  - 개발용 소스코드를 배포 가능한 형태로 최적화 및 가공하는 전체 과정 👀	트랜스파일, 번들링, 압축, 정적 파일 복사 등 포함
  - CRA: Webpack으로 번들링 → 느릴 수 있음
    + react-scripts 프로그램이 웹팩 실행
  - Vite: Rollup 기반으로 최적화된 번들링 → 보통 더 작고 빠름
    + vite.config.js 설정 파일 사용 

### 6. JSX

- 자바스크립트에서 확장된 언어로 함수형식으로 컴포넌트를 정의합니다.
- JSX 형식의 코드는 브라우저에서 실행되기 전에 번들되는 과정에서 babel 이라는 컴파일러 언어를 통해 변환됩니다.

- JSX 문법

  - 함수 컴포넌트
    - 하나의 부모 요소를 리턴합니다.
    - undefined 를 리턴하지 않습니다.
  - CSS
    - css 인라인 스타일 style 속성값은 객체로 정의합니다.( - 기호는 제거하고 다음 글자를 대문자로 변환)
    - css 클래스 속성은 경고 발생하는 class 대신 className 속성을 사용합니다.
  - HTML 요소 (태그)
    - hr,br,img, input 등 닫는 태그를 표시하기
    - return 안의 태그 요소안에서 주석 기호는 {/\* \*/}    (순수 JS는 주석기호 // )

### 7. 프로젝트 폴더 구조

 <pre>
    lesson01/
    ├── node_modules/                          : 패키지 설치 폴더
    ├── public/                                : 기본 리소스 폴더. index.html 과 연관된 이미지 등.
    │   ├── favicon.ico
    │   ├── index.html                         : 웹 애플리케이션의 시작 페이지
    │   ├── .....
    └── src/                                   : 웹 애플리케이션 개발 소스파일 폴더
    │   ├── App.js          개발 소스 파일
    │   ├── index.js        개발 소스 파일
    │   ├── App.test.js , reportWebVitals.js, setupTest.js   : 성능 및 테스트 실행 파일
    └── package.json        패키지 버전 및 의존성 관리 파일
    └── package-lock.json   패키지 의존성 고정 파일
    └── .gitignore          git 사용시 추적에서 제외되는 파일
 </pre>

### 8. vs code 확장 프로그램

-  ES7+ React/Redux/React-Native snippets
-  Reactjs code snippets
-  CSS Modules
