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

### HTTP 요청

-   모든 자원은 명사로 식별한다.

-   HTTP 경로로 자원을 요청한다

-   예)

    -   GET /users

    -   GET /users/{id}

### HTTP 메서드

-   서버 자원에 대한 행동을 나타낸다. (동사로 표현)

    -   GET: 자원을 조회
  
    -   POST: 자원을 생성
  
    -   PUT: 자원을 갱신
  
    -   DELETE: 자원을 삭제

-    이는 익스프레스 어플리케이션의 메서드로 구현되어 있다.

### HTTP 상태코드

-   2XX: 자, 여기있어
  
    -   200: 성공(success), GET, PUT
  
    -   201: 작성됨(created), POST
  
    -   204: 내용 없음 (No Conent), DELETE
  
-   4XX: 니가 문제임
  
    -   400: 잘못된 요청 (Bad Request)
    -   401: 권한 없음 (Unauthorized)
    -   404: 찾을 수 없음 (Not found)
    -   409: 충돌 (Conflict)
  

-   5XX: 내가 문제임
  
    -   500: 서버 에러 (Interel server error)

### 테스트 주도 개발

-   TDD로 개발하자!

-   mocha, should, superTest

### Mocha

-   모카(mocha)는 테스트 코드를 돌려주는 테스트 러너.

-    테스트 수트 : 테스트 환경으로 모카에서는 describe()로 구현한다.

-   테스트 케이스 : 실제 테스트를 말하며 모카에서는 it()로 구현한다.

### Should

-  📌 "노드 assert 말고 서트파티 라이브러리를 사용하라"

  - 슈드(should)는 검증(assertion) 라이브러리다.

-   가독성 높은 테스트 코드를 만들 수 있다. 😎

### SuperTest

-   단위 테스트 : 함수의 기능 테스트

-   통합 테스트 : API의 기능 테스트

-   슈퍼테스트는 익스프레스 통합 테스트용 라이브러리이다.

-   내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다❗

참고자료

https://github.com/visionmedia/supertest

### 첫 API 테스트 만들기

-    성공
     -    유저 객체를 담은 배열로 응답한다
     
     -    최대 limit 개수만큼 응답한다

-   실패

    -   limit이 숫자형이 아니면 400을 응답한다.

    -   offset이 숫자형이 아니면 400을 응답한다.


###  실습 GET /user/:id

-   success

    -   id가 1인 유저 객체를 반환한다

- error

    - id가 숫자가 아닐 경우 400으로 응답한다.

    -   id로 유저를 찾을 수 없는 경우 404로 응답한다.

### 실습 DELETE /user/:id

-    success
    
     -    204를 응답한다

-   error

    -   id가 숫자가 아닐 경우 400으로 응답한다


### 실습 POST /users

-   success

    -   201 상태 코드를 반환한다

    - 생성된 유저 객체를 반환한다
    
    -  입력한 name을 반환한다

-   erro
    
    - name 파라미터 누락 시 400을 반환한다

    -   name이 중복일 경우 400을 반환한다

