### NodeJs의 기초

-   브라우저 밖에서 자바스크립트 코드를 실행할 수 있다.

-    크롬에서 사용하는 V8 엔진을 사용한다

-   이벤트 기반의 비동기 I/O 프레임워크

-    Common JS를 구현한 모듈 시스템

관련 자료 

https://jh-7.tistory.com/9(Common JS VS ES6)

### 모듈 시스템

-    브라우저에서는 윈도우 컨텍스트를 사용하거나, RequireJS 같은 의존성 로더를 사용함

- 노드는 파일 형태로 모듈을 관리할 수 있는 CommonJS로 구현

    - 기본 모듈
  
    - 써드파티 모듈
  
    - 사용자 정의 모듈


### 비동기 세계

-   노드는 기본적으로 비동기로 동작함

-    readFile() vs readFileSync() // 비동기 vs 동기


### express 기초

-    어플리케이션

-    미들웨어

-   라우팅

-   요청객체

-   응답객체


### 어플리케이션

```js

const express = reqire('express');
const app = express();

app.listen(3000, () => console.log(Server is Running))

```

-   익스프레스 인스턴스를 어플리케이션이라 한다

-   서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다

-   라우팅 설정을 할 수 있다

-   서버를 요청 대기 상태로 만들 수 있다

### 미들 웨어

-    미들웨어는 함수들의 연속이다

-   로깅 미들웨어를 만들어 보자

-   써드파티 미들웨어를 사용해 보자

    `기본적으로 주어지는 Built-in middleware 외에 추가로 설치하여 사용해야하는 미들웨어를 Third-party middleware라고 합니다.`

-   일반 미들웨어 vs 에러 미들웨어

-   404, 500 에러 미들웨어를 만들어 보자

참고자료

https://baked-corn.tistory.com/48

### 라우팅

-   요청 url에 대해 적절한 핸들러 함수로 연결해 주는 기능을 라우팅이라고 부른다.

-   어플리케이션의 get(), post() 메서드로 구현할 수 있다.

-   라우팅을 위한 전용 Router 클래스를 사용할 수 있다.

### 요청 객체

-   클라이언트 요청 정보를 담은 객체를 요청(Request) 객체라고 한다.

- http 모듈의 request 객체를 래핑한 것이다.

-   req.params(), req.body(), req.query() 메서드를 주로 사용한다.

참고자료

https://gongbu-ing.tistory.com/26


### 응답 객체

-   클라이언트 응답 정보를 담은 객체를 응답(Response) 객체라고 한다.

- http 모듈의 response 객체를 래핑한 것이다.

-   res.send(), res.json(), res.status() 메서드를 주로 사용한다.
