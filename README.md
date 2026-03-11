<h1>Soolae</h1>

<h2>프로젝트 소개</h2>
<p>칵테일 레시피를 더 간단하게 찾을 수 있고 더 다양한 조합을 서로 공유해서 비싼 바문화를 좀 더 가볍게 집에서 친구와 같이 즐길 수 있도록 하고 싶었습니다.
이 서비스를 통해서 더 가볍게 빠르게 칵테일에 접근할 수 있게 도와주고 싶습니다.</p>


<!-- <h2>API docs</h2>
<a href='https://universal-bonobo-130.notion.site/API-cd2be7182d2e4ab09327442195045b12?pvs=4'>🔗 api 문서 링크</a> -->

<h2>ERD</h2>

![image](https://github.com/user-attachments/assets/aa15073b-ae3f-45e0-b38c-71f5ab556e8e)


<div>
<h2>배포 주소</h2>
<a href='www.soolae-server.shop'>🔗 Soolae</a>
</div>
<h2>프로젝트 주요 기능</h2>
<h3>메인페이지</h3>

![soolae-main-page](https://github.com/user-attachments/assets/22c4d59a-16c0-4e83-af66-ade78632ad35)

<pre>
홍보 배너와 칵테일의 정보를 볼수있습니다. footer의 버튼을 클릭하여 
다른 페이지로 이동할수있고 Header의 버튼을 클릭하여 로그인이나 회원가입이 가능합니다.
</pre>
<h3>로그인 페이지</h3>

![soolae-login-page](https://github.com/user-attachments/assets/9e0df35c-657a-4a1e-bcfe-5226796f3311)
<pre>회원가입후 로그인을 하거나 간편로그인을 통해서 네이버, 구글 아이디로 간편하게 로그인 할수있습니다.</pre>

<h3>회원가입 페이지</h3>

![soolae-signin-page](https://github.com/user-attachments/assets/4a60205c-a988-44a2-8b2a-b8c8f35ea3ea)
<pre>간단한 정보를 입력하고 회원가입을 할수있습니다.</pre>

<h3>칵테일 페이지</h3>

![soolae-cocktail-page](https://github.com/user-attachments/assets/62a83761-e2b9-4439-9e37-e5b51a8e644b)
![soolae-cocktail-detail-page](https://github.com/user-attachments/assets/2f738552-a655-4562-839d-b4ef2187703f)
<pre>여러 칵테일을 조회하고 칵테일의 상세 정보를 볼수있습니다.</pre>
<h3>투표 결과 공유 기능</h3>

<h3>재료목록 페이지</h3>

![soolae-ingredient-page](https://github.com/user-attachments/assets/a2722888-e7c3-4918-8272-7b73646ea9f3)
![soolae-ingredient-detail-page](https://github.com/user-attachments/assets/c0debced-a07c-4389-b7e9-92c89e20fabc)
<pre>칵테일에 필요한 재료를 조회하고 상세정보를 볼수있습니다.</pre>

<h3>나의 재료</h3>

![soolae-myingredient-page](https://github.com/user-attachments/assets/07954142-bde3-4273-9eee-65bd2a6e6212)
![soolae-myIngredient-result-page](https://github.com/user-attachments/assets/24fcd84d-a0ad-4950-8fa0-b9fbb7277da4)
<pre>현재 가진재료로 검색하여 만들수있는 칵테일을 찾고 가지고있는재료는 노란색 , 필요한재료는 빨간색으로 표시됩니다. 재료조회를 클릭하면 필요한 재료를 조회할수있습니다.</pre>

<h3>칵테일 등록</h3>

![soolae-cocktail-page](https://github.com/user-attachments/assets/6aca6bf3-b0fd-4ad8-a05f-d744dd2a9a01)
![soolae-cocktail-page](https://github.com/user-attachments/assets/9077f3a4-9713-4a2f-b77b-bb0f91b7a2b3)
<pre>
나만의 레서피나 현재등록되지않은 칵테일을 등록할수있는 기능입니다.
칵테일의 기본정보를 입력하고 재료를 선택 이미지를 등록한뒤에 각 재료의 용량과 단위를 입력해주면 칵테일을 등록할수있습니다.
</pre>

<h3>재료 등록</h3>

![soolae-cocktail-page](https://github.com/user-attachments/assets/c7e6cc41-eb55-40cc-82ad-76f0404fc9e3)
![soolae-cocktail-page](https://github.com/user-attachments/assets/1b8df237-2305-4174-9ad8-744792dd9f26)

<pre>
칵테일을 등록하면서 필요한 재료가 등록되어있지않다면 재료를 등록할수있습니다. 
재료의 정보와 이미지를 등록후 제출 버튼을 클릭하면 재료가 등록됩니다.
</pre>


## 업그레이드 운영 가이드

### 버전 정책
- 런타임: `next` >= 16.x, `react`/`react-dom` >= 19.x (현재: 16.1.6 / 19.2.4)
- PWA/빌드: `next-pwa` 5.6.0, `swiper` 12.1.2
- 스타일/검증: `tailwindcss` 3.4.19, `eslint` 9.39.4
- 신규 변경 시 `check:deps-compat` 통과를 배포 이전 필수 점검으로 사용

### 배포/검증 순서
1. `npm run check:deps-compat`
2. `npm run lint`
3. `npm run build`
4. `npm run check:p0-smoke`
5. PR 템플릿 체크리스트 완비 후 main 브랜치 승인/병합

### 브랜치/PR 규칙
- 브랜치: `codex/<type>/<이슈번호>-요약`
- 배포 권한 브랜치: `main`만 배포 트리거 대상
