### challenchallen 소개
---

<br>

<img src="https://user-images.githubusercontent.com/62149784/130071709-95d26442-f534-48dd-969d-3696dba42e33.png">

<br>

제5회 정부혁신제안 끝장개발대회(https://goinnohac.com/) 에서 "함께 살아요, 우리"라는 주제로, '매년 온실가스 배출량 2% 감축'을 목표로 공공데이터 활용을 통해 해결방안을 개발하는 대회에 참가하였습니다.

<br>

`챌린챌린`(https://www.challenchallen.com) 은 저탄소 생활을 챌린지 서비스를 제공하는 웹 애플리케이션입니다. 챌린지는 전기, 교통, 냉난방, 자원 4가지 부문에서 저탄소 생활을 실천하고 이를  사진 또는 영상 인증을 통해 참여할 수 있습니다.
단순 챌린지 기능뿐만 아니라, 챌린지 모범 참여자(좋아요 수, 참여 빈도로 집계)에게 순위를 매김으로써 사용자의 적극적인 참여를 유도하는 서비스입니다.

<br>

### Backend
---

<br>

<img src="https://user-images.githubusercontent.com/62149784/130071720-bb5a69e2-cc3c-4195-8118-67054556abda.png">

<br>

✔ 크게 서버구현을 위해서는 `ExpressJs`를 사용하였고 DB는 `MongoDB`를 사용하였습니다

<br>

🤷‍♀️ ExpressJs 선택한 이유

<br>

- 빠른 개발

  -   적절한 Boilerplate가 존재하였고 이것이 express가 갖고 있는 `단순함`의 단점을 상쇄할 수 있을거라고 판단해 `ExpressJs`를 선택하였습니다.

  - 제한된 시간안의 서비스를 개발해야 하고 큰 규모의 서비스가 아니기에   `ExpressJs`를 선택하였습니다.


<br>

🤷 MongoDB 선택한 이유

- `챌린챌린`은 환경 관련 sns 서비스이기 때문에 READ API의 `response time이 낮을 수록 좋을 것`이며 API server의 CRUD중 `R의 빈도가  매우 높을 것`이라고 판단하였습니다

- 관계형데이터베이스와 비교했을 때 `READ performance`는 `Nesting > SQL > Aggregate` 순으로 나타난다. 

-   그러므로 MongoDB의 `nesting`을 적절하게 활용하여 `response time`을 최소화해 유저 경험을 높일 수 있다고 판단해 `MongoDB`를 선택하였습니다.

<br>

### 1.1 DATABASE ERD
---

<br>

<img src="https://user-images.githubusercontent.com/62149784/130088895-c269990f-de6d-4a3a-9dcb-cfddc7c3519d.png">

<br>

### 1.2 문서 내장으로 읽기 퍼포먼스 극대화
---

<br>

<img src="https://user-images.githubusercontent.com/62149784/130089939-ddc964d2-d16e-425d-93a5-b273158c81b8.jpg">

<br>

📌 기준으로 삼은 것

- 관계

  - 개별적으로 읽을 때도 있다?

  - 내장하려는 문서가 자주 바뀐다?

- 내장

  - 같이 불러올 때가 많다?

  - 읽기 비중이 CUD보다 더 높다?

<br>

`참고자료` (https://www.inflearn.com/course/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EB%AC%B4/dashboard 
)


✔ 위의 질문을 바탕으로 스키마를 발전 시켜나갔습니다.

✔ read 할 때 들어가는 가공을 create, update, delete 할 때 가공함으로써 읽기 성능 개선을 하였습니다.

✔ 읽기 빈도가 쓰기 빈도보다 훨씬 높기 때문에 계산을 한번 하고 여러번 읽는 작업에서 혜택을 보자는 방향으로 설계하였습니다.

<br>

📝 적용 사례

<br>

✔  `게시글`을 불러올 때 유저정보가 필요했으므로 Post model에서 writer를 `내장`하였습니다.

✔ `댓글` 불러올 때 유저정보가 필요했으므로 Post model에서 writer를 `내장`하였습니다.

✔ 이외의 `내장`을 설계한 것들은 추후 서비스가 커질 경우를 고려해 부분(id만) `내장`하였습니다(100 < N < 1000 -> 부분(id만) 내장)

<br>

### 1.3 pagenation
---

<br>

📌 `pagenation`을 구현해 클라이언트에서 필요한 데이터만 불러오게 하여 서비스 최적화를 고려했습니다.

<br>



<img src="https://user-images.githubusercontent.com/62149784/130093400-ea7a4d42-9b7c-4499-a604-c8ac556e5091.jpg">

<br>

### 1.4 Promise.all - Response Time 개선

---

<br>

<img src="https://user-images.githubusercontent.com/62149784/115832217-9ab62f00-a44d-11eb-8f5c-8c69479bca4c.png">

<br>



`참고자료`(https://code-masterjung.tistory.com/91)


<br>

📝 적용 사례

<br>

<img src="https://user-images.githubusercontent.com/62149784/130095867-ef290bee-3ef4-4c7d-b539-026da73fc531.jpg">

<br>

✔ 순서가 보장되지 않아도 되는 상황에서 `Promise.all`을 사용해 여러개의 비동기 처리를 `병렬적`으로 처리해 조금이라도 `Response Time`을 개선하기 위한 코드를 구현하였습니다.

<br>

### 1.5 RESTful API
--- 

REST에서 가장 중요하며 기본적인 규칙 두가지를 준수하기 위해 노력했습니다.

1.  URI는 정보의 자원을 표현해야 한다. (`리소스 식별`)
   
2. 자원에 대한 행위는 HTTP Method로 표현한다.

<br>

📌 ENDPOINT

`링크`(https://github.com/challen-challen/DB_JSON_Design/blob/master/API_URI.MD)

       README 파일을 통해  API 명세를 작성하다보니 까먹고 변경사항을 반영하지 않았을 때 프론트 개발에 차질을 야기한 경험을 통해 추후에는 swagger, postman과 같은 툴을 사용해 API 명세를 작성해야겠다고 느꼈습니다.


<br>


✔ 두가지 규칙을 가지고 URI를 설계하는 것을 목표로 하고 그 상황에서 안될 때 컨트롤 URI를 사용하였습니다.


✔ 계층 구조상 상위를 컬렉션으로 보고 복수단어를 사용 했습니다.


✔ 게시글 작성 시 PRG(Post/Redirect/Get)을 사용해 게시글 중복 작성을 방지하였습니다.

<br>

### 개선할 점

---

<br>

✔ `챌린챌린`은 유저들이 `이미지`를 업로드하며 노는 환경 sns이다. 그렇기에 `이미지`와 관련된 최적화 부분을 고려해 개발을 진행했어야 했지만 그렇지 못하였다

<br>

1. 기존의 이미지 업로드 flow인 `user -> server ->  s3`를 `Presigned url`을 사용해 `client -> s3` flow로 변경하여 서버의 부하를 줄여야한다.

<br>

2.  현재는 s3 bucket의 저장된 `이미지의 원본`을 그대로 client에서 사용한다. 이는 리소스가 많아질수록 `용량`이 늘어나게 되고, 결국 로딩 시간에 악영향을 끼칠것이다. 이를 해결 하기 위해 `aws lambda`를 사용해 `이미지 리사이징`을 하여 `용량`이 작은 사진들을 불러와 클라이언트에서 더 빠르게 사진들을 볼 수 있도록 해야한다.
